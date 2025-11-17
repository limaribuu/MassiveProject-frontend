import React from "react";
import RecommendationCard from "./RecommendationCard.jsx";
import "../../../styles/home/recommendations.css";

export default function RecommendationSection({ title, items = [] }) {
    return (
        <section className="rc">
            {title && (
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-900">
                    {title}
                </h2>
            )}

            <div className="rc__grid">
                {items.map((it) => (
                    <RecommendationCard
                        key={it.id}
                        title={it.title}
                        desc={it.desc}
                        img={it.img}
                        rating={it.rating}
                        to={it.to}
                    />
                ))}
            </div>
        </section>
    );
}
