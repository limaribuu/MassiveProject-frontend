import React, { useState } from "react";
import { Link } from "react-router-dom";

import { API_BASE_URL } from "../../config/api";

export default function ForgotForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");

        const val = email.trim();
        if (!val) return alert("Email tidak boleh kosong.");
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        if (!ok) return alert("Format email tidak valid.");

        try {
            setLoading(true);

            const res = await fetch(`${API_BASE_URL}/forgot`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: val }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Email tidak ditemukan");
            }

            setMessage(
                data.message ||
                    "Link reset kata sandi telah dikirim ke email kamu (simulasi)."
            );
        } catch (err) {
            console.error(err);
            setMessage(
                err.message || "Terjadi kesalahan saat proses lupa kata sandi."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Lupa Kata Sandi</h1>
            <p className="subtitle">
                Silakan masukkan email terdaftar. Kami akan mengirimkan link yang akan
                mengarahkan kamu untuk atur ulang kata sandi.
            </p>

            <form onSubmit={handleSubmit} noValidate>
                {message && (
                    <p style={{ fontSize: 14, marginBottom: 8 }}>{message}</p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn-login" disabled={loading}>
                    <span>{loading ? "Memproses..." : "Kirim"}</span>
                </button>
            </form>

            <p className="signup-text">
                Ingat Kata Sandi? <Link to="/login">Login</Link>
            </p>
        </>
    );
}
