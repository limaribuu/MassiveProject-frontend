import React from "react";
import RecommendationCard from "../home/recommendations/RecommendationCard";

export default function ProfileFavorites({ items }) {
    const safeItems = Array.isArray(items) ? items : [];

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
                Destinasi Tersimpan
            </h2>

            {safeItems.length === 0 ? (
                <p className="text-sm text-gray-600">
                    Belum ada destinasi yang disimpan.
                </p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {safeItems.map((place) => (
                        <RecommendationCard
                            key={place.slug || place.id}
                            place={place}
                            variant="saved"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
