// src/pages/Detail.jsx

import React from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/common/Navbar.jsx";
import BackButton from "../components/detail/BackButton.jsx";
import TitleSection from "../components/detail/TitleSection.jsx";
import Gallery from "../components/detail/Gallery.jsx";
import InfoSidebar from "../components/detail/InfoSidebar.jsx";
import SectionDetail from "../components/detail/SectionDetail.jsx";
import RecommendationSection from "../components/home/recommendations/RecommendationSection.jsx";
import RecommendationCard from "../components/home/recommendations/RecommendationCard.jsx"; // Import di sini
import Footer from "../components/common/Footer.jsx";

import { getPlaceBySlug, places } from "../data/places.js";
import { getPlaceDetailBySlug } from "../data/placeDetails.js";
import { useFavorites } from "../context/FavoritesProvider.jsx";


const Detail = () => {
    const { slug } = useParams();
    const { addFavorite } = useFavorites();

    const place = getPlaceBySlug(slug);
    const detail = getPlaceDetailBySlug(slug);

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

    // ⬇️ ini yang tadi error kalau belum ada
    const descriptionParagraphs =
        detail?.description
            ?.split(/\n\s*\n/) // pisah berdasarkan baris kosong
            .filter(Boolean) || [];

    const handleAddItinerary = () => {
        addFavorite(place);
    };

    const mapImage = detail?.mapImage || "/img/peta.png";
    const mapTitle =
        detail?.mapTitle || `Peta Lokasi ${place.title}`;

    return (
        <>
            <Navbar />

            <main className="bg-white">
                {/* konten utama */}
                <div className="w-full px-4 md:px-10 lg:px-[55px] py-6 lg:py-10 mx-auto">
                    {/* Tombol kembali */}
                    <BackButton />

                    {/* Judul + tombol Tambahkan ke Itinerary */}
                    <TitleSection title={place.title} onAdd={handleAddItinerary} />

                    {/* Gallery */}
                    <Gallery
                        mainImage={detail?.mainImage}
                        images={detail?.galleryImages}
                    />

                    {/* ============================
                        DESKRIPSI + SIDEBAR (ROW)
                       ============================ */}
                    <section className="mt-8 space-y-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* kiri: paragraf deskripsi (seperti contohmu) */}
                            <div className="lg:w-2/3 space-y-4">
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

                            {/* kanan: info sidebar */}
                            <div className="lg:w-1/3 lg:flex lg:justify-end">
                                <InfoSidebar data={detail?.sidebar} />
                            </div>
                        </div>

                        {/* ============================
                            SECTION LANJUTAN (FULL WIDTH)
                           ============================ */}
                        {detail?.sections?.map((sec) => (
                            <SectionDetail key={sec.title} title={sec.title}>
                                <p className="text-[15px] leading-7 text-zinc-700 text-justify">
                                    {sec.content}
                                </p>
                            </SectionDetail>
                        ))}
                    </section>

                    {/* PETA LOKASI */}
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

                    {/* Rating & Ulasan (placeholder dulu) */}
                    <section className="mt-12">
                        <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                            Rating & Ulasan Pengunjung
                        </h2>
                        <p className="text-sm text-zinc-500">
                            Bagian ini masih statis. Nanti bisa dihubungkan ke data
                            ulasan atau halaman Ulasan terpisah.
                        </p>
                    </section>
                </div>

                {/* Rekomendasi Destinasi */}
<section className="mt-12 mb-14 bg-slate-50">
    <div className="w-full px-4 md:px-10 lg:px-[55px] py-10 mx-auto">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-6">
            Rekomendasi Destinasi
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
            {places
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
                .map((place) => (
                    <RecommendationCard key={place.id} place={place} />
                ))}
        </div>
    </div>
</section>

            </main>

            <Footer />
        </>
    );
};

export default Detail;
