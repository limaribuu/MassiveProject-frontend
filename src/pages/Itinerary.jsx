import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DestinationCarousel from "../components/itinerary/DestinationCarousel";
import DestinationDetail from "../components/itinerary/DestinationDetail";
import { destinations } from "../data/itinerarydata";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useAuth } from "../hooks/useAuth";
import DestinationPopup from "../components/popup/DestinasiPopup";
import FailPopup from "../components/popup/failPopup";
import { API_BASE_URL } from "../config/api";

const Itinerary = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [selectedDestinationId, setSelectedDestinationId] = useState(
        destinations[0]?.id
    );

    const selectedDestination = useMemo(
        () => destinations.find((d) => d.id === selectedDestinationId),
        [selectedDestinationId]
    );

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showFailPopup, setShowFailPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const handleViewPlan = useCallback(() => {
        navigate("/rencana-pelesir");
    }, [navigate]);

    const handleSaveDestination = useCallback(
        async (destination) => {
            const token = localStorage.getItem("token");

            if (!user || !token) {
                setShowSuccessPopup(false);
                setShowFailPopup(false);
                setShowLoginPopup(true);
                return;
            }

            if (!destination?.slug) {
                console.error(
                    "Slug tidak ditemukan untuk destination id:",
                    destination?.id
                );
                alert("Terjadi kesalahan: destinasi belum dipetakan ke tempat.");
                return;
            }

            const placeId = destination.slug;
            const ticketPrice = destination.ticketPrice ?? 0;

            try {
                await axios.post(
                    `${API_BASE_URL}/itinerary/add`,
                    {
                        placeId,
                        ticketPrice,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setShowFailPopup(false);
                setShowLoginPopup(false);
                setShowSuccessPopup(true);
            } catch (err) {
                console.error("Gagal menyimpan destinasi ke itinerary:", err);
                setShowSuccessPopup(false);
                setShowLoginPopup(false);
                setShowFailPopup(true);
            }
        },
        [user]
    );

    if (!selectedDestination) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="max-w-3xl mx-auto px-8 py-20 text-center">
                    <h1 className="text-3xl font-bold mb-4">
                        Destinasi tidak ditemukan
                    </h1>
                    <p className="text-gray-600">
                        Data destinasi belum tersedia atau terjadi kesalahan pada
                        konfigurasi.
                    </p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="text-center pt-12 pb-8">
                <h1 className="text-6xl font-bold text-orange-500">
                    Rencanakan Pelesirmu
                </h1>
            </div>

            <div className="max-w-7xl mx-auto px-8 mb-12">
                <div className="rounded-[3rem] overflow-visible shadow-2xl">
                    <DestinationCarousel
                        destinations={destinations}
                        selectedId={selectedDestinationId}
                        onSelect={setSelectedDestinationId}
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 mb-12">
                <div className="px-0">
                    <DestinationDetail
                        destination={selectedDestination}
                        onSave={handleSaveDestination}
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 pb-16">
                <button
                    onClick={handleViewPlan}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl py-5 rounded-2xl shadow-lg transition-colors"
                >
                    Lihat Rencana Saya
                </button>
            </div>

            <Footer />

            <DestinationPopup
                isOpen={showSuccessPopup}
                onClose={() => setShowSuccessPopup(false)}
                variant="saved"
            />

            <DestinationPopup
                isOpen={showLoginPopup}
                onClose={() => setShowLoginPopup(false)}
                variant="login-required"
            />

            <FailPopup
                isOpen={showFailPopup}
                onClose={() => setShowFailPopup(false)}
            />
        </div>
    );
};

export default Itinerary;
