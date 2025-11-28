import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DeleteItineraryCard from "../components/itinerary/DeleteItineraryCard";
import DeletePopup from "../components/popup/deletepopup";
import { places } from "../data/places.js";
import { getPlaceDetailBySlug } from "../data/placeDetails.js";
import { useAuth } from "../hooks/useAuth";

const API_BASE_URL = "http://localhost:5000/api";

const DeleteItinerary = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [destinationToDelete, setDestinationToDelete] = useState(null); // slug

    useEffect(() => {
        async function fetchItinerary() {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(
                    `${API_BASE_URL}/itinerary/${user.id}`
                );

                if (res.data.success) {
                    const items = res.data.items || [];

                    const enriched = items.map((item) => {
                        const place = places.find(
                            (p) => p.slug === item.placeId
                        );
                        const detail = getPlaceDetailBySlug(item.placeId);

                        return {
                            rowId: item.id,
                            slug: item.placeId,
                            name: place?.title || item.placeId,
                            image:
                                detail?.mainImage ||
                                place?.image ||
                                "/img/default.png",
                            ticketPrice: Number(item.ticketPrice) || 0,
                            operationalDays:
                                detail?.sidebar?.operationalDays ||
                                "Senin - Minggu",
                            operationalHours:
                                detail?.sidebar?.operationalHours || "-",
                            location:
                                detail?.sidebar?.location ||
                                "Palembang, Sumatera Selatan"
                        };
                    });

                    setDestinations(enriched);
                }
            } catch (err) {
                console.error("Gagal mengambil itinerary:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchItinerary();
    }, [user]);

    const handleBack = () => {
        navigate("/rencana-pelesir");
    };

    const handleDeleteClick = (slug) => {
        setDestinationToDelete(slug);
        setShowDeletePopup(true);
    };

    const handleCancelDelete = () => {
        setShowDeletePopup(false);
        setDestinationToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!user || !destinationToDelete) return;

        try {
            await axios.delete(`${API_BASE_URL}/itinerary/remove`, {
                data: {
                    userId: user.id,
                    placeId: destinationToDelete
                }
            });

            setDestinations((prev) =>
                prev.filter((dest) => dest.slug !== destinationToDelete)
            );
        } catch (err) {
            console.error("Gagal menghapus destinasi dari itinerary:", err);
            alert("Terjadi kesalahan saat menghapus destinasi.");
        } finally {
            setShowDeletePopup(false);
            setDestinationToDelete(null);
        }
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
                            Rencana Pelesir
                        </h1>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    {loading ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">
                                Memuat data...
                            </p>
                        </div>
                    ) : destinations.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">
                                Semua destinasi telah dihapus
                            </p>
                        </div>
                    ) : (
                        destinations.map((destination) => (
                            <DeleteItineraryCard
                                key={destination.slug}
                                destination={destination}
                                onDelete={() =>
                                    handleDeleteClick(destination.slug)
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
