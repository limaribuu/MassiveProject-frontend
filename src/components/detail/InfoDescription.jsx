import InfoSidebar from "./InfoSidebar";

const InfoDescription = ({ text, sidebarData, sections = [] }) => {
    return (
        <section className="mt-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Kolom kiri: deskripsi + section (Spot Foto Favorit, Kuliner, dll) */}
                <div className="lg:w-2/3">
                    <div className="space-y-6 text-[15px] leading-7 text-zinc-700 text-justify">
                        <p className="whitespace-pre-line">{text}</p>

                        {sections.map((sec) => (
                            <div key={sec.title}>
                                <h2 className="text-lg font-semibold text-zinc-900 mb-2">
                                    {sec.title}
                                </h2>
                                <p className="text-[15px] leading-7 text-zinc-700 text-justify">
                                    {sec.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Kolom kanan: info sidebar */}
                <div className="lg:w-1/3 lg:flex lg:justify-end">
                    <InfoSidebar data={sidebarData} />
                </div>
            </div>
        </section>
    );
};

export default InfoDescription;
