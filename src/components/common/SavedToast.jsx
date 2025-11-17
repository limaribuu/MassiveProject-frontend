import React from "react";

export default function SavedToast({ open, onClose }) {
    if (!open) return null;

    return (
        <div className="fixed inset-x-0 top-24 flex justify-center z-60">
            <button
                type="button"
                onClick={onClose}
                className="bg-white rounded-2xl shadow-xl border border-orange-100 px-10 py-6 flex flex-col items-center gap-3 animate-toast-pop"
            >
                <h3 className="text-xl font-bold text-[#F1721D]">
                    Destinasi Tersimpan
                </h3>

                <div className="h-16 w-16 rounded-full bg-[#F1721D] flex items-center justify-center">
                    <svg
                        viewBox="0 0 24 24"
                        className="h-9 w-9 text-white"
                        aria-hidden="true"
                    >
                        <path
                            fill="currentColor"
                            d="M9.00039 16.2L5.30039 12.5L3.90039 13.9L9.00039 19L21.0004 7L19.6004 5.6L9.00039 16.2Z"
                        />
                    </svg>
                </div>
            </button>
        </div>
    );
}
