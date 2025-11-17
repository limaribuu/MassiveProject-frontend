import React, { useState } from "react";
import GoogleButton from "./GoogleButton.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

const API_BASE_URL = "http://localhost:5000/api";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

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

      navigate("/profil", { replace: true });
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
        <input
          type="email"
          placeholder="Email"
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Kata Sandi"
          aria-label="Kata Sandi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p
            className="text-error"
            style={{ color: "#dc2626", fontSize: 14 }}
          >
            {error}
          </p>
        )}

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
