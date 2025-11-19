import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileDetails from "../components/profile/ProfileDetails";
import ProfileFavorites from "../components/profile/ProfileFavorites";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function Profile() {
    const { user } = useAuth();
    const [search, setSearch] = useSearchParams();

    const tab = (search.get("tab") || "profile").toLowerCase();
    const setTab = (next) => {
        const params = new URLSearchParams(search);
        params.set("tab", next);
        setSearch(params, { replace: true });
    };

    const defaultFavorites = useMemo(
        () => [
            {
                id: "m1",
                title: "Museum Sultan Mahmud Badaruddin II",
                rating: 4.2,
                desc:
                    "Menampilkan koleksi sejarah Kesultanan Palembang dan peninggalan budaya Melayu.",
                image: "/images/fav-museum-smb2.jpg"
            },
            {
                id: "m2",
                title: "Museum Balaputra Dewa",
                rating: 4.0,
                desc: "Arkeologi, etnografi, dan rumah Limas yang ikonik.",
                image: "/images/fav-balaputra-dewa.jpg"
            },
            {
                id: "j1",
                title: "Jembatan Ampera",
                rating: 4.5,
                desc: "Ikon Palembang yang melintasi Sungai Musi.",
                image: "/images/fav-ampera.jpg"
            },
            {
                id: "b1",
                title: "Benteng Kuto Besak",
                rating: 4.2,
                desc: "Benteng peninggalan Kesultanan Palembang Darussalam.",
                image: "/images/fav-bkb.jpg"
            }
        ],
        []
    );

    const favorites = useMemo(() => {
        const raw = localStorage.getItem("favorites");
        if (!raw) return defaultFavorites;
        try {
            const arr = JSON.parse(raw);
            return Array.isArray(arr) && arr.length ? arr : defaultFavorites;
        } catch {
            return defaultFavorites;
        }
    }, [defaultFavorites]);

    return (
        <>
            <Navbar />

            <main className="mx-auto max-w-[1200px] px-4 sm:px-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
                    <ProfileSidebar
                        user={user}
                        activeTab={tab}
                        onChangeTab={setTab}
                    />

                    <div>
                        {tab === "profile" && <ProfileDetails user={user} />}
                        {tab === "favorites" && (
                            <ProfileFavorites items={favorites} />
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
