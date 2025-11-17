import React, { useMemo, useState } from "react";
import HeroBackground from "./HeroBackground.jsx";
import HeroText from "./HeroText.jsx";
import HeroSlider from "./HeroSlider.jsx";
import HeroDots from "./HeroDots.jsx";

const SLIDES = [
    {
        id: "museum-gedung",
        src: "/img/gedungmuseum.png",
        bg: "/img/gedungmuseum.png",
        title: "Museum Sultan Mahmud Badaruddin II",
        desc: "Eksplorasi destinasi budaya dan sejarah Palembang.",
    },
    {
        id: "ampera",
        src: "/img/ampera.png",
        bg: "/img/ampera.png",
        title: "Jembatan Ampera",
        desc: "Ikon megah kota Palembang yang membentang di atas Sungai Musi.",
    },
    {
        id: "museum-dalam",
        src: "/img/dalammuseum.png",
        bg: "/img/dalammuseum.png",
        title: "Museum Tekstil Palembang",
        desc: "Koleksi songket klasik khas Sumatera Selatan.",
    },
];

const AUTOPLAY_MS = 4500;

export default function Hero() {
    const [index, setIndex] = useState(0);

    const goTo = (i) => setIndex(i);
    const idx = index;
    const activeSlide = useMemo(() => SLIDES[idx], [idx]);

    return (
        <section className="relative isolate min-h-[540px] md:min-h-[620px] overflow-hidden">
            <HeroBackground src={activeSlide.bg} />

            <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-10 md:py-14 flex flex-col md:flex-row items-start md:items-center gap-10">
                <HeroText key={activeSlide.id} slide={activeSlide} />

                <HeroSlider
                    slides={SLIDES}
                    activeIndex={index}
                    onSelect={setIndex}
                />
            </div>

            <HeroDots
                total={SLIDES.length}
                active={idx}
                onSelect={goTo}
            />
        </section>
    );
}
