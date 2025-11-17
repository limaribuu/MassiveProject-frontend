import React from "react";
import ProfileFieldRow from "./ProfileFieldRow.jsx";
import ProfileChips from "./ProfileChips.jsx";

export default function ProfileSettings() {
    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Pengaturan Profil</h2>

            <div className="space-y-5">
                <ProfileFieldRow
                    label="Nama Lengkap"
                    value={<span className="text-[#F1721D] font-medium">Zulkifli</span>}
                    editable
                />
                <ProfileFieldRow
                    label="Email"
                    value={<span className="text-[#F1721D] font-medium">zulkifli12@gmail.com</span>}
                    editable={false}
                />
                <ProfileFieldRow
                    label="Kata Sandi"
                    value={<span className="tracking-widest select-none">************</span>}
                    editable
                />
                <ProfileFieldRow
                    label="Jenis Kelamin"
                    value={<span className="text-[#F1721D] underline underline-offset-2">Pilih Jenis Kelamin</span>}
                    editable={false}
                />
                <ProfileFieldRow
                    label="Tanggal Lahir"
                    value={<span className="text-[#F1721D] underline underline-offset-2">Pilih Tanggal Lahir</span>}
                    editable={false}
                />
                <ProfileFieldRow
                    label="No. Telepon"
                    value={<span className="text-[#F1721D] underline underline-offset-2">Masukkan Nomor Telepon</span>}
                    editable={false}
                />
            </div>

            <div className="mt-8">
                <h3 className="text-base font-semibold text-gray-800 mb-3">Kategori Favorit</h3>
                <ProfileChips
                    items={[
                        { label: "Sejarah & Budaya" },
                        { label: "Ikonik" },
                    ]}
                />
            </div>
        </div>
    );
}
