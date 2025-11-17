import React from "react";

export default function ProfileFieldRow({ label, value, editable = false }) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <div className="text-sm text-gray-600">{label}</div>
                <div className="mt-1 text-gray-800">{value}</div>
            </div>

            {editable && (
                <button
                    type="button"
                    className="shrink-0 mt-5"
                    aria-label={`Ubah ${label}`}
                    title={`Ubah ${label}`}
                >
                    <img
                        src="/icons/edit.png"
                        alt="Edit"
                        className="h-5 w-5"
                    />
                </button>
            )}
        </div>
    );
}
