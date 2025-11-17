import React from "react";

export default function ProfileChips({ items = [] }) {
    return (
        <div className="flex flex-wrap gap-3">
            {items.map((it) => (
                <span
                    key={it.label}
                    className="inline-flex items-center rounded-lg bg-[#F1721D] text-white px-3 py-1.5 text-sm font-semibold"
                >
                    {it.label}
                </span>
            ))}
        </div>
    );
}
