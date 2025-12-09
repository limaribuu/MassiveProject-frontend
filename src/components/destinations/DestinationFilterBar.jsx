import { useState } from "react";
import ChooseButton from "./ChooseButton";

const DestinationFilterBar = ({ onSearch }) => {
    const [loc, setLoc] = useState(null);
    const [cat, setCat] = useState(null);

    return (
        <div className="w-full flex justify-center">
            <div
                className="
                    bg-white 
                    border border-gray-200 
                    rounded-lg 
                    shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                    px-8 py-5 
                    flex items-center gap-6
                    w-[900px]
                "
            >
                <ChooseButton
                    iconSrc="/icon/pin3.png"
                    label="Pilih Lokasi"
                    value={loc}
                    onSelect={setLoc}
                    hintOnlyWhenOpen
                    hintBox={
                        <div className="flex items-center gap-2 text-gray-700">
                            <img src="/icon/target.png" className="w-5" />
                            <span>Lokasi Anda</span>
                        </div>
                    }
                />

                <div className="h-10 w-px bg-gray-300 hidden md:block"></div>

                <ChooseButton
                    iconSrc="/icon/category.png"
                    label="Kategori"
                    value={cat}
                    onSelect={setCat}
                    items={["Sejarah", "Religi", "Ikonik", "Kuliner"]}
                />

                <button
                    onClick={() => onSearch?.({ loc, cat })}
                    className="
                        ml-auto 
                        bg-orange-500 hover:bg-orange-600 
                        text-white font-semibold 
                        h-[50px] 
                        px-10 
                        rounded-lg 
                        shadow-[0_6px_16px_rgba(249,115,22,0.35)]
                        transition
                    "
                >
                    Cari
                </button>
            </div>
        </div>
    );
};

export default DestinationFilterBar;
