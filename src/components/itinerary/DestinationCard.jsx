import React from "react";

const DestinationCard = ({ destination, isActive, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`shrink-0 w-52 h-64 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 relative ${
                isActive
                    ? "scale-105 shadow-2xl"
                    : "opacity-80 hover:opacity-100 hover:scale-105"
            }`}
            style={
                isActive
                    ? {
                          border: "5px solid white",
                          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                      }
                    : {}
            }
        >
            <div className="relative w-full h-full">
                <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-4">
                    <h3 className="text-white font-bold text-base leading-tight">
                        {destination.name}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default DestinationCard;
