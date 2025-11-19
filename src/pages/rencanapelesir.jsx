import React, { useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DestinationPlanCard from "../components/itinerary/DestinationPlanCard.jsx";

const savedDestinations = [
    {
        id: 1,
        name: "Bukit Siguntang",
        image: "/reco/bukit-siguntang.png",
        ticketPrice: 7000,
        operationalDays: "Senin - Minggu",
        operationalHours: "08.00-17.00",
        location:
            "Taman Bukit Siguntang, Jalan Sultan M Mansyur 30139 Palembang South Sumatra."
    },
    {
        id: 2,
        name: "Museum Balaputra Dewa",
        image: "/reco/balaputra.png",
        ticketPrice: 7000,
        operationalDays: "Senin - Minggu",
        operationalHours: "08.30-15.30",
        location:
            "Museum Negeri Sumatera Selatan Balaputra Dewa, Jalan Srijaya I Km. 5,5 No. 255 30151 Palembang Sumatera Selatan"
    },
    {
        id: 3,
        name: "Museum Sultan Mahmud Badarrudin II",
        image: "/img/dalammuseum.png",
        ticketPrice: 7000,
        operationalDays: "Selasa - Minggu",
        operationalHours: "08.30-15.30",
        location:
            "Museum Sultan Mahmud Badaruddin II, Jalan Palembang Darussalam 30113 Palembang South Sumatra."
    }
];

const RencanaPelesir = () => {
    const navigate = useNavigate();
    const [destinations] = useState(savedDestinations);

    const totalCost = destinations.reduce(
        (sum, dest) => sum + dest.ticketPrice,
        0
    );

    const handleBack = () => {
        navigate("/itinerary");
    };

    const handleAddDestination = () => {
        navigate("/edit-rencana");
    };

    const handleDeleteAll = () => {
        navigate("/delete-itinerary");
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition-colors shadow-lg"
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <h1 className="text-3xl font-bold text-orange-500">
                        Rencana Pelesir
                    </h1>

                    <div className="flex gap-3">
                        <button
                            onClick={handleAddDestination}
                            className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition-colors shadow-lg"
                        >
                            <Plus size={24} />
                        </button>
                        <button
                            onClick={handleDeleteAll}
                            className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition-colors shadow-lg"
                        >
                            <Trash2 size={24} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {destinations.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">
                            Belum ada destinasi yang disimpan
                        </p>
                    </div>
                ) : (
                    destinations.map((destination) => (
                        <DestinationPlanCard
                            key={destination.id}
                            destination={destination}
                        />
                    ))
                )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-linear-to-t from-white via-white to-transparent">
                <div className="max-w-4xl mx-auto">
                    <button className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xl py-5 rounded-full shadow-2xl transition-all">
                        Estimasi Biaya : {totalCost.toLocaleString("id-ID")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RencanaPelesir;
