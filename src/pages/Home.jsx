import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Navbar from "../components/common/Navbar.jsx";
import Hero from "../components/home/hero/Hero.jsx";
import RecommendationSection from "../components/home/recommendations/RecommendationSection.jsx";
import Footer from "../components/common/Footer.jsx";
import { Link } from "react-router-dom";
import Maps from "../components/maps/Maps.jsx";

import { places } from "../data/places.js";
import { API_BASE_URL } from "../config/api";

const toNumberSafe = (value, fallback = 0) => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === "number") return Number.isFinite(value) ? value : fallback;

    const cleaned = String(value).replace(/[^\d.-]/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : fallback;
};

export default function Home() {
    const [ratingMap, setRatingMap] = useState({});

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
                        const key = typeof r.place_id === "string" ? r.place_id : String(r.place_id || "");
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

                if (!isCanceled) {
                    console.error("Error load rating summary:", err);
                    setRatingMap({});
                }
            }
        }

        fetchRatingSummary();

        return () => controller.abort();
    }, []);

    const applyRatingFromBackend = useMemo(() => {
        return (items) =>
            items.map((item) => {
                const slug = item?.slug;
                const backendRating = slug ? ratingMap[slug]?.averageRating : null;

                return {
                    ...item,
                    rating: backendRating ?? item.rating ?? 0,
                };
            });
    }, [ratingMap]);

    const hiddenGemSlugs = ["museum-smb-ii", "museum-balaputra", "bukit-siguntang"];
    const hiddenGemsWithRating = useMemo(() => {
        const hiddenGems = places.filter((p) => hiddenGemSlugs.includes(p.slug));
        return applyRatingFromBackend(hiddenGems);
    }, [applyRatingFromBackend]);

    const popularSlugs = ["bkb", "ampera", "pulau-kemaro"];
    const popularWithRating = useMemo(() => {
        const popular = places.filter((p) => popularSlugs.includes(p.slug));
        return applyRatingFromBackend(popular);
    }, [applyRatingFromBackend]);

    return (
        <>
            <Navbar />
            <main>
                <Hero />

                <div className="text-center my-10 px-4">
                    <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                        Eksplorasi Destinasi Wisata
                        <br />
                        Di Palembang
                    </h2>
                    <div className="flex justify-center mt-6">
                        <div className="w-full max-w-[1450px] h-[600px] rounded-xl shadow-md overflow-hidden">
                            <Maps variant="section" className="h-full" showBack={false} showMenu={false} />
                        </div>
                    </div>
                </div>

                <div className="text-3xl font-bold text-gray-900 leading-tight text-center my-8 mt-20">
                    Rekomendasi Destinasi <br />
                    Hidden Gem
                </div>

                <RecommendationSection items={hiddenGemsWithRating} />

                <div className="rc__cta-wrap">
                    <Link to="/hidden-gem" className="rc__cta mb-20 inline-block text-center">
                        Lihat Selengkapnya
                    </Link>
                </div>

                <div className="text-3xl font-bold text-gray-900 leading-tight text-center my-8">
                    Rekomendasi Destinasi <br /> Populer
                </div>

                <RecommendationSection items={popularWithRating} />

                <div className="rc__cta-wrap">
                    <Link to="/populer" className="rc__cta mb-30 inline-block text-center">
                        Lihat Selengkapnya
                    </Link>
                </div>
            </main>

            <Footer />
        </>
    );
}
