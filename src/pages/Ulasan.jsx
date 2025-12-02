import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer.jsx";
import ReviewCard from "../components/ulasan/ReviewCard.jsx";
import { places } from "../data/places.js";

import { API_BASE_URL } from "../config/api";

const Ulasan = () => {
    const sliderRef = useRef(null);
    const isDownRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);

    const [reviewSummaryMap, setReviewSummaryMap] = useState({});

    useEffect(() => {
        async function fetchReviewSummary() {
            try {
                const res = await axios.get(`${API_BASE_URL}/reviews-summary`);
                if (res.data.success && res.data.ratings) {
                    setReviewSummaryMap(res.data.ratings);
                }
            } catch (err) {
                console.error("Error load reviews-summary:", err);
            }
        }

        fetchReviewSummary();
    }, []);

    const reviewItems = places.map((p) => ({
        id: p.id,
        title: p.title,
        image: p.img,
        slug: p.slug,
    }));

    const itemsWithStats = reviewItems.map((item) => {
        const stats = reviewSummaryMap[item.slug] || {};
        const rating = stats.averageRating ?? 0;
        const reviews = stats.totalReviews ?? 0;

        return {
            ...item,
            rating,
            reviews,
        };
    });

    const scrollByArrow = (direction) => {
        const container = sliderRef.current;
        if (!container) return;
        const amount = 260;
        container.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    const handleMouseDown = (e) => {
        const container = sliderRef.current;
        if (!container) return;
        isDownRef.current = true;
        container.classList.add("cursor-grabbing");
        startXRef.current = e.pageX - container.offsetLeft;
        scrollLeftRef.current = container.scrollLeft;
    };

    const handleMouseLeave = () => {
        const container = sliderRef.current;
        if (!container) return;
        isDownRef.current = false;
        container.classList.remove("cursor-grabbing");
    };

    const handleMouseUp = () => {
        const container = sliderRef.current;
        if (!container) return;
        isDownRef.current = false;
        container.classList.remove("cursor-grabbing");
    };

    const handleMouseMove = (e) => {
        const container = sliderRef.current;
        if (!container || !isDownRef.current) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startXRef.current) * 1.2;
        container.scrollLeft = scrollLeftRef.current - walk;
    };

    return (
        <>
            <Navbar />

            <style>
                {`
                    .ulasan-scroll-hidden {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    .ulasan-scroll-hidden::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>

            <main className="min-h-screen bg-white">
                <div className="text-center pt-12 pb-8">
                    <h1 className="text-6xl font-bold text-orange-500">
                        Ulasan Wisata
                    </h1>
                </div>

                <section className="mx-auto max-w-6xl px-6 pt-2">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => scrollByArrow("left")}
                            className="absolute left-[-18px] top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-orange-500 hover:text-white transition"
                        >
                            <span className="text-lg font-bold">&lt;</span>
                        </button>

                        <div
                            ref={sliderRef}
                            className="ulasan-scroll-hidden flex gap-4 overflow-x-auto scroll-smooth py-2 px-1 cursor-grab select-none"
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                        >
                            {itemsWithStats.map((item) => (
                                <ReviewCard key={item.id} {...item} />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => scrollByArrow("right")}
                            className="absolute right-[-18px] top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-orange-500 hover:text-white transition"
                        >
                            <span className="text-lg font-bold">&gt;</span>
                        </button>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-6 pt-10 pb-16 flex justify-center">
                    <Link
                        to="/ulasan/tambah-rating"
                        className="rounded-2xl bg-orange-400 px-10 py-3 text-white text-[16px] font-semibold shadow-md hover:bg-orange-500"
                    >
                        Tambahkan Rating
                    </Link>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default Ulasan;
