import React from "react";

export default function HeroDots({ total, active, onSelect }) {
    return (
        <div className="absolute bottom-6 left-0 right-0 z-10">
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="flex items-center gap-3">
                    {Array.from({ length: total }).map((_, i) => {
                        const isActive = i === active;
                        return (
                            <button
                                key={i}
                                onClick={() => onSelect(i)}
                                aria-label={`Slide ${i + 1}`}
                                className={[
                                    "h-2.5 rounded-full transition-all",
                                    isActive
                                        ? "w-8 bg-white"
                                        : "w-2.5 bg-white/60 hover:bg-white/80",
                                ].join(" ")}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
