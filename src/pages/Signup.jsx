import React from "react";
import "../styles/auth.css";
import SignupForm from "../components/signup/SignUpForm.jsx";
import ImageSlider from "../components/common/ImageSlider.jsx";

export default function Signup() {
    return (
        <div className="auth-page">
            <div className="container">
                <section className="body-container" aria-label="Form Signup">
                    <SignupForm />
                </section>
                <section className="slider" aria-label="Promosi Destinasi">
                    <ImageSlider />
                </section>
            </div>
        </div>
    );
}
