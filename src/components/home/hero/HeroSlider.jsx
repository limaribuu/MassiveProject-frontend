import React, { useState, useRef } from "react";

export default function HeroSlider({ slides, activeIndex, onSelect }) {
    const [animating, setAnimating] = useState(false);
    const timerRef = useRef(null);

    const total = slides.length;
    const nextIndex = (activeIndex + 1) % total;
    const thirdIndex = (activeIndex + 2) % total;

    const active = slides[activeIndex];
    const next = slides[nextIndex];
    const third = slides[thirdIndex];

    const handleClickSmall = () => {
        if (animating) return;
        setAnimating(true);
        timerRef.current = setTimeout(() => {
            onSelect(nextIndex);
            setAnimating(false);
            clearTimeout(timerRef.current);
        }, 700);
    };

    const GAP = 24;
    const BIG = { w: 380, h: 480, left: 0, top: 0 };
    const SMALL = {
        w: 160,
        h: 240,
        left: BIG.w + GAP,
        top: Math.round((BIG.h - 240) / 2),
    };
    const WRAP = { w: BIG.w + GAP + SMALL.w, h: BIG.h };

    return (
        <div className="w-full md:w-[48%] flex justify-center md:justify-end select-none">
            <div
                className="relative overflow-visible"
                style={{ width: WRAP.w, height: WRAP.h }}
            >
                <div
                    className={[
                        "absolute rounded-2xl overflow-hidden shadow-xl will-change-transform",
                        animating ? "animate-bigOutLeftFade" : "",
                    ].join(" ")}
                    style={{
                        width: BIG.w,
                        height: BIG.h,
                        left: BIG.left,
                        top: BIG.top,
                        zIndex: 30,
                    }}
                >
                    <img
                        src={active.src}
                        alt={active.title}
                        className="w-full h-full object-cover rounded-2xl"
                        draggable="false"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/30 to-transparent rounded-b-2xl" />
                </div>

                <button
                    type="button"
                    onClick={handleClickSmall}
                    className={[
                        "absolute rounded-xl overflow-hidden shadow-md focus:outline-none will-change-transform",
                        animating ? "animate-smallToBig" : "",
                    ].join(" ")}
                    style={{
                        width: SMALL.w,
                        height: SMALL.h,
                        left: SMALL.left,
                        top: SMALL.top,
                        zIndex: 25,
                        transformOrigin: "center center",
                        willChange: "transform, opacity",
                    }}
                    aria-label={next.title}
                >
                    <img
                        src={next.src}
                        alt={next.title}
                        className="w-full h-full object-cover rounded-xl"
                        draggable="false"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/25 to-transparent rounded-b-xl" />
                </button>

                <div
                    className={[
                        "absolute rounded-xl overflow-hidden shadow-md will-change-transform",
                        animating ? "animate-thirdEnterToSmall" : "",
                    ].join(" ")}
                    style={{
                        width: SMALL.w,
                        height: SMALL.h,
                        left: SMALL.left,
                        top: SMALL.top,
                        zIndex: 20,
                        willChange: "transform, opacity",
                    }}
                >
                    <img
                        src={third.src}
                        alt={third.title}
                        className="w-full h-full object-cover rounded-xl"
                        draggable="false"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/25 to-transparent rounded-b-xl" />
                </div>

                <style>{`
                    @keyframes bigOutLeftFade {
                        0%   { transform: translateX(0); opacity: 1; }
                        100% { transform: translateX(-120%); opacity: 0; }
                    }
                    .animate-bigOutLeftFade {
                        animation: bigOutLeftFade 700ms ease-out forwards;
                    }

                    @keyframes smallToBig {
                        0% {
                            transform: translateX(0) scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: translateX(-404px) scale(2.375);
                            opacity: 1;
                        }
                    }
                    .animate-smallToBig {
                        animation: smallToBig 700ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
                    }

                    @keyframes thirdEnterToSmall {
                        0% {
                            transform: translateX(180px) scale(0.9);
                            opacity: 0;
                        }
                        40% { opacity: 1; }
                        100% {
                            transform: translateX(0) scale(1);
                            opacity: 1;
                        }
                    }
                    .animate-thirdEnterToSmall {
                        animation: thirdEnterToSmall 700ms ease-out forwards;
                    }
                `}</style>
            </div>
        </div>
    );
}
