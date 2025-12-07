import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import BackButton from "../components/detail/BackButton.jsx";
import RecommendationSection from "../components/home/recommendations/RecommendationSection.jsx";
import Footer from "../components/common/Footer.jsx";

import { places } from "../data/places.js";
import { API_BASE_URL } from "../config/api";

const toNumberSafe = (value, fallback = 0) => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === "number") return Number.isFinite(value) ? value : fallback;

    const cleaned = String(value).replace(/[^\d.-]/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : fallback;
};

const Populer = () => {
    const navigate = useNavigate();
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

    const POPULER_SLUGS = useMemo(
        () => ["bkb", "ampera", "pulau-kemaro", "jakabaring", "monpera", "kampung-kapitan"],
        []
    );

    const populer = useMemo(() => {
        return places
            .filter((p) => POPULER_SLUGS.includes(p.slug))
            .map((p) => {
                const avg = ratingMap[p.slug]?.averageRating ?? p.rating ?? 0;

                return {
                    ...p,
                    rating: avg,
                    to: `/detail/${p.slug}`,
                };
            });
    }, [POPULER_SLUGS, ratingMap]);

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <div className="relative w-full max-w-6xl mx-auto px-6 pt-6">
                <div className="absolute left-6 top-6">
                    <BackButton onClick={() => navigate(-1)} />
                </div>

                <h1 className="text-center text-2xl font-bold text-gray-900 leading-tight">
                    Rekomendasi Destinasi <br /> Populer
                </h1>
            </div>

            <div className="flex justify-center my-8">
                <img
                    src="/reco/ampera2.png"
                    alt="Populer"
                    className="w-full max-w-[1400px] h-auto rounded-xl shadow-md"
                />
            </div>

            <RecommendationSection items={populer} />

            <Footer />
        </div>
    );
};

export default Populer;
