import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../../context/FavoritesProvider";
import DestinationPopup from "../../popup/DestinasiPopup";

export default function RecommendationCard({
  place,
  id,
  slug,
  title,
  desc,
  img,
  rating = 4.0,
  to = "#",
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
    rating,
  };

  const detailHref = `/detail/${data.slug}`;

  const { has, toggle } = useFavorites();
  const liked = has(data.id);

  const [showSaved, setShowSaved] = useState(false);

  function handleToggleFavorite() {
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

  return (
    <>
      <article className="relative flex flex-col overflow-hidden rounded-[28px] bg-white shadow-md">
        <div className="relative h-[520px] w-full overflow-hidden">
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
            className="absolute right-4 top-4 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <path
                d="M6 3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17.3c0 .8-.9 1.2-1.5.7L12 17.4l-4.5 3.6c-.6.5-1.5.1-1.5-.7V3z"
                fill={liked ? "#F97316" : "#E5E7EB"}
              />
            </svg>
          </button>

          <div className="absolute inset-x-0 bottom-0 z-10 p-6">
            <h3 className="mb-2 text-2xl font-extrabold leading-tight text-white drop-shadow">
              {data.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-gray-100 drop-shadow">
              {data.desc}
            </p>

            <div className="flex items-center justify-between">
              <Link
                to={detailHref}
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-90"
              >
                Lihat Detail
              </Link>

              <div
                className="flex items-center gap-1 text-sm font-semibold text-white"
                aria-label={`Rating ${data.rating}`}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M12 2.3l2.8 6.1 6.6.6-5 4.4 1.5 6.5L12 16.8 6.1 20l1.5-6.5-5-4.4 6.6-.6L12 2.3z"
                    fill="#facc15"
                  />
                </svg>
                <span>{Number(data.rating || 0).toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {showSaved && <DestinationPopup />}
    </>
  );
}
