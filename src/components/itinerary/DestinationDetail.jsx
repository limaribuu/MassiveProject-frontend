import React from "react";

const DestinationDetail = ({ destination, onSave }) => {
    if (!destination) return null;

    const handleSaveClick = () => {
        if (onSave) onSave(destination);
    };

    const shortOverlayText =
        destination.name === "Monpera"
            ? "Monpera (Monumen Perjuangan Rakyat) adalah monumen bersejarah yang terletak di Palembang, Sumatera Selatan."
            : `${destination.name} adalah salah satu destinasi wisata di Palembang, Sumatera Selatan.`;

    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full relative z-10">
            <div className="flex gap-6 flex-col md:flex-row">
                <div className="shrink-0 w-full md:w-72">
                    <div className="relative rounded-lg overflow-hidden">
                        <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-full h-64 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/70 to-transparent p-4">
                            <h3 className="text-white font-bold text-lg">
                                {destination.name}
                            </h3>
                            <p className="text-white text-xs mt-1 leading-relaxed">
                                {shortOverlayText}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative mt-4 md:mt-0">
                    <p className="text-gray-700 leading-relaxed text-justify pr-0 md:pr-4">
                        {destination.description}
                    </p>

                    <button
                        onClick={handleSaveClick}
                        className="mt-4 md:mt-0 md:absolute md:bottom-0 md:right-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
                    >
                        + Simpan Destinasi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DestinationDetail;
