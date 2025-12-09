import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/common/Navbar.jsx";
import BackButton from "../components/detail/BackButton.jsx";
import TitleSection from "../components/detail/TitleSection.jsx";
import Gallery from "../components/detail/Gallery.jsx";
import RecommendationCard from "../components/home/recommendations/RecommendationCard.jsx";
import Footer from "../components/common/Footer.jsx";
import Maps from "../components/maps/Maps.jsx";

import { getPlaceBySlug, places } from "../data/places.js";
import { getPlaceDetailBySlug } from "../data/placeDetails.js";
import InfoDescription from "../components/detail/InfoDescription.jsx";

import DestinationPopup from "../components/popup/DestinasiPopup";
import FailPopup from "../components/popup/failPopUp";
import { useAuth } from "../hooks/useAuth";

import { API_BASE_URL, BACKEND_BASE_URL } from "../config/api";

const getAuthToken = () => localStorage.getItem("token");

const toAbsoluteUrl = (u) => {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  const path = u.startsWith("/") ? u : `/${u}`;
  return `${BACKEND_BASE_URL}${path}`;
};

const toNumberSafe = (value, fallback = 0) => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "number")
    return Number.isFinite(value) ? value : fallback;

  const cleaned = String(value).replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : fallback;
};

const formatDateSafe = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
};

