import React from "react";
import "../styles/auth.css";
import ForgotForm from "../components/forgot/ForgotForm.jsx";
import ImageSlider from "../components/common/ImageSlider.jsx";

export default function Forgot() {
    return (
        <div className="auth-page">
            <div className="container">
                <section className="body-container" aria-label="Form Lupa Kata Sandi">
                    <ForgotForm />
                </section>
                <section className="slider" aria-label="Promosi Destinasi">
                    <ImageSlider />
                </section>
            </div>
        </div>
    );
}
