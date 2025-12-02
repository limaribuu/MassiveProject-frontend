export const places = [
    {
        id: "museum-balaputra",
        slug: "museum-balaputra",
        title: "Museum Balaputra Dewa",
        desc: "Museum arkeologi dan budaya Sumatera Selatan.",
        img: "/reco/balaputra.png",
        category: ["sejarah"]
    },
    {
        id: "bukit-siguntang",
        slug: "bukit-siguntang",
        title: "Bukit Siguntang",
        desc: "Situs bersejarah Kerajaan Sriwijaya.",
        img: "/reco/bukit-siguntang.png",
        category: ["sejarah", "religi", "alam"]
    },
    {
        id: "benteng-kuto-besak",
        slug: "bkb",
        title: "Benteng Kuto Besak",
        desc: "Benteng peninggalan Kesultanan Palembang.",
        img: "/reco/bkb.png",
        category: ["sejarah", "ikonik"]
    },
    {
        id: "ampera",
        slug: "ampera",
        title: "Jembatan Ampera",
        desc: "Ikon kota Palembang di atas Sungai Musi—wajib foto!",
        img: "/reco/ampera.png",
        category: ["ikonik"]
    },
    {
        id: "pulau-kemaro",
        slug: "pulau-kemaro",
        title: "Pulau Kemaro",
        desc: "Pulau di Sungai Musi dengan pagoda, vihara, dan legenda Tan Bun An & Siti Fatimah.",
        img: "/reco/pulau-kemaro.png",
        category: ["religi", "alam"]
    },
    {
        id: "taman-purbakala",
        slug: "taman-purbakala",
        title: "Taman Purbakala",
        desc: "Destinasi bersejarah yang menyimpan peninggalan zaman Sriwijaya.",
        img: "/reco/taman-purbakala.png",
        category: ["sejarah", "alam"]
    },
    {
        id: "lorong-basah",
        slug: "lorong-basah",
        title: "Lorong Basah Night Culinary",
        desc: "Destinasi kuliner malam populer di Palembang.",
        img: "/reco/lorong-basah.png",
        category: ["kuliner"]
    },
    {
        id: "jakabaring",
        slug: "jakabaring",
        title: "Jakabaring Sport City",
        desc: "Pusat olahraga terbesar di Palembang dengan stadion dan fasilitas modern.",
        img: "/reco/jakabaring.png",
        category: ["ikonik"]
    },
    {
        id: "bayt-quran",
        slug: "bayt-quran",
        title: "Bayt Al-Quran Al-Akbar",
        desc: "Destinasi religi dengan Al-Quran ukir raksasa yang megah.",
        img: "/reco/bayt-alquran.png",
        category: ["religi"]
    },
    {
        id: "monpera",
        slug: "monpera",
        title: "Monpera",
        desc: "Monumen perjuangan rakyat Palembang melawan penjajah.",
        img: "/reco/monpera.png",
        category: ["sejarah", "ikonik"]
    },
    {
        id: "museum-smb-ii",
        slug: "museum-smb-ii",
        title: "Museum Sultan Mahmud Badaruddin II",
        desc: "Museum sejarah Kesultanan Palembang dan perjuangan masyarakat.",
        img: "/reco/museum-smb2.png",
        category: ["sejarah", "ikonik"]
    },
    {
        id: "kampung-kapitan",
        slug: "kampung-kapitan",
        title: "Kampung Kapitan",
        desc: "Kawasan bersejarah di tepi Sungai Musi dengan rumah kayu kolonial dan Tionghoa.",
        img: "/reco/kampung-kapitan.png",
        category: ["sejarah"]
    }
];

export function getPlaceBySlug(slug) {
    return places.find((p) => p.slug === slug);
}
