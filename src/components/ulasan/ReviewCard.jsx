import React from "react";
import { Star } from "lucide-react";

const ReviewCard = ({ image, title, rating, reviews }) => {
    return (
        <div className="relative w-[220px] h-[300px] rounded-2xl overflow-hidden shadow-md shrink-0">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

            <div className="absolute bottom-3 left-3 text-white">
                <h3 className="text-[17px] font-bold leading-5 drop-shadow">
                    {title}
                </h3>

                <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            fill={i < rating ? "#facc15" : "rgba(255,255,255,0.25)"}
                            stroke="transparent"
                            className="drop-shadow-sm"
                        />
                    ))}

                    <span className="text-sm ml-1 opacity-90">
                        {reviews} ulasan
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
