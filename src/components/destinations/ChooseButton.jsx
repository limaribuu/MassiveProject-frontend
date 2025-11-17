import { useState, useRef, useEffect } from "react";

const ChooseButton = ({
    iconSrc,
    label = "Pilih",
    value,
    items = [],
    onSelect,
    hintBox = null,
    hintOnlyWhenOpen = false,
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (!ref.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const showHint = hintOnlyWhenOpen && open && hintBox;
    const showList = open && !hintOnlyWhenOpen && items.length > 0;

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex h-[52px] min-w-[260px] items-center gap-3 rounded-lg border border-orange-600 bg-white px-4 text-[15px] font-medium text-gray-700 shadow-sm hover:shadow-md transition"
            >
                {iconSrc && <img src={iconSrc} alt="" className="h-5 w-5" />}
                <span>{value || label}</span>
                <img
                    src="/icon/chevron3.png"
                    className={`ml-auto h-4 w-4 transition ${open ? "rotate-180" : ""}`}
                />
            </button>

            {showHint && (
                <div className="absolute left-0 top-[58px] w-[260px] rounded-lg border bg-white px-4 py-3 shadow-md z-50">
                    {hintBox}
                </div>
            )}

            {showList && (
                <div className="absolute left-0 top-[58px] w-[260px] rounded-lg border bg-white shadow-lg z-50">
                    {items.map((it, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                onSelect?.(it);
                                setOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                        >
                            {it}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChooseButton;
