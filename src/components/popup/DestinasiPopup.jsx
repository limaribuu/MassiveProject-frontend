import React from "react";

const DestinationPopup = ({ isOpen = true, onClose, variant = "saved" }) => {
  if (!isOpen) return null;

  const isLoginRequired = variant === "login-required";

  const title = isLoginRequired ? "Login Dulu" : "Destinasi Tersimpan";

  const message = isLoginRequired
    ? "Login terlebih dahulu untuk menyimpan destinasi favorit."
    : "";

  const handleOverlayClick = () => {
    if (onClose) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={handleOverlayClick} 
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center animate-scaleIn"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-3xl font-bold text-orange-500 mb-6">{title}</h2>

        <div className="flex justify-center mb-4">
          {/* Lingkaran oranye luar */}
          <div className="bg-orange-500 rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
            >
              {isLoginRequired ? (
                <>
                  <rect
                    x="10.5"
                    y="4.5"
                    width="3"
                    height="9.5"
                    rx="1.5"
                    fill="currentColor"
                    stroke="none"
                  />
                  <circle
                    cx="12"
                    cy="16.5"
                    r="1.7"
                    fill="currentColor"
                    stroke="none"
                  />
                </>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              )}
            </svg>
          </div>
        </div>

        {message && <p className="text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default DestinationPopup;
