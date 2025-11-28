const TitleSection = ({ title, onAdd }) => {
  return (
    <div className="mt-1 mb-1 flex justify-end">
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-[18px] shadow-md"
      >
        <span>Tambahkan ke Itinerary</span>
        <img src="/icon/plus.png" alt={`Tambah ${title}`} className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TitleSection;
