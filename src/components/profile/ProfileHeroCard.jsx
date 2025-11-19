import React from "react";

const BACKEND_BASE_URL = "http://localhost:5000";

function resolveAvatar(path) {
    if (!path) return "/avatar-default.png";
    if (path.startsWith("http")) return path;
    return `${BACKEND_BASE_URL}${path}`;
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
