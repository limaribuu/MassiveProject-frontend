import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReviewCard from "./ReviewCard";

const ReviewCarousel = ({ data }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 270;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative w-full px-10">
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-4"
            >
                {data.map((item) => (
                    <ReviewCard key={item.id} {...item} />
                ))}
            </div>

            <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-orange-500 hover:text-white transition-all"
            >
                <ChevronLeft size={26} />
            </button>

            <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-orange-500 hover:text-white transition-all"
            >
                <ChevronRight size={26} />
            </button>
        </div>
    );
};

export default ReviewCarousel;
