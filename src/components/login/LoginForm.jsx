import React, { useState } from "react";
import GoogleButton from "./GoogleButton.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

import { API_BASE_URL } from "../../config/api";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validatePassword = (value) => {
    if (value.length < 8) {
        return "Password harus 8+ karakter, mengandung angka & simbol";
    }
    if (!/\d/.test(value)) {
        return "Password harus mengandung angka";
    }
    if (!/[!@#$%^&*]/.test(value)) {
        return "Password harus mengandung simbol (!@#$%^&*)";
    }
    return true;
};

const EyeIcon = ({ open }) => (
    <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {open ? (
            <>
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
            </>
        ) : (
            <>
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
            </>
        )}
    </svg>
);

export default function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/profil";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setEmailError("");
        setPasswordError("");

        let valid = true;

        if (!email.trim()) {
            setEmailError("Email wajib diisi");
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Format email tidak valid");
            valid = false;
        }

        if (!password) {
            setPasswordError("Password wajib diisi");
            valid = false;
        } else {
            const pwCheck = validatePassword(password);
            if (pwCheck !== true) {
                setPasswordError(pwCheck);
                valid = false;
            }
        }

        if (!valid) return;

        try {
            setLoading(true);

            const res = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Email atau password salah");
            }

            login(data.user);
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            setError(err.message || "Terjadi kesalahan. Coba lagi.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Login Akun</h1>
            <p className="subtitle">Sign in your account</p>

            <form noValidate onSubmit={handleSubmit}>
                {error && <p className="text-error">{error}</p>}

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError("");
                        }}
                        className={emailError ? "input-error" : ""}
                    />
                    <span className="error-text">{emailError || "\u00A0"}</span>
                </div>

                <div className="form-group">
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Kata Sandi"
                            aria-label="Kata Sandi"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError("");
                            }}
                            className={passwordError ? "input-error" : ""}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={
                                showPassword ? "Sembunyikan password" : "Tampilkan password"
                            }
                        >
                            <EyeIcon open={showPassword} />
                        </button>
                    </div>
                    <span className="error-text">{passwordError || "\u00A0"}</span>
                </div>

                <p className="forgot-password">
                    <Link to="/forgot">Lupa Password</Link>
                </p>

                <button type="submit" className="btn-login" disabled={loading}>
                    <span>{loading ? "Memproses..." : "Login"}</span>
                </button>
            </form>

            <div className="divider" role="separator">
                Atau
            </div>

            <GoogleButton />

            <p className="signup-text">
                Belum punya akun? <Link to="/signup">Daftar</Link>
            </p>
        </>
    );
}
