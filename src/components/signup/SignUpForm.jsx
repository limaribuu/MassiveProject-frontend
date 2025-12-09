import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpPopup from "../popup/signUpPopup";

const API_BASE_URL = "https://api-pelesirpalembang.infinitelearningstudent.id";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validatePassword = (value) => {
    if (!value) return "Password wajib diisi";
    if (value.length < 8) {
        return "Password harus 8+ karakter, mengandung angka & simbol";
    }
    if (!/\d/.test(value)) {
        return "Password harus mengandung angka";
    }
    if (!/[!@#$%^&*]/.test(value)) {
        return "Password harus mengandung simbol (!@#$%^&*)";
    }
    return "";
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

export default function SignupForm() {
    const [email, setEmail] = useState("");
    const [nama, setNama] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState(false);

    const [open, setOpen] = useState(false);
    const [globalError, setGlobalError] = useState("");
    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [namaError, setNamaError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleEmailChange = (value) => {
        setEmail(value);
        if (!value.trim()) {
            setEmailError("Email wajib diisi");
        } else if (!emailRegex.test(value)) {
            setEmailError("Format email tidak valid");
        } else {
            setEmailError("");
        }
    };

    const handleNamaChange = (value) => {
        setNama(value);
        if (!value.trim()) {
            setNamaError("Nama wajib diisi");
        } else {
            setNamaError("");
        }
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        const err = validatePassword(value);
        setPasswordError(err);
        if (confirmPassword) {
            if (confirmPassword !== value) {
                setConfirmPasswordError("Konfirmasi password tidak sama");
            } else {
                setConfirmPasswordError("");
            }
        }
    };

    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
        if (!value) {
            setConfirmPasswordError("Konfirmasi password wajib diisi");
        } else if (value !== password) {
            setConfirmPasswordError("Konfirmasi password tidak sama");
        } else {
            setConfirmPasswordError("");
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setGlobalError("");

        let valid = true;

        if (!email.trim()) {
            setEmailError("Email wajib diisi");
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Format email tidak valid");
            valid = false;
        }

        if (!nama.trim()) {
            setNamaError("Nama wajib diisi");
            valid = false;
        }

        const pwErr = validatePassword(password);
        if (pwErr) {
            setPasswordError(pwErr);
            valid = false;
        }

        if (!confirmPassword) {
            setConfirmPasswordError("Konfirmasi password wajib diisi");
            valid = false;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Konfirmasi password tidak sama");
            valid = false;
        }

        if (!agree) {
            setGlobalError("Anda harus menyetujui Kebijakan Privasi");
            valid = false;
        }

        if (emailError || namaError || passwordError || confirmPasswordError) {
            valid = false;
        }

        if (!valid) return;

        try {
            setLoading(true);

            const res = await fetch(`${API_BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: nama,
                    email,
                    password
                })
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Gagal mendaftar");
            }

            setOpen(true);
        } catch (err) {
            console.error(err);
            setGlobalError(err.message || "Terjadi kesalahan saat mendaftar.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Sign Up</h1>
            <p className="subtitle">Create your account</p>

            <form onSubmit={handleSubmit} noValidate>
                {globalError && <p className="text-error">{globalError}</p>}

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        className={emailError ? "input-error" : ""}
                    />
                    <span className="error-text">{emailError || "\u00A0"}</span>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Nama Lengkap"
                        required
                        value={nama}
                        onChange={(e) => handleNamaChange(e.target.value)}
                        className={namaError ? "input-error" : ""}
                    />
                    <span className="error-text">{namaError || "\u00A0"}</span>
                </div>

                <div className="form-group">
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Kata Sandi"
                            required
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
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

                <div className="form-group">
                    <div className="password-field">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Konfirmasi Kata Sandi"
                            required
                            value={confirmPassword}
                            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                            className={confirmPasswordError ? "input-error" : ""}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            aria-label={
                                showConfirmPassword
                                    ? "Sembunyikan konfirmasi password"
                                    : "Tampilkan konfirmasi password"
                            }
                        >
                            <EyeIcon open={showConfirmPassword} />
                        </button>
                    </div>
                    <span className="error-text">
                        {confirmPasswordError || "\u00A0"}
                    </span>
                </div>

                <div className="agree-box">
                    <input
                        type="checkbox"
                        id="agree"
                        checked={agree}
                        onChange={(e) => {
                            setAgree(e.target.checked);
                            if (e.target.checked) setGlobalError("");
                        }}
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

            <SignUpPopup
                isOpen={open}
                onClose={() => setOpen(false)}
                onLogin={() => {
                    setOpen(false);
                    navigate("/login");
                }}
            />
        </>
    );
}
