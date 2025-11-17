import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/detail/BackButton.jsx";
import RecommendationSection from "../components/home/recommendations/RecommendationSection.jsx";
import Footer from "../components/common/Footer.jsx";

const Populer = () => {
    const navigate = useNavigate();

    const hiddenGems = useMemo(
        () => [
            {
                id: 1,
                title: "Benteng Kuto Besak",
                desc: "Benteng peninggalan Kesultanan Palembang yang terletak di tepi Sungai Musi.",
                img: "/reco/bkb.png",
                rating: 4.0,
                to: "/detail/bkb",
            },
            {
                id: 2,
                title: "Jembatan Ampera",
                desc: "Ikon kota Palembang di atas Sungai Musi—wajib foto!",
                img: "/reco/ampera.png",
                rating: 4.0,
                to: "/detail/ampera",
            },
            {
                id: 3,
                title: "Pulau Kemaro",
                desc: "Pulau di Sungai Musi dengan pagoda, vihara, dan legenda Tan Bun An & Siti Fatimah.",
                img: "/reco/pulau-kemaro.png",
                rating: 4.0,
                to: "/detail/pulau-kemaro",
            },
            {
                id: 4,
                title: "Jakabaring Sport City",
                desc: "Pusat olahraga terbesar di Palembang dengan stadion, arena renang, lintasan atletik, dan fasilitas modern.",
                img: "/reco/jakabaring.png",     
                rating: 4.0,
                to: "/detail/jakabaring",
            },
            {
                id: 5,
                title: "Monpera",
                desc: "Monumen bersejarah di pusat kota Palembang yang dibangun untuk mengenang perjuangan rakyat melawan penjajah.",
                img: "/reco/monpera.png",       
                rating: 4.0,
                to: "/detail/monpera",
            },
            {
                id: 6,
                title: "Kampung Kapitan",
                desc: "Kawasan bersejarah di tepi Sungai Musi yang menampilkan rumah kayu bergaya kolonial dan Tionghoa.",
                img: "/reco/kampung-kapitan.png",
                rating: 4.0,
                to: "/detail/kampung-kapitan",
            },
            
        ],
        []
    );

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

            <RecommendationSection items={hiddenGems} />

            <Footer />
        </div>
    );
};

export default Populer;
