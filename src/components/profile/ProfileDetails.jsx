import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const API_BASE_URL = "http://localhost:5000/api";

export default function ProfileDetails({ user }) {
  const { login } = useAuth();

  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showDobModal, setShowDobModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const [genderInput, setGenderInput] = useState(user?.gender || "");
  const [dobInput, setDobInput] = useState(
    user?.tanggalLahir ? user.tanggalLahir.substring(0, 10) : ""
  );
  const [phoneInput, setPhoneInput] = useState(user?.noTelpon || "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // tampilkan gender & tanggal lahir yang rapi
  const genderText =
    user?.gender === "L"
      ? "Laki-laki"
      : user?.gender === "P"
      ? "Perempuan"
      : null;

  const formattedBirthDate = user?.tanggalLahir
    ? new Date(user.tanggalLahir).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  async function updateProfile(partial) {
    if (!user) return;

    try {
      setSaving(true);
      setError("");

      const res = await fetch(`${API_BASE_URL}/profile/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // nama tidak diubah di sini, pakai yang lama
          name: user.name,
          gender: partial.gender ?? user.gender,
          tanggalLahir: partial.tanggalLahir ?? user.tanggalLahir,
          noTelpon: partial.noTelpon ?? user.noTelpon,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal memperbarui profil");
      }

      // replace user di AuthContext
      login(data.user);
    } catch (err) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat update profil");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveGender(e) {
    e.preventDefault();
    // mapping teks menjadi kode "L"/"P"
    const val = genderInput.trim().toLowerCase();
    let genderCode = null;
    if (val === "l" || val.startsWith("laki")) genderCode = "L";
    if (val === "p" || val.startsWith("perem")) genderCode = "P";

    await updateProfile({ gender: genderCode });
    setShowGenderModal(false);
  }

  async function handleSaveDob(e) {
    e.preventDefault();
    if (!dobInput) {
      await updateProfile({ tanggalLahir: null });
    } else {
      await updateProfile({ tanggalLahir: dobInput });
    }
    setShowDobModal(false);
  }

  async function handleSavePhone(e) {
    e.preventDefault();
    await updateProfile({ noTelpon: phoneInput || null });
    setShowPhoneModal(false);
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
        {/* Foto & tombol ubah */}
        <div className="flex flex-col items-center">
          <div className="h-44 w-44 rounded-2xl overflow-hidden bg-gray-100 mb-4">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user?.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src="/avatar-default.png"
                alt="avatar"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <button className="rounded-lg border border-[#F1721D]/40 text-[#F1721D] px-4 py-2 hover:bg-orange-50">
            Ubah Foto Profil
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Format foto harus jpg, jpeg, png dan ukuran file max 2MB
          </p>
        </div>

        {/* Informasi */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">
            Pengaturan Profil
          </h3>

          <div className="space-y-6">
            <Item label="Nama Lengkap" value={user?.name || "-"} editable />
            <Item label="Email" value={user?.email || "-"} />
            <Item label="Kata Sandi" value="************" editable />

            <Item
              label="Jenis Kelamin"
              value={genderText || "Pilih Jenis Kelamin"}
              link
              onClick={() => setShowGenderModal(true)}
            />

            <Item
              label="Tanggal Lahir"
              value={formattedBirthDate || "Pilih Tanggal Lahir"}
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
                <Tag>Sejarah & Budaya</Tag>
                <Tag>Ikonik</Tag>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL JENIS KELAMIN */}
      <BaseModal
        open={showGenderModal}
        title="Jenis Kelamin"
        onClose={() => setShowGenderModal(false)}
        onSubmit={handleSaveGender}
        submitLabel={saving ? "Menyimpan..." : "Simpan"}
      >
        <input
          type="text"
          className="w-full rounded-2xl border-2 border-[#F1721D] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F1721D]"
          placeholder="Jenis Kelamin"
          value={
            genderInput ||
            (user?.gender === "L"
              ? "Laki-laki"
              : user?.gender === "P"
              ? "Perempuan"
              : "")
          }
          onChange={(e) => setGenderInput(e.target.value)}
        />
      </BaseModal>

      {/* MODAL TANGGAL LAHIR */}
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

      {/* MODAL NO. TELEPON */}
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
