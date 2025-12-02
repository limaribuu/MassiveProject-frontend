import React, { useEffect, useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DestinationPlanCard from "../components/itinerary/DestinationPlanCard.jsx";
import { places } from "../data/places.js";
import { getPlaceDetailBySlug } from "../data/placeDetails.js";
import { useAuth } from "../hooks/useAuth";

import { API_BASE_URL } from "../config/api";

const RencanaPelesir = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [destinations, setDestinations] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [loading, setLoading] = useState(true);

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
                            id: item.id,
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
                    setTotalCost(Number(res.data.totalCost) || 0);
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
                {loading ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">
                            Memuat rencana pelesir...
                        </p>
                    </div>
                ) : destinations.length === 0 ? (
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
                        Estimasi Biaya :{" "}
                        {totalCost.toLocaleString("id-ID")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RencanaPelesir;
