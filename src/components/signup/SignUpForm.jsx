import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../common/Modal.jsx";

const API_BASE_URL = "http://localhost:5000/api";

export default function SignupForm() {
    const [email, setEmail] = useState("");
    const [nama, setNama] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!email.trim() || !nama.trim() || !password || !confirmPassword) {
            return alert("Semua field wajib diisi");
        }
        if (password.length < 6) {
            return alert("Password minimal 6 karakter");
        }
        if (password !== confirmPassword) {
            return alert("Konfirmasi password tidak sama");
        }
        if (!agree) {
            return alert("Anda harus menyetujui Kebijakan Privasi");
        }

        try {
            setLoading(true);

            const res = await fetch(`${API_BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: nama,
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Gagal mendaftar");
            }

            setOpen(true);
        } catch (err) {
            console.error(err);
            setError(err.message || "Terjadi kesalahan saat mendaftar.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Sign Up</h1>
            <p className="subtitle">Create your account</p>

            <form onSubmit={handleSubmit}>
                {error && (
                    <p
                        style={{
                            color: "#dc2626",
                            fontSize: 14,
                            marginBottom: 8,
                        }}
                    >
                        {error}
                    </p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nama Lengkap"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Kata Sandi"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Konfirmasi Kata Sandi"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className="agree-box">
                    <input
                        type="checkbox"
                        id="agree"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                    <label htmlFor="agree">
                        Dengan mendaftar, kamu menyetujui{" "}
                        <a href="#">Kebijakan Privasi</a>
                    </label>
                </div>

                <button type="submit" className="btn-login" disabled={loading}>
                    <span>{loading ? "Memproses..." : "Sign Up"}</span>
                </button>
            </form>

            <p className="signup-text">
                Sudah punya akun? <Link to="/login">Login</Link>
            </p>

            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Berhasil!"
                description="Akun anda berhasil dibuat"
                confirmText="Login"
                onConfirm={() => navigate("/login")}
            />
        </>
    );
}
