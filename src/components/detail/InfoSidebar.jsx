import { useNavigate } from "react-router-dom";

const Row = ({ icon, title, children }) => (
    <div className="flex items-start gap-3">
        <div className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm">
            <img src={icon} alt={title} className="w-4 h-4" />
        </div>
        <div className="min-w-0">
            <div className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                {title}
            </div>
            <div className="text-[13px] leading-5 text-zinc-800">{children}</div>
        </div>
    </div>
);

const InfoSidebar = ({ data }) => {
    const navigate = useNavigate();

    const {
        jamOperasional = "Jam operasional belum tersedia",
        lokasi = "Lokasi belum tersedia",
        hargaTiket = "Informasi tiket belum tersedia",
        fasilitas = "Informasi fasilitas belum tersedia"
    } = data || {};

    const handleLihatRute = () => {
        navigate("/maps");
    };

    return (
        <aside className="bg-[#FFF7F1] border-2 border-orange-200 rounded-[22px] shadow-[0_10px_25px_rgba(0,0,0,0.06)] p-5 w-full">
            <div className="space-y-5">
                <Row icon="/icon/clock.png" title="Jam Operasional">
                    <p className="text-zinc-800 leading-relaxed whitespace-pre-line">
                        {jamOperasional}
                    </p>
                </Row>

                <Row icon="/icon/location.png" title="Lokasi">
                    <p className="text-orange-600 leading-relaxed whitespace-pre-line">
                        {lokasi}
                    </p>
                </Row>

                <Row icon="/icon/ticket.png" title="Harga Tiket">
                    <p className="text-zinc-800 leading-relaxed whitespace-pre-line">
                        {hargaTiket}
                    </p>
                </Row>

                <Row icon="/icon/facility.png" title="Fasilitas">
                    <p className="text-zinc-800 leading-relaxed whitespace-pre-line">
                        {fasilitas}
                    </p>
                </Row>

                <button
                    onClick={handleLihatRute}
                    className="mt-1 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-[13px] py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors duration-200"
                >
                    <span>Lihat Rute</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </aside>
    );
};

export default InfoSidebar;
