import React, { useState } from "react";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import RecommendationCard from "../components/home/recommendations/RecommendationCard.jsx";
import { places } from "../data/places.js";

const categories = ["all", "sejarah", "religi", "ikonik", "kuliner", "alam"];

const labelMap = {
    all: "Semua Kategori",
    sejarah: "Sejarah",
    religi: "Religi",
    ikonik: "Ikonik",
    kuliner: "Kuliner",
    alam: "Alam",
};

const Destinasi = () => {
    const [category, setCategory] = useState("all");
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);

    const itemsPerPage = 6;

    const filtered =
        category === "all"
            ? places
            : places.filter((p) => p.category?.includes(category));

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIdx = (page - 1) * itemsPerPage;
    const pageItems = filtered.slice(startIdx, startIdx + itemsPerPage);

    const handleCategoryChange = (value) => {
        setCategory(value);
        setPage(1);
        setOpen(false);
    };

    return (
        <>
            <Navbar />

            <div>
                <img
                    src="/img/hero-destinasi.png"
                    alt="Destinasi Palembang"
                    className="w-full h-auto rounded-2xl object-cover p-20"
                />
            </div>

            <main className="bg-white min-h-screen">
                <section className="w-full px-4 md:px-10 lg:px-[55px] pt-10 pb-16 mx-auto">
                    <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
                        Rasakan pengalaman baru <br className="hidden md:block" />
                        destinasi favorit Palembang
                    </h1>

                    <div className="flex justify-center mb-10">
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setOpen((v) => !v)}
                                className="inline-flex items-center justify-between w-64 h-12 rounded-2xl border border-orange-400 px-4 bg-white text-orange-500 text-[15px] font-semibold shadow-[0_8px_20px_rgba(249,115,22,0.18)]"
                            >
                                <img
                                    src="/icon/category.png"
                                    alt="Filter Icon"
                                    className="h-6 w-6 mr-2"
                                />

                                <span className="flex-1 text-center truncate">
                                    {labelMap[category] ?? "Kategori"}
                                </span>

                                <svg
                                    className={`w-5 h-5 ml-2 flex-shrink-0 transition-transform ${
                                        open ? "rotate-180" : ""
                                    }`}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </button>

                            {open && (
                                <div className="absolute left-0 mt-2 w-64 rounded-2xl border border-orange-100 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] py-2 z-20">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => handleCategoryChange(cat)}
                                            className={`w-full px-4 py-2 text-left text-[15px] font-semibold ${
                                                cat === category
                                                    ? "text-orange-500 bg-orange-50"
                                                    : "text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                                            }`}
                                        >
                                            {labelMap[cat]}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {pageItems.map((place) => (
                            <RecommendationCard key={place.id} place={place} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 gap-2">
                            {Array.from({ length: totalPages }).map((_, idx) => {
                                const pageNum = idx + 1;
                                const active = pageNum === page;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setPage(pageNum)}
                                        className={`w-8 h-8 rounded-md text-xs font-semibold ${
                                            active
                                                ? "bg-orange-500 text-white"
                                                : "bg-white text-slate-700 border border-orange-200"
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
};

export default Destinasi;
