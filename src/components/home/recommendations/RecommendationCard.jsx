import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFavorites } from "../../../context/FavoritesProvider";
import DestinationPopup from "../../popup/DestinasiPopup";
import { useAuth } from "../../../hooks/useAuth";

import { API_BASE_URL } from "../../../config/api";

export default function RecommendationCard({
    place,
    id,
    slug,
    title,
    desc,
    img,
    rating = 0,
    to = "#",
    variant = "default"
}) {
    const data = place || {
        id:
            id ||
            slug ||
            to?.replace("/detail/", "") ||
            (title || "").toLowerCase().replaceAll(" ", "-"),
        slug:
            slug ||
            to?.replace("/detail/", "") ||
            (title || "").toLowerCase().replaceAll(" ", "-"),
        title,
        desc,
        img,
        rating
    };

    const [displayRating, setDisplayRating] = useState(Number(data.rating || 0));

    useEffect(() => {
        let isMounted = true;

        async function fetchAverageRating() {
            try {
                if (!data.slug || variant === "saved") return;

                const res = await axios.get(`${API_BASE_URL}/reviews/${data.slug}`);
                if (!isMounted) return;

                if (res.data?.success && res.data.summary?.averageRating != null) {
                    setDisplayRating(Number(res.data.summary.averageRating));
                }
            } catch (err) {
                console.error("Error loading average rating:", err);
            }
        }

        fetchAverageRating();
        return () => {
            isMounted = false;
        };
    }, [data.slug, variant]);

    const detailHref = `/detail/${data.slug}`;
    const { has, toggle } = useFavorites();
    const liked = has(data.id);

    const [showSaved, setShowSaved] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    function handleToggleFavorite(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (!user) {
            setShowLoginPopup(true);

            setTimeout(() => {
                navigate("/login", {
                    state: { from: location },
                    replace: true
                });
            }, 1200);

            return;
        }

        const wasLiked = liked;
        toggle(data.id);
        if (!wasLiked) {
            setShowSaved(true);
        }
    }

    useEffect(() => {
        if (!showSaved) return;
        const t = setTimeout(() => setShowSaved(false), 2000);
        return () => clearTimeout(t);
    }, [showSaved]);

    useEffect(() => {
        if (!showLoginPopup) return;
        const t = setTimeout(() => setShowLoginPopup(false), 2000);
        return () => clearTimeout(t);
    }, [showLoginPopup]);

    const isSaved = variant === "saved";

    const card = (
        <article className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md">
            <div
                className={`relative w-full overflow-hidden ${
                    isSaved ? "h-[260px]" : "h-[520px]"
                }`}
            >
                <img
                    src={data.img}
                    alt={data.title}
                    className="h-full w-full object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/0" />

                <button
                    type="button"
                    aria-label={
                        liked
                            ? "Hapus dari destinasi favorit"
                            : "Simpan ke destinasi favorit"
                    }
                    onClick={handleToggleFavorite}
                    className={`absolute right-4 top-4 z-20 inline-flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${
                        isSaved ? "h-9 w-9" : "h-11 w-11"
                    }`}
                >
                    <svg
                        viewBox="0 0 24 24"
                        className={isSaved ? "h-5 w-5" : "h-6 w-6"}
                        aria-hidden="true"
                    >
                        <path
                            d="M6 3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17.3c0 .8-.9 1.2-1.5.7L12 17.4l-4.5 3.6c-.6.5-1.5.1-1.5-.7V3z"
                            fill={liked ? "#F97316" : "#E5E7EB"}
                        />
                    </svg>
                </button>

                <div className="absolute inset-x-0 bottom-0 z-10 p-4">
                    <h3
                        className={`text-white drop-shadow ${
                            isSaved
                                ? "text-lg font-bold mb-1"
                                : "text-2xl font-extrabold mb-2"
                        }`}
                    >
                        {data.title}
                    </h3>

                    {!isSaved && (
                        <p className="mb-4 text-sm leading-relaxed text-gray-100 drop-shadow">
                            {data.desc}
                        </p>
                    )}

                    {!isSaved && (
                        <div className="flex items-center justify-between">
                            <Link
                                to={detailHref}
                                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-90"
                            >
                                Lihat Detail
                            </Link>

                            <div
                                className="flex items-center gap-2 text-lg font-semibold text-white"
                                aria-label={`Rating ${displayRating}`}
                            >
                                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                                    <path
                                        d="M12 2.3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.9l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 2.3z"
                                        fill="#facc15"
                                    />
                                </svg>
                                <span>{Number(displayRating || 0).toFixed(1)}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );

    return (
        <>
            {isSaved ? (
                <Link to={detailHref} className="block">
                    {card}
                </Link>
            ) : (
                card
            )}

            {showSaved && <DestinationPopup variant="saved" />}

            {showLoginPopup && <DestinationPopup variant="login-required" />}
        </>
    );
}
