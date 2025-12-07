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
        const normalized = Array.isArray(favoriteIds)
            ? Array.from(new Set(favoriteIds.map(normalizeFavoriteId).filter(Boolean)))
            : [];

        if (normalized.length === 0) return [];

        const indexBySlug = Object.fromEntries(places.map((p) => [p.slug, p]));

        return normalized
            .map((slug) => indexBySlug[slug])
            .filter(Boolean)
            .map((p) => ({
                id: p.slug,
                slug: p.slug,
                title: p.title,
                desc: p.desc || p.description || "",
                img: p.img || p.image || "/img/placeholder.png",
                rating: typeof p.rating === "number" ? p.rating : Number(p.rating || 0) || 0,
                to: `/detail/${p.slug}`,
            }));
    }, [favoriteIds]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
                        <ProfileSidebar user={user} activeTab={tab} onChangeTab={setTab} />

                        <div>
                            {tab === "profile" && <ProfileDetails user={user} />}

                            {tab === "favorites" && <ProfileFavorites items={favorites} />}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
