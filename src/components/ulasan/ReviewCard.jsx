import React from "react";

const ReviewCard = ({ image, title, rating = 0, reviews = 0 }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="w-[210px] min-w-[210px] rounded-2xl overflow-hidden shadow-md bg-white cursor-pointer">
            <div className="h-[150px] w-full overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="-mt-10 px-3 pb-2 pt-6 bg-linear-to-t from-black/70 via-black/20 to-transparent">
                <div className="text-white font-semibold text-sm leading-tight drop-shadow">
                    {title}
                </div>
            </div>

            <div className="flex items-center justify-between px-3 py-2 bg-black/80">
                <div className="flex items-center gap-1">
                    {stars.map((s) => (
                        <svg
                            key={s}
                            viewBox="0 0 24 24"
                            className={`w-4 h-4 ${
                                s <= rating ? "text-yellow-400" : "text-gray-500"
                            }`}
                            fill="currentColor"
                        >
                            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.402 8.172L12 18.897l-7.336 3.87 1.402-8.172L.132 9.21l8.2-1.192z" />
                        </svg>
                    ))}
                </div>
                <span className="text-[11px] text-white/80">{reviews} ulasan</span>
            </div>
        </div>
    );
};

export default ReviewCard;
