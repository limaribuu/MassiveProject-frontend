import React, { useState } from "react";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import RecommendationCard from "../components/home/recommendations/RecommendationCard.jsx";
import { places } from "../data/places.js";

const categories = 
["all", "sejarah", "religi", "ikonik", "kuliner", "alam"];

const Destinasi = () => {
    const [category, setCategory] = useState("all");
    const [page, setPage] = useState(1);

    const itemsPerPage = 6;

    const filtered =
        category === "all"
            ? places
            : places.filter((p) => p.category?.includes(category));

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIdx = (page - 1) * itemsPerPage;
    const pageItems = filtered.slice(
        startIdx,
        startIdx + itemsPerPage
    );

    const handleCategoryChange = (value) => {
        setCategory(value);
        setPage(1); 
    };

    return (
        <>
            <Navbar />

            <main className="bg-white min-h-screen">
                <section className="w-full px-4 md:px-10 lg:px-[55px] pt-10 pb-16 mx-auto">
                    <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
                        Rasakan pengalaman baru <br className="hidden md:block" />
                        destinasi favorit Palembang
                    </h1>

                    <div className="flex justify-center mb-10">
                        <select
                            value={category}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="px-4 py-2 rounded-full border border-orange-400 text-sm text-slate-800 shadow-sm focus:outline-none"
                        >
                            <option value="all">Semua Kategori</option>
                            <option value="sejarah">Sejarah</option>
                            <option value="religi">Religi</option>
                            <option value="ikonik">Ikonik</option>
                            <option value="kuliner">Kuliner</option>
                            <option value="alam">Alam</option>
                        </select>
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
