import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer.jsx";
import BackButton from "../components/detail/BackButton";

const destinations = [
    "AMPERA",
    "MUSEUM SULTAN MAHMUD BD II",
    "MUSEUM BALAPUTRA DEWA",
    "TAMAN PURBAKALA",
    "AL-QURAN AL-AKBAR",
    "BUKIT SIGUNTANG",
    "PULAU KEMARO",
    "BENTENG KUTO BESAK",
    "MONPERA",
    "JAKABARING SPORT CITY",
    "KAMPUNG KAPITAN"
];

const TambahRating = () => {
    const [selectedDest, setSelectedDest] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [showSaved, setShowSaved] = useState(false);

    const navigate = useNavigate();
    const stars = [1, 2, 3, 4, 5];
    const displayRating = hover || rating;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDest || rating === 0 || !comment.trim()) return;

        setShowSaved(true);
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
                                value={selectedDest}
                                onChange={(e) => setSelectedDest(e.target.value)}
                                className="w-[220px] rounded-xl border border-orange-300 px-3 py-2 text-sm text-orange-500 font-medium focus:outline-none focus:ring-2 focus:ring-orange-300"
                            >
                                <option value="">Pilih Destinasi</option>
                                {destinations.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
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
                        onClick={() => {
                            setShowSaved(false);
                            navigate("/ulasan");
                        }}
                    >
                        <div
                            className="rounded-2xl bg-white px-10 py-8 text-center shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-extrabold text-orange-500 mb-4">
                                Ulasan Tersimpan
                            </h2>
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-400 text-white text-3xl">
                                ✓
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
};

export default TambahRating;
