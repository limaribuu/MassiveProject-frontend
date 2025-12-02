import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer.jsx";
import BackButton from "../components/detail/BackButton";
import UlasanPopup from "../components/popup/ulasanpopup.jsx";
import { places } from "../data/places.js";
import { useAuth } from "../hooks/useAuth";

import { API_BASE_URL } from "../config/api";

const destinations = places.map((p) => ({
    slug: p.slug,
    name: p.title
}));

const TambahRating = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [selectedPlace, setSelectedPlace] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [showSaved, setShowSaved] = useState(false);

    const stars = [1, 2, 3, 4, 5];
    const displayRating = hover || rating;

    useEffect(() => {
        if (showSaved) {
            const timer = setTimeout(() => {
                setShowSaved(false);
                navigate("/ulasan");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showSaved, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("Kamu harus login dulu untuk memberikan ulasan.");
            return;
        }

        if (!selectedPlace || rating === 0 || !comment.trim()) {
            alert("Pilih destinasi, rating, dan tulis ulasan terlebih dahulu.");
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/reviews`, {
                placeId: selectedPlace,
                userId: user.id,
                rating,
                comment
            });

            setShowSaved(true);
        } catch (err) {
            console.error("Gagal menyimpan ulasan:", err);
            alert("Terjadi kesalahan saat menyimpan ulasan. Coba lagi.");
        }
    };

    const chosenName =
        destinations.find((d) => d.slug === selectedPlace)?.name ||
        "Pilih Destinasi";

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-white">
                <div className="mx-auto max-w-4xl px-6 pt-6">
                    <div className="flex items-center justify-between">
                        <BackButton onClick={() => navigate(-1)} />
                        <h1 className="text-[24px] md:text-[26px] font-extrabold text-orange-500">
                            Tambahkan Rating
                        </h1>
                        <div className="w-9" />
                    </div>
                    <div className="mt-3 border-b-2 border-orange-300" />

                    <div className="mt-8 flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">

                        <div className="flex items-center gap-2">
                            {stars.map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setRating(s)}
                                    onMouseEnter={() => setHover(s)}
                                    onMouseLeave={() => setHover(0)}
                                    className="p-1"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className={`w-10 h-10 ${
                                            s <= displayRating
                                                ? "text-orange-400"
                                                : "text-gray-300"
                                        } transition`}
                                        fill="currentColor"
                                    >
                                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.402 8.172L12 18.897l-7.336 3.87 1.402-8.172L.132 9.21l8.2-1.192z" />
                                    </svg>
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <label className="block text-right text-[13px] text-gray-500 mb-1">
                                Pilih Destinasi
                            </label>

                            <button
                                type="button"
                                onClick={() => setDropdownOpen((o) => !o)}
                                className="
                                    w-60 h-[45px]
                                    bg-white 
                                    border border-orange-300 
                                    rounded-xl
                                    px-4 
                                    flex items-center justify-between
                                    shadow-[0_4px_18px_rgba(0,0,0,0.06)]
                                    text-orange-500 font-medium text-sm
                                "
                            >
                                <span className="truncate">
                                    {chosenName.toUpperCase()}
                                </span>

                                <span
                                    className={`
                                        ml-2 inline-block
                                        transition-transform duration-200
                                        ${dropdownOpen ? "rotate-180" : ""}
                                    `}
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3 4.5L6 7.5L9 4.5"
                                            stroke="#F97316"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </button>

                            {dropdownOpen && (
                                <div
                                    className="
                                        absolute left-0 mt-2 w-60 
                                        bg-white 
                                        rounded-xl
                                        border border-orange-200
                                        shadow-[0_6px_20px_rgba(0,0,0,0.08)]
                                        max-h-[260px]
                                        overflow-y-auto
                                        z-20
                                    "
                                >
                                    {destinations.map((d) => {
                                        const isActive = d.slug === selectedPlace;
                                        return (
                                            <div
                                                key={d.slug}
                                                onClick={() => {
                                                    setSelectedPlace(d.slug);
                                                    setDropdownOpen(false);
                                                }}
                                                className={`
                                                    px-4 py-2 
                                                    text-sm cursor-pointer
                                                    ${
                                                        isActive
                                                            ? "text-orange-500 font-semibold"
                                                            : "text-gray-700"
                                                    }
                                                    hover:bg-orange-50
                                                `}
                                            >
                                                {d.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-10">
                        <label className="block text-sm font-semibold text-orange-500 mb-2">
                            Berikan Ulasan :
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={7}
                            className="w-full rounded-2xl border border-orange-300 px-4 py-3 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Tulis pengalamanmu di sini..."
                        />

                        <button
                            type="submit"
                            className="mt-6 rounded-2xl bg-orange-400 px-8 py-2.5 text-white text-[16px] font-semibold shadow-md hover:bg-orange-500"
                        >
                            Simpan
                        </button>
                    </form>
                </div>

                {showSaved && (
                    <div
                        className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
                        onClick={() => navigate("/ulasan")}
                    >
                        <div onClick={(e) => e.stopPropagation()}>
                            <UlasanPopup />
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
};

export default TambahRating;