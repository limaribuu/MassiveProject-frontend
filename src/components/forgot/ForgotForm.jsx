import React, { useState } from "react";
import { Link } from "react-router-dom";

import { API_BASE_URL } from "../../config/api";
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function ForgotForm() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    const handleEmail = (v) => {
        setEmail(v);
        if (!v.trim()) setEmailError("Email wajib diisi");
        else if (!emailRegex.test(v)) setEmailError("Format email tidak valid");
        else setEmailError("");
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (emailError || !email) return;

        try {
            setLoading(true);

            const res = await fetch(`${API_BASE_URL}/forgot`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message);

            setMessage(data.message);
            setType("success");
        } catch (err) {
            setMessage(err.message);
            setType("error");
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

            {message && (
                <p className={type === "success" ? "text-success" : "text-error"}>
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => handleEmail(e.target.value)}
                        className={emailError ? "input-error" : ""}
                    />
                    <span className="error-text">{emailError || "\u00A0"}</span>
                </div>

                <button className="btn-login" disabled={loading}>
                    {loading ? "Memproses..." : "Kirim"}
                </button>
            </form>

            <p className="signup-text">
                Ingat password? <Link to="/login">Login</Link>
            </p>
        </>
    );
}
