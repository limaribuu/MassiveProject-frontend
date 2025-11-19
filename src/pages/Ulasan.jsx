import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer.jsx";
import ReviewCard from "../components/ulasan/ReviewCard.jsx";

const reviewItems = [
    {
        id: 1,
        title: "AMPERA",
        image: "/img/ulasan/ampera.jpg",
        rating: 5,
        reviews: 120
    },
    {
        id: 2,
        title: "MUSEUM SULTAN MAHMUD BD II",
        image: "/img/ulasan/museum-smb2.jpg",
        rating: 4,
        reviews: 80
    },
    {
        id: 3,
        title: "MUSEUM BALAPUTRA DEWA",
        image: "/img/ulasan/balaputra.jpg",
        rating: 4,
        reviews: 64
    },
    {
        id: 4,
        title: "TAMAN PURBAKALA",
        image: "/img/ulasan/purbakala.jpg",
        rating: 5,
        reviews: 40
    },
    {
        id: 5,
        title: "AL-QURAN AL-AKBAR",
        image: "/img/ulasan/alquran.jpg",
        rating: 5,
        reviews: 95
    },
    {
        id: 6,
        title: "BUKIT SIGUNTANG",
        image: "/img/ulasan/siguntang.jpg",
        rating: 4,
        reviews: 52
    },
    {
        id: 7,
        title: "PULAU KEMARO",
        image: "/img/ulasan/pulau-kemaro.jpg",
        rating: 5,
        reviews: 110
    },
    {
        id: 8,
        title: "BENTENG KUTO BESAK",
        image: "/img/ulasan/bkb.jpg",
        rating: 4,
        reviews: 73
    },
    {
        id: 9,
        title: "MONPERA",
        image: "/img/ulasan/monpera.jpg",
        rating: 4,
        reviews: 61
    },
    {
        id: 10,
        title: "JAKABARING SPORT CITY",
        image: "/img/ulasan/jakabaring.jpg",
        rating: 5,
        reviews: 88
    },
    {
        id: 11,
        title: "LORONG BASAH NIGHT CULINARY",
        image: "/img/ulasan/kampung-kapitan.jpg",
        rating: 4,
        reviews: 37
    },
    {
        id: 12,
        title: "KAMPUNG KAPITAN",
        image: "/img/ulasan/hidden-gem.jpg",
        rating: 4,
        reviews: 22
    }
];

const Ulasan = () => {
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-white">
                <section className="mx-auto max-w-6xl px-6 pt-10">
                    <h1 className="text-center text-[28px] md:text-[32px] font-extrabold text-orange-500">
                        Ulasan Wisata
                    </h1>
                </section>

                <section className="mx-auto max-w-6xl px-6 pt-6">
                    <div className="overflow-x-auto pb-3">
                        <div className="flex gap-4 min-w-max snap-x snap-mandatory">
                            {reviewItems.map((item) => (
                                <div key={item.id} className="snap-start">
                                    <ReviewCard {...item} />
                                </div>
                            ))}
                        </div>
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
