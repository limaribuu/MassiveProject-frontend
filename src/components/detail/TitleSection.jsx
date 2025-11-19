const TitleSection = ({ title, onAdd }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1 mb-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900">
                {title}
            </h1>

            <button
                type="button"
                onClick={onAdd}
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-[14px] shadow-md self-start md:self-auto"
            >
                <span>Tambahkan ke Itinerary</span>
                <img src="/icon/plus.png" alt="Tambah" className="w-4 h-4" />
            </button>
        </div>
    );
};

export default TitleSection;
