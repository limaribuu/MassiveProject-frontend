import React, { useMemo, useState } from "react";
import "../../styles/home/map.css";

export default function InteractiveMap() {
    const markers = useMemo(
        () => [
            { id: 1, x: 410, y: 270, title: "Benteng Kuto Besak" },
            { id: 2, x: 505, y: 385, title: "Pulau Kemaro" },
            { id: 3, x: 335, y: 450, title: "Kambang Iwak" },
            { id: 4, x: 445, y: 490, title: "Jembatan Ampera" },
            { id: 5, x: 590, y: 535, title: "Jakabaring Sport City" },
            { id: 6, x: 705, y: 420, title: "Gubah" },
            { id: 7, x: 760, y: 460, title: "Sungai Musi" },
            { id: 8, x: 640, y: 340, title: "Monpera" },
            { id: 9, x: 505, y: 315, title: "Museum SMB II" },
            { id:10, x: 300, y: 360, title: "Songket Kampung" },
            { id:11, x: 255, y: 520, title: "Sei Lais" },
            { id:12, x: 355, y: 560, title: "Pesisir Musi" },
        ],
        []
    );

    const [tooltip, setTooltip] = useState(null); // { xAbs, yAbs, label }

    function showTip(evt, label) {
        const bounds = evt.currentTarget.ownerSVGElement.getBoundingClientRect();
        const cx = evt.clientX - bounds.left;
        const cy = evt.clientY - bounds.top;
        setTooltip({ x: cx, y: cy, label });
    }
    function hideTip() {
        setTooltip(null);
    }

    return (
        <section className="imap">
            <h2 className="imap__title">
                Eksplorasi Destinasi Wisata
                <br />
                Di Palembang
            </h2>

            <div className="imap__frame">
                <svg
                    className="imap__svg"
                    viewBox="0 0 1000 600"
                    role="img"
                    aria-label="Peta Palembang dengan penanda lokasi wisata"
                >
                    <image
                        href="/images/palembang-map.svg"
                        x="0"
                        y="0"
                        width="1000"
                        height="600"
                        preserveAspectRatio="xMidYMid meet"
                    />

                    {markers.map((m) => (
                        <g
                            key={m.id}
                            transform={`translate(${m.x}, ${m.y})`}
                            className="imap__pin"
                            onMouseEnter={(e) => showTip(e, m.title)}
                            onMouseLeave={hideTip}
                        >
                            <path
                                d="M0,-18 C-9,-18 -16,-11 -16,-2 C-16,7 -6,15 0,22 C6,15 16,7 16,-2 C16,-11 9,-18 0,-18 Z"
                                className="imap__pin-body"
                            />
                            <circle r="4" cy="-6" className="imap__pin-hole" />
                        </g>
                    ))}
                </svg>

                {tooltip && (
                    <div
                        className="imap__tooltip"
                        style={{ left: tooltip.x, top: tooltip.y }}
                    >
                        {tooltip.label}
                    </div>
                )}
            </div>
        </section>
    );
}
