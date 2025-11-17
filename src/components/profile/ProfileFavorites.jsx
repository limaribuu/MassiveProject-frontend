import React from "react";

export default function ProfileFavorites({ items }) {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-2">Destinasi Favorit</h2>
            <p className="text-gray-600 mb-6">{items.length} Destinasi Wisata</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((it) => (
                    <Card key={it.id} item={it} />
                ))}
            </div>
        </section>
    );
}

function Card({ item }) {
    return (
        <div className="rounded-2xl overflow-hidden shadow-md bg-white">
            <div className="h-44 w-full overflow-hidden relative">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
                    <svg className="h-5 w-5 text-[#F1721D]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5A4.5 4.5 0 0 1 6.5 4c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 21 8.5c0 3.78-3.4 6.86-8.55 11.53Z" />
                    </svg>
                </span>
            </div>
            <div className="p-4">
                <div className="font-semibold text-gray-800 line-clamp-2">{item.title}</div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{item.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-gray-700">
                    <span className="inline-flex -mt-0.5">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z" />
                        </svg>
                    </span>
                    {item.rating.toFixed(1)}
                </div>
            </div>
        </div>
    );
}
