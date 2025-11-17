import React from "react";

export default function DestinationPopup({ open, onClose, title = "Destinasi Tersimpan" }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-100">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
                aria-hidden="true"
            />

            <div className="relative z-101 h-full w-full flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
                    <h2 className="text-2xl font-bold text-orange-500 mb-6">
                        {title}
                    </h2>

                    <div className="flex justify-center">
                        <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center">
                            <svg
                                className="w-9 h-9 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
