import React from "react";

const DestinationPopup = () => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center animate-scaleIn">
                <h2 className="text-3xl font-bold text-orange-500 mb-8">
                    Destinasi Tersimpan
                </h2>

                <div className="flex justify-center">
                    <div className="bg-orange-500 rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                        <svg
                            className="w-12 h-12 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationPopup;
