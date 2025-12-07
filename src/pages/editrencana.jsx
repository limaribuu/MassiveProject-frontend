import React, { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import DestinationPopup from "../components/popup/DestinasiPopup";
import { API_BASE_URL } from "../config/api";

const allDestinations = [
    { id: 1, slug: "jembatan-ampera", name: "Jembatan Ampera" },
    { id: 2, slug: "museum-sultan-mahmud", name: "Museum Sultan Mahmud" },
    { id: 3, slug: "museum-balaputra-dewa", name: "Museum Balaputra Dewa" },
    { id: 4, slug: "taman-purbakala", name: "Taman Purbakala" },
    { id: 5, slug: "alquran-al-akbar", name: "Al-Qur'an Al-Akbar" },
    { id: 6, slug: "monpera", name: "Monpera" },
    { id: 7, slug: "benteng-kuto-besak", name: "Benteng Kuto Besak" },
    { id: 8, slug: "pulau-kemaro", name: "Pulau Kemaro" },
];

const EditRencana = () => {
    const { user } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleBack = () => {
        window.history.back();
    };

    const handleSave = async () => {
        if (!selectedDestination || !user) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await axios.post(
                `${API_BASE_URL}/itinerary/add`,
                {
                    placeId: selectedDestination.slug,
                    ticketPrice: 0, // default
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                window.history.back();
            }, 1500);
        } catch (err) {
            console.error("Gagal menambah ke itinerary:", err);
            alert("Gagal menyimpan rencana.");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <div className="bg-white shadow-md">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center relative">
                        <button
                            onClick={handleBack}
                            className="absolute left-6 w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition-colors shadow-lg"
                        >
                            <ArrowLeft size={28} />
                        </button>

                        <h1 className="text-4xl font-bold text-orange-500">
                            Edit Rencana
                        </h1>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-linear-to-r from-orange-500 to-orange-400 text-white font-bold text-2xl py-5 px-8 rounded-2xl shadow-lg flex items-center justify-between mb-6 hover:from-orange-600 hover:to-orange-500 transition-all"
                    >
                        <span>PILIH DESTINASI</span>
                        <ChevronDown
                            size={32}
                            className={`transition-transform duration-300 ${
                                isDropdownOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <div className="space-y-4">
                            {allDestinations.map((dest) => (
                                <div
                                    key={dest.id}
                                    onClick={() => setSelectedDestination(dest)}
                                    className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow"
                                >
                                    <h3 className="text-orange-500 font-bold text-xl">
                                        {dest.name}
                                    </h3>

                                    <div
                                        className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all ${
                                            selectedDestination?.id === dest.id
                                                ? "border-orange-500 bg-orange-500"
                                                : "border-orange-500 bg-white"
                                        }`}
                                    >
                                        {selectedDestination?.id === dest.id && (
                                            <div className="w-3 h-3 rounded-full bg-white"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="fixed bottom-8 right-8">
                    <button
                        onClick={handleSave}
                        disabled={!selectedDestination}
                        className={`px-12 py-4 rounded-2xl font-bold text-xl shadow-2xl transition-all ${
                            selectedDestination
                                ? "bg-orange-500 hover:bg-orange-600 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        Simpan
                    </button>
                </div>
            </div>

            {showPopup && <DestinationPopup />}
        </>
    );
};

export default EditRencana;
