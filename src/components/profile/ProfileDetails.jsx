import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { places } from "../../data/places";
import ProfileHeroCard from "./ProfileHeroCard";

import { API_BASE_URL, BACKEND_BASE_URL } from "../../config/api";

const validatePassword = (value) => {
    if (value.length < 8)
        return "Password harus 8+ karakter, mengandung angka & simbol";
    if (!/\d/.test(value)) return "Password harus mengandung angka";
    if (!/[!@#$%^&*]/.test(value))
        return "Password harus mengandung simbol (!@#$%^&*)";
    return "";
};

function resolveAvatar(path) {
    if (!path) return "/avatar-default.png";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/uploads/")) return `${BACKEND_BASE_URL}${path}`;
    return path;
}

const CATEGORY_LABELS = {
    sejarah: "Sejarah & Budaya",
    ikonik: "Ikonik",
    kuliner: "Kuliner",
    religi: "Religi",
};

const normalizeFavoriteId = (value) => {
    if (value === null || value === undefined) return "";

    const s = String(value).trim();
    if (!s) return "";

    if (/^\d+$/.test(s)) {
        const n = Number(s);
        const match = places.find((p) => Number(p.id) === n);
        return match?.slug ? String(match.slug) : s;
    }

    return s;
};

function getFavoriteCategoriesFromLocalStorage() {
    if (typeof window === "undefined") return [];

    const raw = localStorage.getItem("favorites_ids");
    if (!raw) return [];

    let favIds;
    try {
        favIds = JSON.parse(raw);
    } catch {
        return [];
    }

    if (!Array.isArray(favIds) || favIds.length === 0) return [];

    const favSlugs = Array.from(
        new Set(favIds.map(normalizeFavoriteId).filter(Boolean))
    );

    const favPlaces = places.filter((p) => favSlugs.includes(p.slug));

    const counts = {};
    favPlaces.forEach((p) => {
        const cats = Array.isArray(p.category) ? p.category : [p.category];
        cats.forEach((cat) => {
            if (!cat) return;
            counts[cat] = (counts[cat] || 0) + 1;
        });
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    return sorted.slice(0, 3).map(([cat]) => CATEGORY_LABELS[cat] || cat);
}

export default function ProfileDetails({ user }) {
    const { login } = useAuth();

    const [showGenderModal, setShowGenderModal] = useState(false);
    const [showDobModal, setShowDobModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showNameModal, setShowNameModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [genderInput, setGenderInput] = useState(user?.gender || "");
    const [dobInput, setDobInput] = useState(
        user?.tanggalLahir ? user.tanggalLahir.substring(0, 10) : ""
    );
    const [phoneInput, setPhoneInput] = useState(user?.noTelpon || "");
    const [nameInput, setNameInput] = useState(user?.name || "");

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const [oldPasswordInput, setOldPasswordInput] = useState("");
    const [newPasswordInput, setNewPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [favoriteCategories, setFavoriteCategories] = useState([]);

    useEffect(() => {
        setGenderInput(user?.gender || "");
        setDobInput(user?.tanggalLahir ? user.tanggalLahir.substring(0, 10) : "");
        setPhoneInput(user?.noTelpon || "");
        setNameInput(user?.name || "");
    }, [user]);

    useEffect(() => {
        const cats = getFavoriteCategoriesFromLocalStorage();
        setFavoriteCategories(cats);

        const onStorage = (e) => {
            if (e.key !== "favorites_ids") return;
            const updated = getFavoriteCategoriesFromLocalStorage();
            setFavoriteCategories(updated);
        };

        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    useEffect(() => {
        if (showPasswordModal) {
            setError("");
            setNewPasswordError("");
            setConfirmPasswordError("");
        }
    }, [showPasswordModal]);

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

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Sesi login berakhir. Silakan login kembali.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            const payload = {
                name: partial.name ?? user.name,
                gender: partial.gender ?? user.gender,
                tanggalLahir: partial.tanggalLahir ?? user.tanggalLahir,
                noTelpon: partial.noTelpon ?? user.noTelpon,
            };

            const res = await axios.put(`${API_BASE_URL}/profile`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

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

    async function handleSaveName(e) {
        e.preventDefault();
        const trimmed = (nameInput || "").trim();
        if (!trimmed) {
            setError("Nama lengkap tidak boleh kosong");
            return;
        }
        await updateProfile({ name: trimmed });
        setShowNameModal(false);
    }

    const handleNewPasswordChange = (value) => {
        setNewPasswordInput(value);
        const err = validatePassword(value);
        setNewPasswordError(err);

        if (confirmPasswordInput && value !== confirmPasswordInput) {
            setConfirmPasswordError("Konfirmasi kata sandi tidak cocok");
        } else {
            setConfirmPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (value) => {
        setConfirmPasswordInput(value);
        if (value && value !== newPasswordInput) {
            setConfirmPasswordError("Konfirmasi kata sandi tidak cocok");
        } else {
            setConfirmPasswordError("");
        }
    };

    async function handleSavePassword(e) {
        e.preventDefault();

        if (!oldPasswordInput || !newPasswordInput || !confirmPasswordInput) {
            setError("Semua kolom kata sandi wajib diisi");
            return;
        }

        if (newPasswordError || confirmPasswordError) {
            setError("Perbaiki kesalahan pada kata sandi terlebih dahulu");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Sesi login berakhir. Silakan login kembali.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            const res = await axios.put(
                `${API_BASE_URL}/profile/password`,
                {
                    oldPassword: oldPasswordInput,
                    newPassword: newPasswordInput,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.data.success) {
                throw new Error(res.data.message || "Gagal mengubah kata sandi");
            }

            setShowPasswordModal(false);
            setOldPasswordInput("");
            setNewPasswordInput("");
            setConfirmPasswordInput("");
            setNewPasswordError("");
            setConfirmPasswordError("");
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                    err.message ||
                    "Terjadi kesalahan saat mengubah kata sandi"
            );
        } finally {
            setSaving(false);
        }
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

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Sesi login berakhir. Silakan login kembali.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            const formData = new FormData();
            formData.append("avatar", avatarFile);

            const res = await axios.post(`${API_BASE_URL}/profile/avatar`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.data.success) {
                throw new Error(res.data.message || "Gagal mengupdate foto profil");
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

    const genderTextValue = genderText;
    const formattedBirthDateValue = formattedBirthDate;

    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">Akun</h2>

            {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                <ProfileHeroCard user={user} onChangePhoto={() => setShowAvatarModal(true)} />

                <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Pengaturan Profil</h3>

                    <div className="space-y-6">
                        <Item
                            label="Nama Lengkap"
                            value={user?.name}
                            editable
                            onEdit={() => {
                                setNameInput(user?.name || "");
                                setShowNameModal(true);
                            }}
                        />

                        <Item label="Email" value={user?.email} />

                        <Item
                            label="Kata Sandi"
                            value="************"
                            editable
                            onEdit={() => {
                                setOldPasswordInput("");
                                setNewPasswordInput("");
                                setConfirmPasswordInput("");
                                setNewPasswordError("");
                                setConfirmPasswordError("");
                                setShowPasswordModal(true);
                            }}
                        />

                        <Item
                            label="Jenis Kelamin"
                            value={genderTextValue}
                            link
                            onClick={() => setShowGenderModal(true)}
                        />

                        <Item
                            label="Tanggal Lahir"
                            value={formattedBirthDateValue}
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
                                {favoriteCategories.length === 0 ? (
                                    <span className="text-sm text-gray-500">
                                        Belum ada destinasi favorit
                                    </span>
                                ) : (
                                    favoriteCategories.map((name) => <Tag key={name}>{name}</Tag>)
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
                                src={avatarPreview ? avatarPreview : resolveAvatar(user?.avatar)}
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

            <BaseModal
                open={showNameModal}
                title="Nama Lengkap"
                onClose={() => setShowNameModal(false)}
                onSubmit={handleSaveName}
                submitLabel={saving ? "Menyimpan..." : "Simpan"}
            >
                <input
                    type="text"
                    className="w-full rounded-2xl border-2 border-[#F1721D] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F1721D]"
                    placeholder="Masukkan Nama Lengkap"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />
            </BaseModal>

            <BaseModal
                open={showPasswordModal}
                title="Kata Sandi"
                onClose={() => setShowPasswordModal(false)}
                onSubmit={handleSavePassword}
                submitLabel={saving ? "Menyimpan..." : "Simpan"}
            >
                <div>
                    <input
                        type="password"
                        className="w-full rounded-2xl border-2 border-[#F1721D] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F1721D]"
                        placeholder="Kata Sandi"
                        value={oldPasswordInput}
                        onChange={(e) => setOldPasswordInput(e.target.value)}
                    />
                    <p className="mt-0.5 text-[11px] text-red-500 min-h-3">{"\u00A0"}</p>
                </div>

                <div>
                    <input
                        type="password"
                        className={`w-full rounded-2xl border-2 px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                            newPasswordError
                                ? "border-red-400 focus:ring-red-300"
                                : "border-[#F1721D] focus:ring-[#F1721D]"
                        }`}
                        placeholder="Kata Sandi Baru"
                        value={newPasswordInput}
                        onChange={(e) => handleNewPasswordChange(e.target.value)}
                    />
                    <p className="mt-0.5 text-[11px] text-red-500 min-h-3">
                        {newPasswordError || "\u00A0"}
                    </p>
                </div>

                <div>
                    <input
                        type="password"
                        className={`w-full rounded-2xl border-2 px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                            confirmPasswordError
                                ? "border-red-400 focus:ring-red-300"
                                : "border-[#F1721D] focus:ring-[#F1721D]"
                        }`}
                        placeholder="Konfirmasi Kata Sandi"
                        value={confirmPasswordInput}
                        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    />
                    <p className="mt-0.5 text-[11px] text-red-500 min-h-3">
                        {confirmPasswordError || "\u00A0"}
                    </p>
                </div>
            </BaseModal>
        </section>
    );
}

function Item({ label, value, editable, link, onClick, onEdit }) {
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
                <button
                    type="button"
                    onClick={onEdit}
                    className="shrink-0 text-gray-500 hover:text-[#F1721D]"
                >
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                    </svg>
                </button>
            )}
        </div>
    );
}

function Tag({ children }) {
    return (
        <span className="rounded-md bg-orange-100 text-[#F1721D] text-sm px-3 py-1">
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
