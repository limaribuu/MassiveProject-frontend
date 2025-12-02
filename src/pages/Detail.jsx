import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/common/Navbar.jsx";
import BackButton from "../components/detail/BackButton.jsx";
import TitleSection from "../components/detail/TitleSection.jsx";
import Gallery from "../components/detail/Gallery.jsx";
import SectionDetail from "../components/detail/SectionDetail.jsx";
import RecommendationCard from "../components/home/recommendations/RecommendationCard.jsx";
import Footer from "../components/common/Footer.jsx";

import { getPlaceBySlug, places } from "../data/places.js";
import { getPlaceDetailBySlug } from "../data/placeDetails.js";
import { useFavorites } from "../context/FavoritesProvider.jsx";

import { API_BASE_URL } from "../config/api";

const Detail = () => {
    const { slug } = useParams();
    const { addFavorite } = useFavorites();

    const place = getPlaceBySlug(slug);
    const detail = getPlaceDetailBySlug(slug);

    const [reviewSummary, setReviewSummary] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [ratingMap, setRatingMap] = useState({});

    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await axios.get(`${API_BASE_URL}/reviews/${slug}`);
                if (res.data.success) {
                    setReviewSummary(res.data.summary);
                    setReviews(res.data.reviews);
                }
            } catch (err) {
                console.error("Error load reviews:", err);
            }
        }
        if (slug) {
            fetchReviews();
        }
    }, [slug]);

    useEffect(() => {
        async function fetchRatingSummary() {
            try {
                const res = await axios.get(`${API_BASE_URL}/reviews-summary`);
                if (res.data.success && res.data.ratings) {
                    setRatingMap(res.data.ratings);
                }
            } catch (err) {
                console.error("Error load rating summary:", err);
            }
        }
        fetchRatingSummary();
    }, []);

    const getRatingForSlug = (slug, fallbackRating = 0) => {
        if (slug && ratingMap[slug]?.averageRating != null) {
            return ratingMap[slug].averageRating;
        }
        return fallbackRating;
    };

    if (!place) {
        return (
            <>
                <Navbar />
                <div className="w-full px-4 md:px-10 lg:px-[55px] py-10 mx-auto">
                    <p className="text-center text-red-500">
                        Destinasi tidak ditemukan.
                    </p>
                </div>
            </>
        );
    }

    const descriptionParagraphs =
        detail?.description?.split(/\n\s*\n/).filter(Boolean) || [];

    const handleAddItinerary = () => {
        addFavorite(place);
    };

    const mapImage = detail?.mapImage || "/img/peta.png";
    const mapTitle = detail?.mapTitle || `Peta Lokasi ${place.title}`;

    const avgRating = Number(reviewSummary?.averageRating || 0);
    const roundedAvg = Math.round(avgRating);

    return (
        <>
            <Navbar />

            <main className="bg-white">
                <div className="w-full px-4 md:px-10 lg:px-[55px] py-6 lg:py-10 mx-auto">
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

                            <TitleSection title={place.title} onAdd={handleAddItinerary} />
                        </div>
                    </div>

                    <Gallery
                        mainImage={detail?.mainImage}
                        images={detail?.galleryImages}
                        sidebarData={detail?.sidebar}
                    />

                    <section className="mt-8 space-y-8">
                        <div className="space-y-4">
                            {descriptionParagraphs.length > 0 ? (
                                descriptionParagraphs.map((para, i) => (
                                    <p
                                        key={i}
                                        className="text-[15px] leading-7 text-zinc-700 text-justify"
                                    >
                                        {para}
                                    </p>
                                ))
                            ) : (
                                <p className="text-[15px] leading-7 text-zinc-700 text-justify">
                                    Belum ada deskripsi detail untuk destinasi ini.
                                </p>
                            )}
                        </div>

                        {detail?.sections?.map((sec) => (
                            <SectionDetail key={sec.title} title={sec.title}>
                                <p className="text-[15px] leading-7 text-zinc-700 text-justify">
                                    {sec.content}
                                </p>
                            </SectionDetail>
                        ))}
                    </section>

                    <section className="mt-12">
                        <h2 className="text-xl font-semibold text-zinc-900 text-center mb-6">
                            {mapTitle}
                        </h2>
                        <div className="rounded-2xl overflow-hidden shadow">
                            <img
                                src={mapImage}
                                alt={mapTitle}
                                className="w-full h-[260px] sm:h-80 md:h-[380px] object-cover"
                            />
                        </div>
                    </section>

                    <section className="mt-12">
                        <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                            Rating & Ulasan Pengunjung
                        </h2>

                        {!reviewSummary ? (
                            <p className="text-sm text-zinc-500">Memuat ulasan...</p>
                        ) : reviewSummary.totalReviews === 0 ? (
                            <p className="text-sm text-zinc-500">
                                Belum ada ulasan untuk destinasi ini.
                            </p>
                        ) : (
                            <div className="grid md:grid-cols-[240px,1fr] gap-6">
                                <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-5">
                                    <div className="text-4xl font-bold">
                                        {avgRating.toFixed(1)}
                                    </div>

                                    <div className="text-yellow-500 text-lg">
                                        {"★".repeat(roundedAvg)}
                                        {"☆".repeat(5 - roundedAvg)}
                                    </div>

                                    <p className="text-xs text-zinc-500 mt-1">
                                        ({reviewSummary.totalReviews} reviews)
                                    </p>

                                    <div className="mt-4 space-y-1.5">
                                        {[5, 4, 3, 2, 1].map((star) => {
                                            const key = `count${star}`;
                                            const count = reviewSummary[key] || 0;
                                            const percent =
                                                reviewSummary.totalReviews > 0
                                                    ? (count / reviewSummary.totalReviews) * 100
                                                    : 0;

                                            return (
                                                <div key={star} className="flex items-center gap-2">
                                                    <span className="w-4 text-xs">{star}</span>
                                                    <div className="flex-1 h-2 rounded-full bg-zinc-200 overflow-hidden">
                                                        <div
                                                            className="h-full bg-yellow-400"
                                                            style={{ width: `${percent}%` }}
                                                        />
                                                    </div>
                                                    <span className="w-5 text-xs text-right">
                                                        {count}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {reviews.map((r) => (
                                        <div
                                            key={r.id}
                                            className="flex gap-3 bg-white border border-zinc-100 rounded-2xl p-4"
                                        >
                                            <img
                                                src={r.avatar || "/avatar-default.png"}
                                                alt={r.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-sm">
                                                        {r.name || "Pengunjung"}
                                                    </p>
                                                    <span className="text-xs text-zinc-400">
                                                        {r.createdAt}
                                                    </span>
                                                </div>

                                                <div className="text-xs text-yellow-500">
                                                    {"★".repeat(r.rating)}
                                                    {"☆".repeat(5 - r.rating)}
                                                </div>

                                                <p className="text-sm text-zinc-700 mt-1">
                                                    {r.comment || "(Tidak ada komentar)"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                </div>

                <section className="mt-12 mb-14 bg-slate-50">
                    <div className="w-full px-4 md:px-10 lg:px-[55px] py-10 mx-auto">
                        <h2 className="text-2xl font-semibold text-zinc-900 mb-6">
                            Rekomendasi Destinasi
                        </h2>

                        <div className="grid gap-6 md:grid-cols-3">
                            {places
                                .filter((p) => p.slug !== slug)
                                .slice(0, 3)
                                .map((recPlace) => {
                                    const backendRating = getRatingForSlug(
                                        recPlace.slug,
                                        recPlace.rating || 0
                                    );

                                    return (
                                        <RecommendationCard
                                            key={recPlace.id}
                                            place={{ ...recPlace, rating: backendRating }}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default Detail;
