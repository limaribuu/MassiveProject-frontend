import React from "react";

const DeletePopup = ({ onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center animate-scaleIn">
                <h2 className="text-2xl font-bold text-orange-500 mb-8">
                    Anda yakin ingin menghapus destinasi ini ?
                </h2>

                <div className="flex justify-center gap-6">
                    <button
                        onClick={onCancel}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-10 rounded-xl shadow-md transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-10 rounded-xl shadow-md transition-colors"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePopup;
