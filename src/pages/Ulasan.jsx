import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer.jsx";
import ReviewCard from "../components/ulasan/ReviewCard.jsx";

const reviewItems = [
  {
    id: 1,
    title: "AMPERA",
    image: "/reco/ampera.png",
    rating: 5,
    reviews: 120,
  },
  {
    id: 2,
    title: "MUSEUM SULTAN MAHMUD BD II",
    image: "/reco/museum-smb2.png",
    rating: 4,
    reviews: 80,
  },
  {
    id: 3,
    title: "MUSEUM BALAPUTRA DEWA",
    image: "/reco/balaputra.png",
    rating: 4,
    reviews: 64,
  },
  {
    id: 4,
    title: "TAMAN PURBAKALA",
    image: "/reco/taman-purbakala.png",
    rating: 5,
    reviews: 40,
  },
  {
    id: 5,
    title: "AL-QURAN AL-AKBAR",
    image: "/reco/bayt-alquran.png",
    rating: 5,
    reviews: 95,
  },
  {
    id: 6,
    title: "BUKIT SIGUNTANG",
    image: "/img/ulasan/siguntang.jpg",
    rating: 4,
    reviews: 52,
  },
  {
    id: 7,
    title: "PULAU KEMARO",
    image: "/img/ulasan/pulau-kemaro.jpg",
    rating: 5,
    reviews: 110,
  },
  {
    id: 8,
    title: "BENTENG KUTO BESAK",
    image: "/img/ulasan/bkb.jpg",
    rating: 4,
    reviews: 73,
  },
  {
    id: 9,
    title: "MONPERA",
    image: "/img/ulasan/monpera.jpg",
    rating: 4,
    reviews: 61,
  },
  {
    id: 10,
    title: "JAKABARING SPORT CITY",
    image: "/img/ulasan/jakabaring.jpg",
    rating: 5,
    reviews: 88,
  },
  {
    id: 11,
    title: "LORONG BASAH NIGHT CULINARY",
    image: "/img/ulasan/kampung-kapitan.jpg",
    rating: 4,
    reviews: 37,
  },
  {
    id: 12,
    title: "KAMPUNG KAPITAN",
    image: "/img/ulasan/hidden-gem.jpg",
    rating: 4,
    reviews: 22,
  },
];

const Ulasan = () => {
  const sliderRef = React.useRef(null);
  const isDownRef = React.useRef(false);
  const startXRef = React.useRef(0);
  const scrollLeftRef = React.useRef(0);

  const scrollByArrow = (direction) => {
    const container = sliderRef.current;
    if (!container) return;
    const amount = 260;
    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e) => {
    const container = sliderRef.current;
    if (!container) return;
    isDownRef.current = true;
    container.classList.add("cursor-grabbing");
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseLeave = () => {
    const container = sliderRef.current;
    if (!container) return;
    isDownRef.current = false;
    container.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    const container = sliderRef.current;
    if (!container) return;
    isDownRef.current = false;
    container.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e) => {
    const container = sliderRef.current;
    if (!container || !isDownRef.current) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.2; // kecepatan drag
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Judul */}
        <div className="text-center pt-12 pb-8">
          <h1 className="text-6xl font-bold text-orange-500">
            Ulasan Wisata
          </h1>
        </div>

        {/* Slider */}
        <section className="mx-auto max-w-6xl px-6 pt-2">
          <div className="relative">
            {/* tombol kiri */}
            <button
              type="button"
              onClick={() => scrollByArrow("left")}
              className="absolute left-[-18px] top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-orange-500 hover:text-white transition"
            >
              <span className="text-lg font-bold">&lt;</span>
            </button>

            {/* area scroll & drag */}
            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto scroll-smooth py-2 px-1 cursor-grab select-none"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {reviewItems.map((item) => (
                <ReviewCard key={item.id} {...item} />
              ))}
            </div>

            {/* tombol kanan */}
            <button
              type="button"
              onClick={() => scrollByArrow("right")}
              className="absolute right-[-18px] top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-orange-500 hover:text-white transition"
            >
              <span className="text-lg font-bold">&gt;</span>
            </button>
          </div>
        </section>

        {/* Tombol Tambah Rating */}
        <section className="mx-auto max-w-6xl px-6 pt-10 pb-16 flex justify-center">
          <Link
            to="/ulasan/tambah-rating"
            className="rounded-2xl bg-orange-400 px-10 py-3 text-white text-[16px] font-semibold shadow-md hover:bg-orange-500"
          >
            Tambahkan Rating
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Ulasan;
