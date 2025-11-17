import React, { useState } from "react";
import DestinationCarousel from "../components/itinerary/DestinationCarousel";
import DestinationDetail from "../components/itinerary/DestinationDetail";
import { destinations } from "../data/itinerarydata";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Itinerary = () => {
    const [selectedDestinationId, setSelectedDestinationId] = useState(
        destinations[0].id
    );
    const selectedDestination = destinations.find(
        (d) => d.id === selectedDestinationId
    );

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
                    <DestinationDetail destination={selectedDestination} />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 pb-16">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl py-5 rounded-2xl shadow-lg transition-colors">
                    Lihat Rencana Saya
                </button>
            </div>

            <Footer />
        </div>
    );
};

export default Itinerary;
