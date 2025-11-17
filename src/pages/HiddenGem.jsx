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
                title: "Museum Sultan Mahmud Badaruddin II", 
                desc: "Menampilkan koleksi sejarah Kesultanan Palembang dan peninggalan budaya Melayu. Cocok untuk mengenal lebih dekat warisan kota Palembang.", 
                img: "/reco/museum-smb2.png", 
                rating: 4.0, 
                to: "/detail/museum-smb-ii" 
            },
            { 
                id: 2, 
                title: "Museum Balaputra Dewa", 
                desc: "Museum berisi peninggalan arkeologi, etnografi, dan budaya Sumatera Selatan, termasuk rumah adat Limas yang ikonik.", 
                img: "/reco/balaputra.png", 
                rating: 4.0, 
                to: "/detail/museum-balaputra" 
            },
            { 
                id: 3, 
                title: "Bukit Siguntang", 
                desc: "Bukit bersejarah yang diyakini sebagai situs Kerajaan Sriwijaya dan dikenal sebagai kawasan ziarah spiritual.", 
                img: "/reco/bukit-siguntang.png", 
                rating: 4.0, 
                to: "/detail/bukit-siguntang" 
            },
            {
                id: 4,
                title: "Taman Purbakala",
                desc: "Destinasi bersejarah di Palembang yang menyimpan peninggalan zaman Sriwijaya.",
                img: "/reco/taman-purbakala.png",
                rating: 4.0,
                to: "/detail/taman-purbakala",
            },
            {
                id: 5,
                title: "Lorong Basah Night Culinary",
                desc: "Destinasi kuliner malam populer di Palembang, penuh jajanan khas Palembang dan makanan modern.",
                img: "/reco/lorong-basah.png",         
                rating: 4.0,
                to: "/detail/lorong-basah",
            },
            {
                id: 6,
                title: "Bayt Al-Quran Al-Akbar",
                desc: "Destinasi religi di Palembang yang terkenal dengan Al-Quran raksasa ukir kayu. Pengunjung bisa melihat langsung keindahan ayat suci berukir.",
                img: "/reco/bayt-alquran.png",    
                rating: 4.0,
                to: "/detail/bayt-alquran",
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
                    Rekomendasi Destinasi <br /> Hidden Gems
                </h1>
            </div>

            <div className="flex justify-center my-8">
                <img
                    src="/reco/museum.png"
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
