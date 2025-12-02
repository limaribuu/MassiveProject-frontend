import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { places } from "../../data/places";
import ProfileHeroCard from "./ProfileHeroCard";

import { API_BASE_URL } from "../../config/api";
import { BACKEND_BASE_URL } from "../../config/api";

function resolveAvatar(path) {
    if (!path) return "/avatar-default.png";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/uploads/")) return `${BACKEND_BASE_URL}${path}`;
    return path;
}

const CATEGORY_LABELS = {
    sejarah: "Sejarah & Budaya",
    ikonik: "Ikonik",
    alam: "Alam",
    kuliner: "Kuliner",
    religi: "Religi",
};

function formatCategoryLabel(key) {
    if (!key) return "";
    const lower = String(key).toLowerCase();
    if (CATEGORY_LABELS[lower]) return CATEGORY_LABELS[lower];
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export default function ProfileDetails({ user, favoriteCategory, favoriteCategories }) {
    const { login } = useAuth();

    const [showGenderModal, setShowGenderModal] = useState(false);
    const [showDobModal, setShowDobModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);

    const [genderInput, setGenderInput] = useState(user?.gender || "");
    const [dobInput, setDobInput] = useState(
        user?.tanggalLahir ? user.tanggalLahir.substring(0, 10) : ""
    );
    const [phoneInput, setPhoneInput] = useState(user?.noTelpon || "");

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const favoriteCategoryList =
        Array.isArray(favoriteCategories) && favoriteCategories.length > 0
            ? favoriteCategories
            : favoriteCategory
            ? [favoriteCategory]
            : [];

    const displayFavoriteCategories = favoriteCategoryList.map((cat) =>
        formatCategoryLabel(cat)
    );

    useEffect(() => {
        setGenderInput(user?.gender || "");
        setDobInput(
            user?.tanggalLahir ? user.tanggalLahir.substring(0, 10) : ""
        );
        setPhoneInput(user?.noTelpon || "");
    }, [user]);

    const genderText =
        user?.gender === "L"
            ? "Laki-laki"
            : user?.gender === "P"
            ? "Perempuan"
            : "Pilih Jenis Kelamin";

    const formattedBirthDate = user?.tanggalLahir
        ? new Date(user.tanggalLahir).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
          })
        : "Pilih Tanggal Lahir";

    async function updateProfile(partial) {
        if (!user) return;

        try {
            setSaving(true);
            setError("");

            const payload = {
                name: user.name,
                gender: partial.gender ?? user.gender,
                tanggalLahir: partial.tanggalLahir ?? user.tanggalLahir,
                noTelpon: partial.noTelpon ?? user.noTelpon,
            };

            const res = await axios.put(
                `${API_BASE_URL}/profile/${user.id}`,
                payload
            );

            if (!res.data.success) {
                throw new Error(res.data.message || "Gagal memperbarui profil");
            }

            login(res.data.user);
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                    err.message ||
                    "Terjadi kesalahan saat update profil"
            );
        } finally {
            setSaving(false);
        }
    }

    async function handleSaveGender(e) {
        e.preventDefault();
        const value = genderInput || null;
        await updateProfile({ gender: value });
        setShowGenderModal(false);
    }

    async function handleSaveDob(e) {
        e.preventDefault();
        await updateProfile({ tanggalLahir: dobInput || null });
        setShowDobModal(false);
    }

    async function handleSavePhone(e) {
        e.preventDefault();
        await updateProfile({ noTelpon: phoneInput || null });
        setShowPhoneModal(false);
    }

    function handleSelectAvatar(e) {
        const file = e.target.files[0];
        if (!file) return;
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    }

    async function handleSaveAvatar(e) {
        e.preventDefault();
        if (!user || !avatarFile) return;

        try {
            setSaving(true);
            setError("");

            const formData = new FormData();
            formData.append("avatar", avatarFile);

            const res = await axios.post(
                `${API_BASE_URL}/profile/${user.id}/avatar`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (!res.data.success) {
                throw new Error(
                    res.data.message || "Gagal mengupdate foto profil"
                );
            }

            login(res.data.user);
            setShowAvatarModal(false);
            setAvatarFile(null);
            setAvatarPreview(null);
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                    err.message ||
                    "Terjadi kesalahan saat upload foto"
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">Akun</h2>

            {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                <ProfileHeroCard
                    user={user}
                    onChangePhoto={() => setShowAvatarModal(true)}
                />

                <div>
                    <h3 className="font-semibold text-gray-800 mb-4">
                        Pengaturan Profil
                    </h3>

                    <div className="space-y-6">
                        <Item label="Nama Lengkap" value={user?.name} editable />
                        <Item label="Email" value={user?.email} />
                        <Item label="Kata Sandi" value="************" editable />

                        <Item
                            label="Jenis Kelamin"
                            value={genderText}
                            link
                            onClick={() => setShowGenderModal(true)}
                        />

                        <Item
                            label="Tanggal Lahir"
                            value={formattedBirthDate}
                            link
                            onClick={() => setShowDobModal(true)}
                        />

                        <Item
                            label="No. Telepon"
                            value={user?.noTelpon || "Masukkan Nomor Telepon"}
                            link
                            onClick={() => setShowPhoneModal(true)}
                        />

                        <div>
                            <div className="font-semibold text-gray-800 mb-2">
                                Kategori Favorit
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {displayFavoriteCategories.length === 0 ? (
                                    <span className="text-sm text-gray-500">
                                        Belum ada destinasi favorit
                                    </span>
                                ) : (
                                    displayFavoriteCategories.map((label) => (
                                        <Tag key={label}>{label}</Tag>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BaseModal
                open={showGenderModal}
                title="Jenis Kelamin"
                onClose={() => setShowGenderModal(false)}
                onSubmit={handleSaveGender}
                submitLabel={saving ? "Menyimpan..." : "Simpan"}
            >
                <label className="block text-sm text-gray-700 mb-2">
                    Pilih Jenis Kelamin
                </label>
                <select
                    className="w-full rounded-2xl border-2 border-[#F1721D] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F1721D]"
                    value={genderInput || ""}
                    onChange={(e) => setGenderInput(e.target.value)}
                >
                    <option value="">- Pilih -</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                </select>
            </BaseModal>

            <BaseModal
                open={showDobModal}
                title="Tanggal Lahir"
                onClose={() => setShowDobModal(false)}
                onSubmit={handleSaveDob}
                submitLabel={saving ? "Menyimpan..." : "Simpan"}
            >
                <input
                    type="date"
                    className="w-full rounded-2xl border-2 border-[#F1721D] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F1721D]"
                    value={dobInput}
                    onChange={(e) => setDobInput(e.target.value)}
                />
            </BaseModal>

            <BaseModal
                open={showPhoneModal}
                title="No. Telepon"
                onClose={() => setShowPhoneModal(false)}
                onSubmit={handleSavePhone}
                submitLabel={saving ? "Menyimpan..." : "Simpan"}
            >
                <input
                    type="tel"
                    className="w-full rounded-2xl border-2 border-[#F1721D] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F1721D]"
                    placeholder="Masukkan Nomor"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                />
            </BaseModal>

            <BaseModal
                open={showAvatarModal}
                title="Ubah Foto Profil"
                onClose={() => {
                    setShowAvatarModal(false);
                    setAvatarFile(null);
                    setAvatarPreview(null);
                }}
                onSubmit={handleSaveAvatar}
                submitLabel={saving ? "Mengupload..." : "Simpan"}
            >
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                            <img
                                src={
                                    avatarPreview
                                        ? avatarPreview
                                        : resolveAvatar(user?.avatar)
                                }
                                alt="Preview avatar"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleSelectAvatar}
                        className="w-full text-sm"
                    />
                    <p className="text-xs text-gray-500">
                        Format foto: jpg, jpeg, png. Maksimal 2MB.
                    </p>
                </div>
            </BaseModal>
        </section>
    );
}

function Item({ label, value, editable, link, onClick }) {
    const clickable = link && onClick;
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <div className="text-sm text-gray-500">{label}</div>
                <div
                    className={[
                        "mt-1",
                        clickable
                            ? "text-[#F1721D] cursor-pointer"
                            : link
                            ? "text-[#F1721D]"
                            : "text-gray-800 font-medium",
                    ].join(" ")}
                    onClick={clickable ? onClick : undefined}
                >
                    {value}
                </div>
            </div>
            {editable && (
                <svg
                    className="h-5 w-5 text-gray-500 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
            )}
        </div>
    );
}

function Tag({ children }) {
    return (
        <span className="rounded-lg bg-[#F1721D] text-white text-sm px-4 py-2">
            {children}
        </span>
    );
}

function BaseModal({ open, title, children, onClose, onSubmit, submitLabel }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-2xl bg-white px-6 py-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="flex-1 text-center text-lg font-semibold">
                        {title}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[#F1721D] text-xl leading-none font-bold"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    {children}

                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-[#F1721D] py-3 text-center text-sm font-semibold text-white hover:bg-orange-500"
                    >
                        {submitLabel || "Simpan"}
                    </button>
                </form>
            </div>
        </div>
    );
}
