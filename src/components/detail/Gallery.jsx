const Gallery = ({ mainImage, images = [] }) => {
    const main = mainImage || "/img/dalammuseum.png";
    const thumbs =
        images.length > 0
            ? images.slice(0, 3)
            : ["/img/tumpuk1.png", "/img/tumpuk2.png", "/img/tumpuk3.png"];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div className="lg:col-span-2">
                <div className="w-full rounded-2xl overflow-hidden shadow">
                    <img
                        src={main}
                        alt="Foto utama destinasi"
                        className="w-full h-80 sm:h-[420px] md:h-[480px] lg:h-[570px] object-cover"
                    />
                </div>
            </div>

            <div className="flex lg:flex-col gap-4">
                {thumbs.map((src, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-xl overflow-hidden shadow"
                    >
                        <img
                            src={src}
                            alt={`Galeri ${i + 1}`}
                            className="w-full h-[130px] sm:h-40 lg:h-[180px] object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
