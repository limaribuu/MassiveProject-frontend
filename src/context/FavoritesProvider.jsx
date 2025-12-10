import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavoritesContext = createContext(null);
// Samakan dengan yang dipakai ProfileDetails
const FAVORITES_KEY = "favorites_ids";

function readFavoritesFromStorage() {
    try {
        // Baca dari key baru dulu, kalau kosong coba key lama ("favorites")
        const raw =
            localStorage.getItem(FAVORITES_KEY) ||
            localStorage.getItem("favorites"); // 👈 backward compatible
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
        return [];
    } catch {
        return [];
    }
}

function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => readFavoritesFromStorage());

    function has(id) {
        if (!id) return false;
        const key = String(id);
        return favorites.includes(key);
    }

    function toggle(id) {
        if (!id) return;
        const key = String(id);
        setFavorites((prev) => {
            if (prev.includes(key)) {
                return prev.filter((item) => item !== key);
            }
            return [...prev, key];
        });
    }

    useEffect(() => {
        try {
            // Simpan ke key baru
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
            // Optional: juga simpan ke key lama untuk berjaga-jaga
            localStorage.setItem("favorites", JSON.stringify(favorites));
        } catch {}
    }, [favorites]);

    const value = useMemo(
        () => ({
            favorites,
            ids: favorites, // 👈 supaya Profile.jsx yang pakai { ids } tetap jalan
            has,
            toggle
        }),
        [favorites]
    );

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesProvider;

export function useFavorites() {
    const ctx = useContext(FavoritesContext);
    if (!ctx) {
        throw new Error("useFavorites must be used within FavoritesProvider");
    }
    return ctx;
}