const Stars = ({ value, sizeClass = "text-[20px]" }) => {
  const rating = Math.max(0, Math.min(5, Number(value || 0)));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={
            i < rating
              ? `text-yellow-500 ${sizeClass}`
              : `text-zinc-300 ${sizeClass}`
          }
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Detail = () => {
  const { slug } = useParams();
  const { user } = useAuth();

  const place = useMemo(() => getPlaceBySlug(slug), [slug]);
  const detail = useMemo(() => getPlaceDetailBySlug(slug), [slug]);

  const [reviewSummary, setReviewSummary] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const [ratingMap, setRatingMap] = useState({});

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailPopup, setShowFailPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // ==== FETCH ULASAN UNTUK DESTINASI INI ====
  useEffect(() => {
    const controller = new AbortController();

    async function fetchReviews() {
      setLoadingReviews(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/reviews/${slug}`, {
          signal: controller.signal,
        });

        if (res.data?.success) {
          setReviewSummary(res.data.summary || null);

          const normalized = Array.isArray(res.data.reviews)
            ? res.data.reviews.map((r) => ({
                ...r,
                name: r.user_name ?? r.name ?? "Pengunjung",
                avatar:
                  toAbsoluteUrl(r.user_avatar || r.avatar) ||
                  "/avatar-default.png",
                createdAt: formatDateSafe(r.created_at ?? r.createdAt ?? ""),
              }))
            : [];

          setReviews(normalized);
        } else {
          setReviewSummary(null);
          setReviews([]);
        }
      } catch (err) {
        const isCanceled =
          err?.name === "CanceledError" ||
          err?.code === "ERR_CANCELED" ||
          controller.signal.aborted;

        if (!isCanceled) {
          setReviewSummary(null);
          setReviews([]);
        }
      } finally {
        if (!controller.signal.aborted) setLoadingReviews(false);
      }
    }

    fetchReviews();

    return () => {
      controller.abort();
    };
  }, [slug]);

  // ==== FETCH SUMMARY RATING UNTUK REKOMENDASI ====
  useEffect(() => {
    const controller = new AbortController();

    async function fetchRatingSummary() {
      try {
        const res = await axios.get(`${API_BASE_URL}/reviews-summary`, {
          signal: controller.signal,
        });

        if (res.data?.success && Array.isArray(res.data.summary)) {
          const map = {};
          for (const r of res.data.summary) {
            const key =
              typeof r.place_id === "string"
                ? r.place_id
                : String(r.place_id || "");
            if (!key) continue;

            map[key] = {
              averageRating: toNumberSafe(r.averageRating ?? 0, 0),
              totalReviews: Number(r.totalReviews ?? 0),
            };
          }
          setRatingMap(map);
        } else {
          setRatingMap({});
        }
      } catch (err) {
        const isCanceled =
          err?.name === "CanceledError" ||
          err?.code === "ERR_CANCELED" ||
          controller.signal.aborted;

        if (!isCanceled) setRatingMap({});
      }
    }

    fetchRatingSummary();

    return () => controller.abort();
  }, []);

  // ==== TOMBOL "TAMBAHKAN KE ITINERARY" (SAMA BEHAVIOR DENGAN ITINERARY PAGE) ====
  const handleAddItinerary = useCallback(async () => {
    const token = getAuthToken();

    // kalau belum login / tidak ada token → popup login dulu
    if (!user || !token) {
      setShowSuccessPopup(false);
      setShowFailPopup(false);
      setShowLoginPopup(true);
      return;
    }

    if (!place?.slug) {
      // slug tidak ada → error generic
      setShowSuccessPopup(false);
      setShowLoginPopup(false);
      setShowFailPopup(true);
      return;
    }

    // ambil harga tiket dari detail/sidebar atau fallback ke data di place
    const ticketPrice = toNumberSafe(
      detail?.sidebar?.ticketPrice ?? place?.ticketPrice ?? 0,
      0
    );

    try {
      await axios.post(
        `${API_BASE_URL}/itinerary/add`,
        {
          placeId: place.slug,
          ticketPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // sukses simpan
      setShowFailPopup(false);
      setShowLoginPopup(false);
      setShowSuccessPopup(true);
    } catch (err) {
      // gagal simpan
      setShowSuccessPopup(false);
      setShowLoginPopup(false);
      setShowFailPopup(true);
    }
  }, [user, place, detail]);

  if (!place) {
    return (
      <>
        <Navbar />
        <div className="w-full px-4 md:px-10 lg:px-[55px] py-10 mx-auto">
          <p className="text-center text-red-500">Destinasi tidak ditemukan.</p>
        </div>
      </>
    );
  }

  const descriptionParagraphs =
    detail?.description?.split(/\n\s*\n/).filter(Boolean) || [];

  const mapTitle = detail?.mapTitle || `Peta Lokasi ${place.title}`;

  const totalReviews = Number(
    reviewSummary?.totalReviews ?? reviews.length ?? 0
  );

  const avgRating = Number(reviewSummary?.averageRating ?? 0);
  const roundedAvg = Math.max(0, Math.min(5, Math.round(avgRating)));

  const descriptionText =
    descriptionParagraphs.length > 0
      ? descriptionParagraphs.join("\n\n")
      : "Belum ada deskripsi detail untuk destinasi ini.";

  return (
    <>
      <Navbar />

      <main className="bg-white">
        <div className="w-full px-4 md:px-10 lg:px-[55px] py-6 lg:py-10 mx-auto">
          {/* HEADER: Back + Title + Tombol Tambah Itinerary */}
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <BackButton />
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900">
                    {place.title}
                  </h1>
                </div>
              </div>

              {/* tombol ini pakai handleAddItinerary */}
              <TitleSection title={place.title} onAdd={handleAddItinerary} />
            </div>
          </div>

          {/* GALLERY ATAS */}
          <Gallery
            mainImage={detail?.mainImage}
            images={detail?.galleryImages}
          />

          {/* DESKRIPSI + INFO SAMPING */}
          <InfoDescription
            text={descriptionText}
            sidebarData={detail?.sidebar}
            sections={detail?.sections || []}
          />

          {/* MAPS SECTION */}
          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 text-center mb-6">
              {mapTitle}
            </h2>
            <div className="rounded-2xl overflow-hidden shadow h-80 sm:h-[520px] md:h-[720px]">
              <Maps
                variant="section"
                className="w-full h-full"
                showBack={false}
                showMenu={false}
                focusSlug={slug}
              />
            </div>
          </section>

          {/* RATING & ULASAN */}
          <section className="mt-24">
            <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 text-left mb-6 pl-1 md:pl-2">
              Rating & Ulasan Pengunjung
            </h2>

            {loadingReviews ? (
              <p className="text-sm text-zinc-500">Memuat ulasan...</p>
            ) : totalReviews === 0 ? (
              <p className="text-sm text-zinc-500">
                Belum ada ulasan untuk destinasi ini.
              </p>
            ) : (
              <div className="grid grid-cols-12 gap-10">
                {/* SUMMARY KIRI */}
                <div className="col-span-12 lg:col-span-4">
                  <div className="max-w-[320px]">
                    <div className="text-[45px] leading-none font-bold text-zinc-900">
                      {avgRating.toFixed(1)}
                    </div>

                    <Stars value={roundedAvg} sizeClass="text-[20px]" />

                    <p className="mt-0 text-[14px] text-zinc-400">
                      ({totalReviews} Reviews)
                    </p>

                    <div className="mt-3 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const key = `count${star}`;
                        const count = Number(reviewSummary?.[key] ?? 0);
                        const percent =
                          totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                        return (
                          <div key={star} className="flex items-center gap-4">
                            <div className="flex w-10 items-center justify-end gap-2">
                              <span className="text-[14px] text-zinc-900">
                                {star}
                              </span>
                              <span className="text-yellow-500 text-[14px]">
                                ★
                              </span>
                            </div>

                            <div className="h-3 flex-1 rounded-full bg-zinc-100 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-yellow-400"
                                style={{
                                  width: `${percent}%`,
                                }}
                              />
                            </div>

                            <div className="w-8 text-right text-[14px] text-zinc-900">
                              {count}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* DAFTAR REVIEW KANAN */}
                <div className="col-span-12 lg:col-span-8">
                  <div className="space-y-10">
                    {reviews.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-start justify-between"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={r.avatar || "/avatar-default.png"}
                            alt={r.name || "Pengunjung"}
                            className="w-12 h-12 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/avatar-default.png";
                            }}
                          />

                          <div className="max-w-[560px]">
                            <p className="font-semibold text-[15px] leading-tight text-zinc-900">
                              {r.name || "Pengunjung"}
                            </p>

                            <p className="mt-1 text-[12px] leading-tight text-zinc-400">
                              {r.createdAt || "\u00A0"}
                            </p>

                            <p className="mt-3 text-[14px] leading-relaxed text-zinc-700">
                              {r.comment || "(Tidak ada komentar)"}
                            </p>
                          </div>
                        </div>

                        <div className="ml-8 flex shrink-0 items-center gap-2 pt-1">
                          <Stars value={r.rating} sizeClass="text-[20px]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* REKOMENDASI DESTINASI */}
        <section className="mt-12 mb-14 bg-slate-50">
          <div className="w-full px-4 md:px-10 lg:px-[55px] py-10 mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 text-center mb-6">
              Rekomendasi Destinasi
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {places
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
                .map((p) => {
                  const backendRating = ratingMap[p.slug]?.averageRating;
                  return (
                    <RecommendationCard
                      key={p.slug || p.id}
                      place={{
                        ...p,
                        rating: backendRating ?? p.rating ?? 0,
                      }}
                    />
                  );
                })}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* POPUP SUKSES (DESTINASI TERSIMPAN) */}
      <DestinationPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        variant="saved"
      />

      {/* POPUP LOGIN DULU */}
      <DestinationPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        variant="login-required"
      />

      {/* POPUP GAGAL SIMPAN */}
      <FailPopup
        isOpen={showFailPopup}
        onClose={() => setShowFailPopup(false)}
      />
    </>
  );
};

export default Detail;
