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
                        className="w-full h-[260px] sm:h-80 md:h-[380px] lg:h-[420px] object-cover"
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
                            className="w-full h-[100px] sm:h-[130px] lg:h-[130px] object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
