import React from "react";
import { Link } from "react-router-dom";

export default function HeroText({ slide }) {
    return (
        <div className="w-full md:w-[52%]">
            <h1
                className="text-white text-3xl md:text-5xl font-extrabold leading-tight
                           opacity-0 translate-y-3 transition-all duration-500 ease-out
                           animate-[fadeInUp_500ms_forwards]"
                style={{
                    animation: "fadeInUp 500ms forwards",
                }}
            >
                {slide.title}
            </h1>

            <p
                className="mt-4 text-white/90 text-base md:text-lg leading-relaxed
                           opacity-0 translate-y-3 transition-all duration-700 delay-150
                           animate-[fadeInUp_700ms_150ms_forwards]"
                style={{
                    animation: "fadeInUp 700ms 150ms forwards",
                }}
            >
                {slide.desc}
            </p>

            <Link
                to={`/detail/${slide.id}`}
                className="inline-block mt-6 rounded-xl bg-white/95 text-gray-900 px-5 py-3 font-semibold hover:bg-white transition"
            >
                Lihat Selengkapnya
            </Link>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
