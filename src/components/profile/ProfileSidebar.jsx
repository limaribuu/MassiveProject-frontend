import React from "react";

const BACKEND_BASE_URL = "http://localhost:5000";

function resolveAvatar(path) {
    if (!path) return "/avatar-default.png";
    if (path.startsWith("http")) return path;
    return `${BACKEND_BASE_URL}${path}`;
}

export default function ProfileSidebar({ user, activeTab, onChangeTab }) {
    return (
        <aside className="md:sticky md:top-4">
            <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                    {user?.avatar ? (
                        <img
                            src={resolveAvatar(user.avatar)}
                            alt={user?.name || "avatar"}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <svg viewBox="0 0 24 24" className="h-7 w-7 text-gray-600">
                            <path
                                fill="currentColor"
                                d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
                            />
                        </svg>
                    )}
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
