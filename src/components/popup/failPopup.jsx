import React from "react";

const FailPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
        <h2 className="text-3xl font-bold text-orange-500 mb-6">
          Destinasi Gagal Tersimpan
        </h2>

        <div className="flex justify-center mb-8">
          <div className="bg-orange-500 rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
            {/* ICON X */}
            <svg
              className="w-12 h-12 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailPopup;
