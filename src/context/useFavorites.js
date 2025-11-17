import { useContext } from "react";
import { FavCtx } from "./FavoritesProvider";

export function useFavorites() {
    return useContext(FavCtx);
}
