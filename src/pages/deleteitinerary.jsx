import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteItineraryCard from "../components/itinerary/DeleteItineraryCard";
import DeletePopup from "../components/popup/deletepopup";

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

const DeleteItinerary = () => {
    const navigate = useNavigate();
    const [destinations, setDestinations] = useState(savedDestinations);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [destinationToDelete, setDestinationToDelete] = useState(null);

    const handleBack = () => {
        navigate("/rencana-pelesir");
    };

    const handleDeleteClick = (destinationId) => {
        setDestinationToDelete(destinationId);
        setShowDeletePopup(true);
    };

    const handleCancelDelete = () => {
        setShowDeletePopup(false);
        setDestinationToDelete(null);
    };

    const handleConfirmDelete = () => {
        setDestinations(
            destinations.filter((dest) => dest.id !== destinationToDelete)
        );
        setShowDeletePopup(false);
        setDestinationToDelete(null);
    };

    const handleSave = () => {
        navigate("/rencana-pelesir");
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 pb-24">
                <div className="bg-white shadow-md sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center relative">
                        <button
                            onClick={handleBack}
                            className="absolute left-6 w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition-colors shadow-lg"
                        >
                            <ArrowLeft size={24} />
                        </button>

                        <h1 className="text-3xl font-bold text-orange-500">
                            Rencana pelesir
                        </h1>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    {destinations.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">
                                Semua destinasi telah dihapus
                            </p>
                        </div>
                    ) : (
                        destinations.map((destination) => (
                            <DeleteItineraryCard
                                key={destination.id}
                                destination={destination}
                                onDelete={() =>
                                    handleDeleteClick(destination.id)
                                }
                            />
                        ))
                    )}
                </div>

                {destinations.length > 0 && (
                    <div className="fixed bottom-8 right-8">
                        <button
                            onClick={handleSave}
                            className="px-12 py-4 rounded-2xl font-bold text-xl shadow-2xl transition-all bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            Simpan
                        </button>
                    </div>
                )}
            </div>

            {showDeletePopup && (
                <DeletePopup
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </>
    );
};

export default DeleteItinerary;
