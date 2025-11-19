import { useNavigate } from "react-router-dom";

const Row = ({ icon, title, children }) => (
  <div className="flex items-start gap-3">
    <img src={icon} alt={title} className="w-5 h-5 mt-1" />
    <div className="min-w-0">
      <div className="text-[15px] font-semibold text-orange-500">{title}</div>
      <div className="text-[15px] leading-6 text-zinc-700">{children}</div>
    </div>
  </div>
);

const InfoSidebar = ({ data }) => {
  const navigate = useNavigate();

  const {
    jamOperasional = "Jam operasional belum tersedia",
    lokasi = "Lokasi belum tersedia",
    hargaTiket = "Informasi tiket belum tersedia",
    fasilitas = "Informasi fasilitas belum tersedia",
  } = data || {};

  const handleLihatRute = () => {
    navigate("/maps");
  };

  return (
    <aside className="bg-white rounded-xl border border-orange-200 shadow-md p-5 w-full max-w-[320px]">
      <div className="space-y-6">
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

        {/* Tombol Lihat Rute */}
        <button
          onClick={handleLihatRute}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <span className="text-[15px]">Lihat Rute</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
