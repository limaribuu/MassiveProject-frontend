import React from "react";

import { BACKEND_BASE_URL } from "../../config/api";

function resolveAvatar(path) {
    if (!path) return "/avatar-default.png";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/uploads/")) return `${BACKEND_BASE_URL}${path}`;
    return path;
}

export default function ProfileHeroCard({ user, onChangePhoto }) {
    return (
        <div className="flex flex-col items-center">
            <div className="h-44 w-44 rounded-full overflow-hidden bg-gray-100 mb-4">
                <img
                    src={resolveAvatar(user?.avatar)}
                    alt={user?.name || "Foto Profil"}
                    className="h-full w-full object-cover"
                />
            </div>

            <button
                type="button"
                className="rounded-lg border border-[#F1721D]/40 text-[#F1721D] px-4 py-2 hover:bg-orange-50 transition"
                onClick={onChangePhoto}
            >
                Ubah Foto Profil
            </button>

            <p className="text-xs text-gray-500 mt-2 text-center max-w-[260px]">
                Format foto harus jpg, jpeg, png dan ukuran file max 2MB
            </p>
        </div>
    );
}
