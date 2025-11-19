import React, { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import DestinationPopup from "../components/popup/DestinasiPopup";

const allDestinations = [
    { id: 1, name: "Jembatan Ampera" },
    { id: 2, name: "Museum Sultan Mahmud" },
    { id: 3, name: "Museum Balaputra Dewa" },
    { id: 4, name: "Taman Purbakala" },
    { id: 5, name: "Al-Qur'an Al-Akbar" },
    { id: 6, name: "Monpera" },
    { id: 7, name: "Benteng Kuto Besak" },
    { id: 8, name: "Pulau Kemaro" }
];

const EditRencana = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);
    const [selectedDestinationId, setSelectedDestinationId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleBack = () => {
        window.history.back();
    };

    const handleSave = () => {
        if (selectedDestinationId) {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 2000);
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
                            {allDestinations.map((destination) => (
                                <div
                                    key={destination.id}
                                    onClick={() =>
                                        setSelectedDestinationId(
                                            destination.id
                                        )
                                    }
                                    className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow"
                                >
                                    <h3 className="text-orange-500 font-bold text-xl">
                                        {destination.name}
                                    </h3>

                                    <div
                                        className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all ${
                                            selectedDestinationId ===
                                            destination.id
                                                ? "border-orange-500 bg-orange-500"
                                                : "border-orange-500 bg-white"
                                        }`}
                                    >
                                        {selectedDestinationId ===
                                            destination.id && (
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
                        disabled={!selectedDestinationId}
                        className={`px-12 py-4 rounded-2xl font-bold text-xl shadow-2xl transition-all ${
                            selectedDestinationId
                                ? "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
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
