export const normalizePlace = (p) => {
    if (!p) return null;

    const slug = p.slug || p.place_id || p.placeId || "";
    const id = p.id ?? slug;

    return {
        ...p,
        id,
        slug,
        title: p.title ?? p.nama ?? "",
        desc: p.desc ?? p.description ?? "",
        img: p.img ?? p.image ?? "",
        rating: p.rating ?? 0
    };
};

export const attachRating = (p, ratingByPlaceId) => {
    if (!p) return null;

    const stats = ratingByPlaceId?.[p.slug];
    const backendRating = stats?.averageRating;

    return {
        ...p,
        rating: backendRating ?? p.rating ?? 0
    };
};
