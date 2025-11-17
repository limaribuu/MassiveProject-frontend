import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
} from "react";

const FavoritesContext = createContext(null);

function FavoritesProvider({ children }) {
    const [ids, setIds] = useState(() => {
        try {
            const raw = localStorage.getItem("favorites_ids");
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("favorites_ids", JSON.stringify(ids));
        } catch {

        }
    }, [ids]);

    const toggle = (id) => {
        setIds((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
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
