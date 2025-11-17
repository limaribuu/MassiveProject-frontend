import React from "react";

export default function FooterContact() {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="flex flex-col gap-3 text-white/90">
                <li className="flex items-center gap-3">
                    <img src="/icon/phone.png" alt="Phone" className="h-6 w-6" />
                    <span>+62 821 0000 0000</span>
                </li>
                <li className="flex items-center gap-3">
                    <img src="/icon/email.png" alt="Email" className="h-6 w-6" />
                    <span>pelisirpalembang@gmail.com</span>
                </li>
                <li className="flex items-center gap-3">
                    <img src="/icon/pin2.png" alt="Location" className="h-6 w-6" />
                    <span>Kota Palembang</span>
                </li>
            </ul>
        </div>
    );
}
