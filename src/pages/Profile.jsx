import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFavorites } from "../context/FavoritesProvider";
import { places } from "../data/places";

import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileDetails from "../components/profile/ProfileDetails";
import ProfileFavorites from "../components/profile/ProfileFavorites";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function Profile() {
    const { user } = useAuth();
    const { ids: favoriteIds } = useFavorites();
    const [search, setSearch] = useSearchParams();

    const tab = (search.get("tab") || "profile").toLowerCase();
    const setTab = (next) => {
        const params = new URLSearchParams(search);
        params.set("tab", next);
        setSearch(params, { replace: true });
    };

    const favorites = useMemo(() => {
        if (!favoriteIds || favoriteIds.length === 0) return [];
        return places
            .filter((p) => favoriteIds.includes(p.id))
            .map((p) => ({
                ...p,
                desc: p.desc || p.description || "",
                image: p.image || p.img,
            }));
    }, [favoriteIds]);

    const favoriteCategories = useMemo(() => {
        if (!favorites || favorites.length === 0) return [];
        const counts = {};
        favorites.forEach((place) => {
            (place.category || []).forEach((cat) => {
                const key = String(cat).toLowerCase();
                counts[key] = (counts[key] || 0) + 1;
            });
        });
        const MAX_FAVORITE_CATEGORIES = 2;

        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, MAX_FAVORITE_CATEGORIES)
            .map(([cat]) => cat);
    }, [favorites]);

    const favoriteCategory = favoriteCategories[0] || null;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
                        <ProfileSidebar
                            user={user}
                            activeTab={tab}
                            onChangeTab={setTab}
                        />

                        <div>
                            {tab === "profile" && (
                                <ProfileDetails
                                    user={user}
                                    favoriteCategory={favoriteCategory}
                                    favoriteCategories={favoriteCategories}
                                />
                            )}

                            {tab === "favorites" && (
                                <ProfileFavorites
                                    items={favorites}
                                    favoriteCategory={favoriteCategory}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
