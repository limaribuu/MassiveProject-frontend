import React from "react";

const DestinationPopup = ({ variant = "saved" }) => {

    const isLoginRequired = variant === "login-required";

    const title = isLoginRequired
        ? "Login Dulu"
        : "Destinasi Tersimpan";

    const iconPath = isLoginRequired
        ? "M12 9v4m0 4h.01M4.93 4.93l14.14 14.14"
        : "M5 13l4 4L19 7";

    const message = isLoginRequired
        ? "Login terlebih dahulu untuk menyimpan destinasi favorit."
        : "";

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center animate-scaleIn">
                <h2 className="text-3xl font-bold text-orange-500 mb-6">
                    {title}
                </h2>

                <div className="flex justify-center mb-4">
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
                                d={
                                    isLoginRequired
                                        ? "M12 9v2m0 4h.01M5 13l4 4L19 7" // campuran, masih OK
                                        : "M5 13l4 4L19 7"
                                }
                            />
                        </svg>
                    </div>
                </div>

                {message && (
                    <p className="text-sm text-gray-600">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default DestinationPopup;
