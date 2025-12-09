import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { places } from "../../data/places";

import { BACKEND_BASE_URL } from "../../config/api";

function resolveAvatar(path) {
    if (!path) return "/avatar-default.png";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/uploads/")) return `${BACKEND_BASE_URL}${path}`;
    return path;
}

const navItems = [
    { to: "/home", label: "Home" },
    { to: "/destinasi", label: "Destinasi" },
    { to: "/itinerary", label: "Itinerary" },
    { to: "/ulasan", label: "Ulasan" }
];

export default function Navbar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);

    const [mobileOpen, setMobileOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredPlaces = React.useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return [];
        const result = places.filter((p) =>
            (p.title || "").toLowerCase().includes(q)
        );
        result.sort((a, b) => {
            const at = a.title.toLowerCase();
            const bt = b.title.toLowerCase();
            const aStarts = at.startsWith(q);
            const bStarts = bt.startsWith(q);
            if (aStarts !== bStarts) return aStarts ? -1 : 1;
            return at.localeCompare(bt);
        });
        return result.slice(0, 8);
    }, [searchQuery]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!filteredPlaces.length) return;
        navigate(`/detail/${filteredPlaces[0].slug}`);
        setSearchQuery("");
        setMobileOpen(false);
    };

    const handleSelectPlace = (place) => {
        navigate(`/detail/${place.slug}`);
        setSearchQuery("");
        setMobileOpen(false);
    };

    useEffect(() => {
        const close = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(false);
            }
        };
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    return (
        <div className="w-full border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1250px] px-6">
                <nav className="flex items-center justify-between py-4 gap-4 md:gap-6">
                    <div className="flex items-center gap-3 md:gap-10">
                        <Link
                            to="/home"
                            className="flex items-center gap-3 shrink min-w-0"
                        >
                            <img
                                src="/logopelesir.png"
                                alt="Logo"
                                className="h-12 w-12 object-contain shrink-0"
                            />
                            <span
                                className="
                                text-lg
                                sm:text-xl
                                md:text-2xl
                                font-extrabold 
                                tracking-wide 
                                text-[#1F2937]
                                truncate
                                max-w-[150px] sm:max-w-none
                            "
                            >
                                PELESIR PALEMBANG
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map(({ to, label }) => {
                                const active = pathname === to;
                                return (
                                    <Link
                                        key={to}
                                        to={to}
                                        className={[
                                            "text-[17px] font-medium transition",
                                            active
                                                ? "text-[#F1721D]"
                                                : "text-gray-600 hover:text-gray-900"
                                        ].join(" ")}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
                            onClick={() => setMobileOpen((prev) => !prev)}
                        >
                            {mobileOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="flex-1" />

                    <div className="flex items-center gap-3 sm:gap-6">
                        <div className="relative hidden md:block">
                            <form onSubmit={handleSearchSubmit}>
                                <div className="flex items-center rounded-full bg-gray-100 px-3 py-1.5 w-52 sm:w-64 lg:w-72">
                                    <svg
                                        className="h-5 w-5 text-gray-500"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.35-4.35"></path>
                                    </svg>

                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        placeholder="Cari destinasi..."
                                        className="ml-2 w-full bg-transparent text-sm text-gray-700 focus:outline-none"
                                    />
                                </div>
                            </form>

                            {searchQuery.trim() !== "" &&
                                filteredPlaces.length > 0 && (
                                    <div className="absolute right-0 z-50 mt-2 w-64 sm:w-72 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
                                        {filteredPlaces.map((p) => (
                                            <button
                                                key={p.slug}
                                                onClick={() =>
                                                    handleSelectPlace(p)
                                                }
                                                className="flex w-full items-start gap-3 px-3 py-2 text-left hover:bg-gray-50"
                                            >
                                                {p.img && (
                                                    <img
                                                        src={p.img}
                                                        alt={p.title}
                                                        className="h-10 w-10 rounded-md object-cover"
                                                    />
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {p.title}
                                                    </p>
                                                    {p.desc && (
                                                        <p className="text-xs text-gray-500 line-clamp-2">
                                                            {p.desc}
                                                        </p>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                        </div>

                        {!user ? (
                            <>
                                <Link
                                    to="/signup"
                                    className="hidden sm:inline rounded-xl border border-gray-300 px-4 py-2 font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    Daftar
                                </Link>
                                <Link
                                    to="/login"
                                    className="rounded-xl bg-[#F1721D] px-4 py-2 font-semibold text-white hover:opacity-90"
                                >
                                    Login
                                </Link>
                            </>
                        ) : (
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setOpenMenu(!openMenu)}
                                    className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 hover:bg-gray-50"
                                >
                                    <span className="h-9 w-9 rounded-full overflow-hidden">
                                        <img
                                            src={resolveAvatar(user.avatar)}
                                            alt={user.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </span>
                                    <span className="hidden sm:block text-[16px] font-medium text-gray-700 max-w-[140px] truncate">
                                        {user.name}
                                    </span>
                                    <svg
                                        className="h-4 w-4 text-gray-500"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </button>

                                {openMenu && (
                                    <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-gray-200 bg-white shadow-xl z-50">
                                        <div className="p-4 flex items-center gap-3">
                                            <img
                                                src={resolveAvatar(user.avatar)}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800">
                                                    {user.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border-t">
                                            <Link
                                                to="/profil?tab=favorites"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                                                onClick={() => setOpenMenu(false)}
                                            >
                                                <svg
                                                    className="h-5 w-5 text-[#F1721D]"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 7.5 3 5.6 5.6 0 0 1 12 5.09 5.6 5.6 0 0 1 16.5 3 5.5 5.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.53Z" />
                                                </svg>
                                                <span className="text-gray-700 font-medium">
                                                    Destinasi Favorite
                                                </span>
                                            </Link>

                                            <Link
                                                to="/profil?tab=profile"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                                                onClick={() => setOpenMenu(false)}
                                            >
                                                <svg
                                                    className="h-5 w-5 text-[#F1721D]"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
                                                </svg>
                                                <span className="text-gray-700 font-medium">
                                                    Profile
                                                </span>
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    logout();
                                                    setOpenMenu(false);
                                                }}
                                                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-red-600 font-medium"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </nav>

                {mobileOpen && (
                    <div className="md:hidden pb-4 border-t border-gray-200">
                        <div className="mt-3">
                            <form onSubmit={handleSearchSubmit}>
                                <div className="flex items-center rounded-full bg-gray-100 px-3 py-1.5 w-full">
                                    <svg
                                        className="h-5 w-5 text-gray-500"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.35-4.35"></path>
                                    </svg>

                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        placeholder="Cari destinasi..."
                                        className="ml-2 w-full bg-transparent text-sm text-gray-700 focus:outline-none"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="mt-4 flex flex-col gap-2">
                            {navItems.map(({ to, label }) => {
                                const active = pathname === to;
                                return (
                                    <Link
                                        key={to}
                                        to={to}
                                        onClick={() => setMobileOpen(false)}
                                        className={[
                                            "px-2 py-1.5 text-base font-medium",
                                            active
                                                ? "text-[#F1721D]"
                                                : "text-gray-700 hover:text-gray-900"
                                        ].join(" ")}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </div>

                        {!user && (
                            <div className="mt-4 flex gap-2">
                                <Link
                                    to="/signup"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-center font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    Daftar
                                </Link>
                                <Link
                                    to="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex-1 rounded-xl bg-[#F1721D] px-4 py-2 text-center font-semibold text-white hover:opacity-90"
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
