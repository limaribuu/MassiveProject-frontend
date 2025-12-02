import React from "react";

import { BACKEND_BASE_URL } from "../../config/api";

function resolveAvatar(path) {
    if (!path) return "/avatar-default.png";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/uploads/")) return `${BACKEND_BASE_URL}${path}`;
    return path;
}

export default function ProfileSidebar({ user, activeTab, onChangeTab }) {
    return (
        <aside className="md:sticky md:top-4">
            <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                    <img
                        src={resolveAvatar(user?.avatar)}
                        alt={user?.name || "avatar"}
                        className="h-full w-full object-cover"
                    />
                </span>
                <div className="min-w-0">
                    <div className="font-semibold text-gray-800 truncate">{user?.name}</div>
                    <div className="text-sm text-gray-500 truncate">{user?.email}</div>
                </div>
            </div>

            <nav className="flex md:flex-col gap-4 md:gap-2">
                <button
                    onClick={() => onChangeTab("favorites")}
                    className={[
                        "text-left",
                        activeTab === "favorites"
                            ? "text-[#F1721D] font-semibold"
                            : "text-gray-700 hover:text-gray-900",
                    ].join(" ")}
                >
                    Destinasi Favorit
                </button>

                <button
                    onClick={() => onChangeTab("profile")}
                    className={[
                        "text-left",
                        activeTab === "profile"
                            ? "text-[#F1721D] font-semibold"
                            : "text-gray-700 hover:text-gray-900",
                    ].join(" ")}
                >
                    Profil
                </button>
            </nav>
        </aside>
    );
}
