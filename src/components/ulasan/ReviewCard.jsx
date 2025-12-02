import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const ReviewCard = ({ image, title, rating, reviews, slug }) => {
    const detailPath = slug ? `/detail/${slug}` : "#";

    return (
        <Link to={detailPath} className="block">
            <div className="relative w-[220px] h-[300px] rounded-2xl overflow-hidden shadow-md shrink-0 cursor-pointer">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-white font-bold text-base leading-tight">
                        {title}
                    </h3>

                    <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={20}
                                fill={i < rating ? "#facc15" : "rgba(255,255,255,0.25)"}
                                stroke="transparent"
                                className="drop-shadow-sm"
                            />
                        ))}

                        <span className="text-base ml-2 opacity-90 font-semibold">
                            {reviews} ulasan
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ReviewCard;
