import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/common/Navbar.jsx";
import Hero from "../components/home/hero/Hero.jsx";
import RecommendationSection from "../components/home/recommendations/RecommendationSection.jsx";
import Footer from "../components/common/Footer.jsx";
import { Link } from "react-router-dom";
import Maps from "../components/maps/Maps.jsx";

import { places } from "../data/places.js";

const API_BASE_URL = "http://localhost:5000/api";

export default function Home() {
    const [ratingMap, setRatingMap] = useState({});

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

    const applyRatingFromBackend = (items) =>
        items.map((item) => {
            const slug = item.slug;
            const backendRating =
                slug && ratingMap[slug] ? ratingMap[slug].averageRating : null;

            return {
                ...item,
                rating: backendRating ?? item.rating ?? 0,
            };
        });

    const hiddenGemSlugs = [
        "museum-smb-ii",
        "museum-balaputra",
        "bukit-siguntang",
    ];

    const hiddenGems = places.filter((p) =>
        hiddenGemSlugs.includes(p.slug)
    );

    const hiddenGemsWithRating = applyRatingFromBackend(hiddenGems);

    const popularSlugs = ["bkb", "ampera", "pulau-kemaro"];

    const popular = places.filter((p) => popularSlugs.includes(p.slug));

    const popularWithRating = applyRatingFromBackend(popular);

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
                            <Maps
                                variant="section"
                                className="h-full"
                                showBack={false}
                                showMenu={false}
                            />
                        </div>
                    </div>
                </div>

                <div className="text-3xl font-bold text-gray-900 leading-tight text-center my-8 mt-20">
                    Rekomendasi Destinasi <br />
                    Hidden Gem
                </div>

                <RecommendationSection items={hiddenGemsWithRating} />

                <div className="rc__cta-wrap">
                    <Link
                        to="/hidden-gem"
                        className="rc__cta mb-20 inline-block text-center"
                    >
                        Lihat Selengkapnya
                    </Link>
                </div>

                <div className="text-3xl font-bold text-gray-900 leading-tight text-center my-8">
                    Rekomendasi Destinasi <br /> Populer
                </div>

                <RecommendationSection items={popularWithRating} />

                <div className="rc__cta-wrap">
                    <Link
                        to="/populer"
                        className="rc__cta mb-30 inline-block text-center"
                    >
                        Lihat Selengkapnya
                    </Link>
                </div>
            </main>

            <Footer />
        </>
    );
}
