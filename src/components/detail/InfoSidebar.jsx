// src/components/detail/InfoSidebar.jsx

const Row = ({ icon, title, children }) => (
  <div className="flex items-start gap-3">
    <img src={icon} alt={title} className="w-5 h-5 mt-1" />
    <div className="min-w-0">
      <div className="text-[15px] font-semibold text-orange-500">
        {title}
      </div>
      <div className="text-[15px] leading-6 text-zinc-700">{children}</div>
    </div>
  </div>
);

const InfoSidebar = ({ data }) => {
  const {
    jamOperasional = "Jam operasional belum tersedia",
    lokasi = "Lokasi belum tersedia",
    hargaTiket = "Informasi tiket belum tersedia",
    fasilitas = "Informasi fasilitas belum tersedia",
  } = data || {};

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
      </div>
    </aside>
  );
};

export default InfoSidebar;
