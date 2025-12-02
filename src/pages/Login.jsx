import React from "react";
import "../styles/auth.css";
import LoginForm from "../components/login/LoginForm.jsx";
import ImageSlider from "../components/common/ImageSlider.jsx";

export default function Login() {
    return (
        <div className="auth-page">
            <div className="container">
                <section className="body-container" aria-label="Form Login">
                    <LoginForm />
                </section>
                <section className="slider" aria-label="Promosi Destinasi">
                    <ImageSlider />
                </section>
            </div>
        </div>
    );
}