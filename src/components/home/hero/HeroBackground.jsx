import React from "react";

export default function HeroBackground({ src }) {
    return (
        <div className="absolute inset-0">
            <img
                key={src}
                src={src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-0 animate-[fadeIn_600ms_ease-out_forwards]"
            />

            <div className="absolute inset-0 bg-black/25" />
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0 }
                    to { opacity: 1 }
                }
            `}</style>
        </div>
    );
}
