import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavoritesContext = createContext(null);
const FAVORITES_KEY = "favorites";

function readFavoritesFromStorage() {
    try {
        const raw = localStorage.getItem(FAVORITES_KEY);
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
        setFavorites(prev => {
            if (prev.includes(key)) {
                return prev.filter(item => item !== key);
            }
            return [...prev, key];
        });
    }

    useEffect(() => {
        try {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        } catch {}
    }, [favorites]);

    const value = useMemo(
        () => ({
            favorites,
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
