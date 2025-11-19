import React from "react";
import { Trash2 } from "lucide-react";

const DeleteItineraryCard = ({ destination, onDelete }) => {
    return (
        <div className="flex gap-4 mb-6">
            <div className="flex-1 relative rounded-3xl overflow-hidden shadow-lg h-64">
                <div className="absolute inset-0">
                    <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="relative h-full p-6 flex flex-col justify-between text-white">
                    <h2 className="text-3xl font-bold mb-4">{destination.name}</h2>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <h3 className="text-sm font-semibold mb-1">Estimasi Biaya</h3>
                            <p className="text-base font-bold">Tiket Masuk</p>
                            <p className="text-base font-bold">
                                Rp. {destination.ticketPrice.toLocaleString("id-ID")}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold mb-1">Jam Operasional</h3>
                            <p className="text-base font-bold">
                                {destination.operationalDays}
                            </p>
                            <p className="text-base font-bold">
                                {destination.operationalHours}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold mb-1">Lokasi</h3>
                            <p className="text-sm leading-relaxed">{destination.location}</p>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={onDelete}
                className="w-32 h-64 bg-red-500 hover:bg-red-600 rounded-3xl flex items-center justify-center transition-colors shadow-lg shrink-0"
            >
                <Trash2 size={48} className="text-white" strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default DeleteItineraryCard;
