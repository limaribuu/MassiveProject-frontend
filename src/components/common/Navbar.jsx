import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
    { to: "/home", label: "Home" },
    { to: "/destinasi", label: "Destinasi" },
    { to: "/itinerary", label: "Itinerary" },
    { to: "/ulasan", label: "Ulasan" },
];

export default function Navbar() {
    const { pathname } = useLocation();
    const { user, logout } = useAuth();
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function onClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(false);
            }
        }
        window.addEventListener("click", onClickOutside);
        return () => window.removeEventListener("click", onClickOutside);
    }, []);

    return (
        <div className="w-full border-b border-gray-200">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
                <nav className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3">
                    <Link to="/home" className="flex items-center gap-3">
                        <img
                            src="/logopelesir.png"
                            alt="Logo Pelisir Palembang"
                            className="h-12 w-12 object-contain"
                        />
                        <span className="text-xl sm:text-2xl font-extrabold tracking-wide text-[#1F2937]">
                            PELISIR PALEMBANG
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center justify-center gap-8 min-w-0">
                        {navItems.map(({ to, label }) => {
                            const active = pathname === to;
                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    className={[
                                        "text-[17px] font-medium transition whitespace-nowrap",
                                        active ? "text-[#F1721D]" : "text-gray-500 hover:text-gray-700",
                                    ].join(" ")}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center justify-end gap-2 sm:gap-4">
                        <button
                            aria-label="Cari"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-200"
                        >
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </button>

                        {!user && (
                            <>
                                <Link
                                    to="/signup"
                                    className="rounded-xl border border-gray-300 px-4 py-2 text-[16px] font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    Daftar
                                </Link>
                                <Link
                                    to="/login"
                                    className="rounded-xl bg-[#F1721D] px-4 py-2 text-[16px] font-semibold text-white hover:opacity-90"
                                >
                                    Login
                                </Link>
                            </>
                        )}

                        {user && (
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setOpenMenu((s) => !s)}
                                    className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 hover:bg-gray-50"
                                >
                                    <span className="inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                                        {user?.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-600">
                                                <path
                                                    fill="currentColor"
                                                    d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
                                                />
                                            </svg>
                                        )}
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
                                        <div className="flex items-center gap-3 p-4">
                                            <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                                                {user?.avatar ? (
                                                    <img
                                                        src={user.avatar}
                                                        alt={user.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-gray-600">
                                                        <path
                                                            fill="currentColor"
                                                            d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
                                                        />
                                                    </svg>
                                                )}
                                            </span>
                                            <div className="min-w-0">
                                                <div className="font-semibold text-gray-800 truncate">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-gray-500 truncate">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t">
                                            <Link
                                                to="/profil?tab=favorites"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                                                onClick={() => setOpenMenu(false)}
                                            >
                                                <svg className="h-5 w-5 text-[#F1721D]" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5A4.5 4.5 0 0 1 6.5 4c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 21 8.5c0 3.78-3.4 6.86-8.55 11.53Z" />
                                                </svg>
                                                <span className="text-gray-700 font-medium">Destinasi Favorite</span>
                                            </Link>

                                            <Link
                                                to="/profil?tab=profile"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                                                onClick={() => setOpenMenu(false)}
                                            >
                                                <svg className="h-5 w-5 text-[#F1721D]" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
                                                </svg>
                                                <span className="text-gray-700 font-medium">Profile</span>
                                            </Link>

                                            <button
                                                onClick={() => { logout(); setOpenMenu(false); }}
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
            </div>
        </div>
    );
}
