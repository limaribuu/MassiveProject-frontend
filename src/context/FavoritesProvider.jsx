import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
} from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const FavoritesContext = createContext(null);

import { API_BASE_URL } from "../config/api";
const LS_KEY = "favorites_ids";

function FavoritesProvider({ children }) {
    const { user } = useAuth();
    const [ids, setIds] = useState([]);

    useEffect(() => {
        async function fetchFavorites() {
            if (!user) {
                setIds([]);
                return;
            }

            try {
                const res = await axios.get(
                    `${API_BASE_URL}/favorites/${user.id}`
                );
                if (res.data.success && Array.isArray(res.data.ids)) {
                    setIds(res.data.ids);
                    localStorage.setItem(LS_KEY, JSON.stringify(res.data.ids));
                } else {
                    setIds([]);
                }
            } catch (err) {
                console.error("Gagal mengambil favorites dari server:", err);
                try {
                    const raw = localStorage.getItem(LS_KEY);
                    setIds(raw ? JSON.parse(raw) : []);
                } catch {
                    setIds([]);
                }
            }
        }

        fetchFavorites();
    }, [user]);

    useEffect(() => {
        try {
            localStorage.setItem(LS_KEY, JSON.stringify(ids));
        } catch {

        }
    }, [ids]);

    const toggle = async (placeId) => {
        if (!user) {

            setIds((prev) =>
                prev.includes(placeId)
                    ? prev.filter((x) => x !== placeId)
                    : [...prev, placeId]
            );
            return;
        }

        const isFav = ids.includes(placeId);

        setIds((prev) =>
            isFav ? prev.filter((x) => x !== placeId) : [...prev, placeId]
        );

        try {
            if (isFav) {
                await axios.delete(
                    `${API_BASE_URL}/favorites/${user.id}/${placeId}`
                );
            } else {
                await axios.post(`${API_BASE_URL}/favorites`, {
                    userId: user.id,
                    placeId,
                });
            }
        } catch (err) {
            console.error("Gagal sync favorites ke server:", err);
        }
    };

    const value = useMemo(
        () => ({
            ids,
            toggle,
            has: (id) => ids.includes(id),
        }),
        [ids]
    );

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
