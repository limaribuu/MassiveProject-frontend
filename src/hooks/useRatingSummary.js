import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const toNumberSafe = (value, fallback = 0) => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === "number") return Number.isFinite(value) ? value : fallback;

    const cleaned = String(value).replace(/[^\d.-]/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : fallback;
};

export default function useRatingSummary() {
    const [ratingByPlaceId, setRatingByPlaceId] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get(`${API_BASE_URL}/reviews-summary`, {
                    signal: controller.signal
                });

                if (res.data?.success && Array.isArray(res.data.summary)) {
                    const map = Object.fromEntries(
                        res.data.summary.map((r) => [
                            r.place_id,
                            {
                                averageRating: toNumberSafe(r.averageRating ?? 0, 0),
                                totalReviews: Number(r.totalReviews ?? 0)
                            }
                        ])
                    );
                    setRatingByPlaceId(map);
                } else {
                    setRatingByPlaceId({});
                }
            } catch (err) {
                const isCanceled =
                    err?.name === "CanceledError" ||
                    err?.code === "ERR_CANCELED" ||
                    controller.signal.aborted;

                if (!isCanceled) {
                    setError(err);
                    setRatingByPlaceId({});
                }
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        load();

        return () => {
            controller.abort();
        };
    }, []);

    return { ratingByPlaceId, loading, error };
}
