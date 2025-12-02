import React from "react";
import Maps from "../../maps/Maps.jsx";

export default function FooterMap() {
    return (
        <div className="ft__map ml-auto">
            <h3 className="text-lg font-semibold mb-4">Peta Palembang</h3>
            <div className="w-[350px] h-[250px] rounded-2xl overflow-hidden shrink-0">
                <Maps
                    variant="section"
                    className="h-full"
                    showBack={false}
                    showMenu={false}
                />
            </div>
        </div>
    );
}
