import React from "react";
import { Link } from "react-router-dom";

export default function FooterLinks() {
    const pages = ["Home", "Destinasi", "Itinerary", "Ulasan"];
    const paths = ["/home", "/destinasi", "/itinerary", "/ulasan"];

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Halaman</h3>
            <ul className="flex flex-col gap-2 text-white/90">
                {pages.map((label, i) => (
                    <li key={label}>
                        <Link to={paths[i]} className="hover:underline">
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}