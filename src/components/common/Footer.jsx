import React from "react";
import FooterBrand from "./Footer/FooterBrand.jsx";
import FooterLinks from "./Footer/FooterLinks.jsx";
import FooterContact from "./Footer/FooterContact.jsx";
import FooterMap from "./Footer/FooterMap.jsx";

export default function Footer() {
    return (
        <footer className="bg-[#F1721D] text-white py-12">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
                <FooterBrand />
                <FooterLinks />
                <FooterContact />
                <FooterMap />
            </div>
        </footer>
    );
}
