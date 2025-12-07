import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
} from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../lib/apiClient";
import { places } from "../data/places";

const FavoritesContext = createContext(null);
const LS_KEY = "favorites_ids";
const TOKEN_KEY = "token";

const normalizeFavoriteId = (value) => {
    if (value === null || value === undefined) return "";

    const s = String(value).trim();
    if (!s) return "";

    if (/^\d+$/.test(s)) {
        const n = Number(s);
        const match = places.find((p) => Number(p.id) === n);
        return match?.slug ? String(match.slug) : s;
    }

    return s;
};

const normalizeFavoriteList = (arr) => {
    if (!Array.isArray(arr)) return [];
    const out = [];
    for (const v of arr) {
        const id = normalizeFavoriteId(v);
        if (!id) continue;
        if (!out.includes(id)) out.push(id);
    }
    return out;
};

function FavoritesProvider({ children }) {
    const { user } = useAuth();
    const [ids, setIds] = useState([]);
    const [token, setToken] = useState(() => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(TOKEN_KEY);
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const syncToken = () => {
            setToken(localStorage.getItem(TOKEN_KEY));
        };

        syncToken();
        window.addEventListener("storage", syncToken);

        return () => {
            window.removeEventListener("storage", syncToken);
        };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return;

        try {
            const parsed = JSON.parse(raw);
            setIds(normalizeFavoriteList(parsed));
        } catch {}
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            localStorage.setItem(LS_KEY, JSON.stringify(ids));
        } catch {}
    }, [ids]);

    useEffect(() => {
        async function fetchFavorites() {
            if (!user || !token) return;

            try {
                const res = await api.get("/favorites");
                if (res.data && res.data.success && Array.isArray(res.data.ids)) {
                    setIds(normalizeFavoriteList(res.data.ids));
                }
            } catch (err) {
                if (err?.response?.status === 401) return;
                console.error("Gagal mengambil favorites dari server:", err);
            }
        }

        fetchFavorites();
    }, [user, token]);

    const toggle = useCallback(
        async (placeId) => {
            const normalized = normalizeFavoriteId(placeId);
            if (!normalized) return;

            const isFav = ids.includes(normalized);

            setIds((prev) => {
                if (prev.includes(normalized)) return prev.filter((x) => x !== normalized);
                return [...prev, normalized];
            });

            if (!user || !token) return;

            try {
                if (isFav) {
                    await api.delete(`/favorites/${normalized}`);
                } else {
                    await api.post("/favorites", { placeId: normalized });
                }
            } catch (err) {
                setIds((prev) => {
                    const hasNow = prev.includes(normalized);
                    if (isFav) {
                        if (hasNow) return prev;
                        return [...prev, normalized];
                    }
                    if (!hasNow) return prev;
                    return prev.filter((x) => x !== normalized);
                });

                if (err?.response?.status === 401) return;
                console.error("Gagal sync favorites ke server:", err);
            }
        },
        [ids, user, token]
    );

    const value = useMemo(() => {
        return {
            ids,
            toggle,
            has: (id) => ids.includes(normalizeFavoriteId(id)),
        };
    }, [ids, toggle]);

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}

export default FavoritesProvider;
