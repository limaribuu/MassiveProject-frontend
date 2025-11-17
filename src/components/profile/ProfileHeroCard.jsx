import React from "react";

export default function ProfileHeroCard() {
    return (
        <div>
            <h1 className="text-2xl md:text-[28px] font-extrabold text-gray-800 mb-6">Akun</h1>

            <div className="flex flex-col items-center">
                <img
                    src="/avatar-large.png"
                    alt="Foto Profil"
                    className="h-48 w-48 rounded-full object-cover"
                />

                <button
                    type="button"
                    className="mt-5 inline-flex items-center justify-center rounded-xl border border-[#F1721D]/40 text-[#F1721D] px-5 py-2.5 font-semibold hover:bg-[#F1721D]/5 transition"
                >
                    Ubah Foto Profil
                </button>

                <p className="mt-3 text-center text-sm text-gray-500 max-w-[260px]">
                    Format foto harus jpg, jpeg, png dan ukuran file max 2MB
                </p>
            </div>
        </div>
    );
}
