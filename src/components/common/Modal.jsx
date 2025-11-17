import React, { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, description, confirmText = "OK", onConfirm }) {
    useEffect(() => {
        function onKey(e) { if (e.key === "Escape") onClose?.(); }
        if (isOpen) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal is-open" aria-hidden="false">
            <div className="modal__backdrop" onClick={onClose} />
            <div className="modal__card" role="dialog" aria-modal="true">
                <div className="modal__icon">✓</div>
                <h2 className="modal__title">{title}</h2>
                <p className="modal__desc">{description}</p>
                <button
                    className="modal__btn"
                    onClick={() => {
                        onConfirm?.();
                        onClose?.();
                    }}
                >
                    {confirmText}
                </button>
            </div>
        </div>
    );
}
