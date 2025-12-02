import React from "react";
import RecommendationCard from "../home/recommendations/RecommendationCard";

export default function ProfileFavorites({ items }) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
                Destinasi Tersimpan
            </h2>

            {items.length === 0 ? (
                <p className="text-sm text-gray-600">
                    Belum ada destinasi yang disimpan.
                </p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((place) => (
                        <RecommendationCard
                            key={place.id}
                            place={place}
                            variant="saved"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
