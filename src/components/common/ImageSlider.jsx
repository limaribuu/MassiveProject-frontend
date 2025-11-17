import React, { useEffect, useCallback, useRef, useState } from "react";

const SLIDES = [
    {
        image: "/slider1.jpeg",
        title: "Temukan Destinasi Impianmu",
        desc: "Jelajahi berbagai tempat wisata populer dan tersembunyi di seluruh Kota Palembang.",
    },
    {
        image: "/slider2.png",
        title: "Eksplorasi Budaya Lokal",
        desc: "Nikmati keindahan budaya dan kuliner khas daerah yang menarik.",
    },
    {
        image: "/slider3.jpg",
        title: "Liburan Tak Terlupakan",
        desc: "Buat momen berharga bersama keluarga dan teman-temanmu.",
    },
];

export default function ImageSlider() {
    const [index, setIndex] = useState(0);
    const timer = useRef(null);

    const stop = useCallback(() => { if (timer.current) clearInterval(timer.current); }, []);
    const start = useCallback(() => {
        stop();
        timer.current = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 4000);
    }, [stop]);

    useEffect(() => { start(); return stop; }, [start, stop]);

    return (
        <>
            <div className="slides" style={{ transform: `translateX(-${index * 100}%)` }} onMouseEnter={stop} onMouseLeave={start}>
                {SLIDES.map((s, i) => (
                    <article key={i} className="slide" style={{ backgroundImage: `url(${s.image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                        <div className="text">
                            <h2>{s.title}</h2>
                            <p>{s.desc}</p>
                        </div>
                    </article>
                ))}
            </div>
            <div className="dots" aria-label="Navigasi slide">
                {SLIDES.map((_, i) => (
                    <span key={i} className={`dot ${i === index ? "active" : ""}`} role="button" tabIndex={0} aria-label={`Slide ${i + 1}`} onClick={() => setIndex(i)} />
                ))}
            </div>
        </>
    );
}
