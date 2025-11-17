import React from "react";

export default function FooterBrand() {
    return (
        <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">PELISIR PALEMBANG</h2>
            <p className="text-white/90 leading-relaxed mb-6">
                Pelisir Palembang hadir untuk membantu kamu menemukan tujuan wisata
                terbaik. Jelajahi spot favorit dan temukan inspirasi liburan baru.
            </p>
            <div className="flex gap-4">
                <img src="/icon/instagram.png" alt="Instagram" className="h-10 w-10" />
                <img src="/icon/facebook.png" alt="Facebook" className="h-10 w-10" />
                <img src="/icon/tiktok.png" alt="TikTok" className="h-10 w-10" />
            </div>
        </div>
    );
}
