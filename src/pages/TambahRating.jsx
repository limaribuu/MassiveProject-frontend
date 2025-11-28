import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer.jsx";
import BackButton from "../components/detail/BackButton";
import UlasanPopup from "../components/popup/ulasanpopup.jsx";
import { places } from "../data/places.js";
import { useAuth } from "../hooks/useAuth";

const API_BASE_URL = "http://localhost:5000/api";

const destinations = places.map((p) => ({
    slug: p.slug,
    name: p.title
}));

const TambahRating = () => {
    const { user } = useAuth();

    const [selectedPlace, setSelectedPlace] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [showSaved, setShowSaved] = useState(false);

    const navigate = useNavigate();
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

    const handleClosePopup = () => {
        setShowSaved(false);
        navigate("/ulasan");
    };

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

                        <div>
                            <label className="block text-right text-[13px] text-gray-500 mb-1">
                                Pilih Destinasi
                            </label>
                            <select
                                value={selectedPlace}
                                onChange={(e) => setSelectedPlace(e.target.value)}
                                className="w-[220px] rounded-xl border border-orange-300 px-3 py-2 text-sm text-orange-500 font-medium focus:outline-none focus:ring-2 focus:ring-orange-300"
                            >
                                <option value="">Pilih Destinasi</option>
                                {destinations.map((d) => (
                                    <option key={d.slug} value={d.slug}>
                                        {d.name.toUpperCase()}
                                    </option>
                                ))}
                            </select>
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
                        onClick={handleClosePopup}
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