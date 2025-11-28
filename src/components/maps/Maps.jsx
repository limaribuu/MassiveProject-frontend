import React, { useState, useEffect, useRef } from "react";
import { RotateCcw, X, Menu, ArrowLeft } from "lucide-react";

function cx(...cls) {
  return cls.filter(Boolean).join(" ");
}

const Maps = ({
  variant = "page", // "page" | "section"
  className = "",
  showBack = true,
  showMenu = true,
  onBack,
}) => {
  const isPage = variant === "page";

  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [vehicle, setVehicle] = useState("foot");
  const [useMyLocation, setUseMyLocation] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [directionsVisible, setDirectionsVisible] = useState(false);
  const [directionsContent, setDirectionsContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [directionsMinimized, setDirectionsMinimized] = useState(false);

  const mapRef = useRef(null);
  const userLocationMarkerRef = useRef(null);
  const routeLayerRef = useRef(null);
  const vehicleMarkerRef = useRef(null);
  const animationIntervalRef = useRef(null);
  const markersRef = useRef({});
  const lastMarkerRef = useRef(null);
  const accuracyCircleRef = useRef(null);

  const locations = [
    {
      lat: -3.00556,
      lng: 104.697225,
      name: "Al quran Akbar (Al quran Raksasa)",
      address:
        "Jl. Kol. H. Barlian No.936, Srijaya, Alang-Alang Lebar, Palembang",
      image:
        "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=400&h=300&fit=crop",
      description:
        "Al-Qur'an raksasa setinggi 15,6 meter yang menjadi ikon kota Palembang",
    },
    {
      lat: -2.992861,
      lng: 104.75225,
      name: "Bukit Siguntang",
      address: "Bukit Lama, Ilir Barat I, Kota Palembang",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop",
      description: "Kompleks sejarah dan makam kerajaan Sriwijaya",
    },
    {
      lat: -2.9914,
      lng: 104.7592,
      name: "BKB (Benteng Kuto Besak)",
      address: "Jl. Merdeka, 19 Ilir, Bukit Kecil, Palembang",
      image:
        "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=300&fit=crop",
      description: "Benteng bersejarah peninggalan Kesultanan Palembang",
    },
    {
      lat: -2.995073,
      lng: 104.763092,
      name: "Kampung Kapitan",
      address: "Jl. Kapitan Rivai, 13 Ulu, Seberang Ulu II, Palembang",
      image:
        "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop",
      description: "Kawasan pecinan bersejarah dengan arsitektur khas",
    },
    {
      lat: -2.9875,
      lng: 104.719444,
      name: "Kampung Al Munawar",
      address: "Jl. Al Munawar, 13 Ulu, Seberang Ulu II, Palembang",
      image:
        "https://images.unsplash.com/photo-1564769610726-4ba6bee10da1?w=400&h=300&fit=crop",
      description:
        "Kawasan kampung Arab dengan Masjid Al Munawar yang bersejarah",
    },
    {
      lat: -2.992,
      lng: 104.748,
      name: "Taman Purbakala Kerajaan Sriwijaya",
      address: "Jl. Sriwijaya, Bukit Lama, Ilir Barat I, Palembang",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      description: "Taman arkeologi dengan koleksi arca dan prasasti Sriwijaya",
    },
    {
      lat: -2.978951,
      lng: 104.817997,
      name: "Pulau Kemaro",
      address: "Sungai Musi, Palembang",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      description:
        "Pulau di Sungai Musi dengan pagoda dan legenda Siti Fatimah",
    },
    {
      lat: -3.021425,
      lng: 104.788719,
      name: "Jakabaring Sport City",
      address: "Jl. Gubernur H. A. Bastari, Jakabaring, Palembang",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
      description: "Kompleks olahraga terbesar di Indonesia untuk SEA Games",
    },
    {
      lat: -2.99153,
      lng: 104.79996,
      name: "Taman Makam dan Monkey Forest Bagus Kuning",
      address: "Jl. Basuki Rahmat, Kertapati, Palembang",
      image:
        "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400&h=300&fit=crop",
      description: "Hutan wisata dengan populasi monyet dan makam bersejarah",
    },
    {
      lat: -2.990313,
      lng: 104.761067,
      name: "Museum SMB II",
      address: "Jl. Sultan Mahmud Badaruddin II, Palembang",
      image:
        "https://images.unsplash.com/photo-1566127444979-b3d2b654e3b0?w=400&h=300&fit=crop",
      description: "Museum bersejarah di rumah limas tradisional Palembang",
    },
    {
      lat: -2.9808,
      lng: 104.774,
      name: "Kawah Tengkurep",
      address: "Kertapati, Palembang",
      image:
        "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400&h=300&fit=crop",
      description: "Kawah bekas tambang dengan pemandangan alam yang unik",
    },
    {
      lat: -2.950833,
      lng: 104.730437,
      name: "Museum Bala Putra Dewa",
      address: "Jl. Srijaya Negara, Bukit Besar, Palembang",
      image:
        "https://images.unsplash.com/photo-1580130775562-0ef92da028de?w=400&h=300&fit=crop",
      description:
        "Museum provinsi dengan koleksi artefak budaya Sumatera Selatan",
    },
    {
      lat: -2.990934,
      lng: 104.756554,
      name: "Pedestrian Soedirman",
      address: "Jl. Sudirman, Palembang",
      image:
        "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=400&h=300&fit=crop",
      description: "Area pejalan kaki populer untuk bersantai dan kuliner",
    },
    {
      lat: -2.987778,
      lng: 104.764722,
      name: "Lorong Basah Night Culinary Market",
      address: "Jl. Kapten A. Rivai, 26 Ilir D. I, Bukit Kecil, Palembang",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      description:
        "Pasar kuliner malam terkenal dengan berbagai makanan khas Palembang",
    },
  ];

  // Load Leaflet CSS/JS & style popup
  useEffect(() => {
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
    document.head.appendChild(cssLink);

    const style = document.createElement("style");
    style.innerHTML = `
      .custom-popup .leaflet-popup-content-wrapper { border-radius: 12px; padding: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
      .custom-popup .leaflet-popup-content { margin: 0; width: auto !important; }
      .custom-popup .leaflet-popup-tip { box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
      .custom-popup button:hover { background-color: #e35a00 !important; }
      .leaflet-container { height: 100%; width: 100%; }
    `;
    document.head.appendChild(style);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
    script.async = false;
    script.onload = () => setLeafletLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(cssLink);
      document.head.removeChild(style);
      document.body.removeChild(script);
    };
  }, []);

  // Init map
  useEffect(() => {
    if (!leafletLoaded || map || !mapRef.current) return;
    const L = window.L;
    if (!L) return;

    const mymap = L.map(mapRef.current, {
      center: [-2.990934, 104.756554],
      zoom: 12,
      minZoom: 11,
      maxZoom: 18,
      maxBoundsViscosity: 0.5,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      minZoom: 11,
      maxZoom: 18,
    }).addTo(mymap);

    // markers + popup (sama seperti sebelumnya)
    locations.forEach((loc) => {
      const popupContent = `
        <div style="width: 300px; font-family: Arial, sans-serif;">
          <div style="position: relative; margin: -15px -15px 10px -15px;">
            <img src="${loc.image}" alt="${loc.name}"
                 style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px 8px 0 0;"
                 onerror="this.src='https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400&h=300&fit=crop'">
          </div>
          <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: bold; color: #1a1a1a;">${loc.name}</h3>
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #666; line-height: 1.4;">📍 ${loc.address}</p>
          <p style="margin: 0 0 12px 0; font-size: 13px; color: #444; line-height: 1.5;">${loc.description}</p>
          <button onclick="void(0)"
                  style="width: 100%; padding: 10px; background-color: #fd6b1c; color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background-color 0.3s;">
            📋 Lihat Detail
          </button>
        </div>
      `;
      const marker = L.marker([loc.lat, loc.lng])
        .addTo(mymap)
        .bindPopup(popupContent, {
          maxWidth: 320,
          className: "custom-popup",
        });
      markersRef.current[loc.name.toLowerCase()] = marker;
    });

    // tombol "lokasi saya"
    const myLocationButton = L.control({ position: "bottomright" });
    myLocationButton.onAdd = function () {
      const div = L.DomUtil.create("div", "my-location-button");
      div.innerHTML =
        '<button title="Lokasi Saya" class="p-2 bg-white border border-gray-300 rounded-lg cursor-pointer shadow-md hover:bg-gray-50"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg></button>';
      div.onclick = () => getUserLocation();
      return div;
    };
    myLocationButton.addTo(mymap);

    setMap(mymap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leafletLoaded]);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation tidak didukung oleh browser Anda.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);
        const L = window.L;
        const newUserLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(newUserLocation);
        setUseMyLocation(true);

        if (userLocationMarkerRef.current)
          map.removeLayer(userLocationMarkerRef.current);

        const myLocationIcon = L.icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        userLocationMarkerRef.current = L.marker(
          [newUserLocation.lat, newUserLocation.lng],
          { icon: myLocationIcon }
        )
          .addTo(map)
          .bindPopup("Lokasi Saya")
          .openPopup();

        map.setView([newUserLocation.lat, newUserLocation.lng], 19);

        if (position.coords.accuracy) {
          if (accuracyCircleRef.current)
            map.removeLayer(accuracyCircleRef.current);
          accuracyCircleRef.current = L.circle(
            [newUserLocation.lat, newUserLocation.lng],
            {
              radius: position.coords.accuracy,
              color: "white",
              fillColor: "white",
              fillOpacity: 0.15,
            }
          ).addTo(map);
        }
      },
      (error) => {
        setLoading(false);
        const msg =
          error.code === error.PERMISSION_DENIED
            ? "Anda menolak permintaan geolokasi."
            : error.code === error.POSITION_UNAVAILABLE
            ? "Informasi lokasi tidak tersedia."
            : error.code === error.TIMEOUT
            ? "Permintaan untuk mendapatkan lokasi timed out."
            : "Terjadi kesalahan yang tidak diketahui.";
        alert(msg);
        setUseMyLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSearch = () => {
    const L = window.L;
    const input = searchInput.trim();
    const coordRegex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;

    if (lastMarkerRef.current) {
      map.removeLayer(lastMarkerRef.current);
      lastMarkerRef.current = null;
    }

    if (coordRegex.test(input)) {
      const [lat, lng] = input.split(",").map(Number);
      lastMarkerRef.current = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`Koordinat: ${lat}, ${lng}`)
        .openPopup();
      map.setView([lat, lng], 19);
    } else {
      const matched = locations.find((loc) =>
        loc.name.toLowerCase().includes(input.toLowerCase())
      );
      if (matched) {
        map.setView([matched.lat, matched.lng], 19);
        setTimeout(() => {
          const m = markersRef.current[matched.name.toLowerCase()];
          if (m) m.openPopup();
        }, 300);
      } else {
        alert("Lokasi atau koordinat tidak ditemukan.");
      }
    }
  };

  const handleRoute = async () => {
    const L = window.L;

    if (useMyLocation && !userLocation) {
      alert("Lokasi Anda belum terdeteksi. Silakan coba lagi.");
      getUserLocation();
      return;
    }
    if (!toLocation) {
      alert("Silakan pilih lokasi tujuan.");
      return;
    }

    let locFrom;
    if (useMyLocation) {
      locFrom = { ...userLocation, name: "Lokasi Saya" };
    } else {
      if (!fromLocation) return alert("Silakan pilih lokasi awal.");
      if (fromLocation === toLocation)
        return alert("Pilih dua lokasi yang berbeda.");
      locFrom = locations.find((l) => l.name === fromLocation);
    }
    const locTo = locations.find((l) => l.name === toLocation);

    if (routeLayerRef.current) map.removeLayer(routeLayerRef.current);

    setDirectionsVisible(true);
    setDirectionsContent('<p class="text-gray-600">Sedang memuat rute...</p>');

    let routeColor = "blue";
    let profile = "foot-walking";
    if (vehicle === "motorbike") {
      routeColor = "green";
      profile = "driving-car";
    } else if (vehicle === "car") {
      routeColor = "red";
      profile = "driving-car";
    }

    try {
      const startCoords = [locFrom.lng, locFrom.lat];
      const endCoords = [locTo.lng, locTo.lat];

      const response = await fetch(
        `https://api.openrouteservice.org/v2/directions/${profile}/geojson`,
        {
          method: "POST",
          headers: {
            Authorization:
              "5b3ce3597851110001cf624883510d7db77e4151bbea2e322f532880",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coordinates: [startCoords, endCoords],
            instructions: true,
          }),
        }
      );

      const data = await response.json();
      if (data.error) return alert(`Error: ${data.error.message}`);

      routeLayerRef.current = L.geoJSON(data, {
        style: { color: routeColor, weight: 5 },
      }).addTo(map);
      map.fitBounds(routeLayerRef.current.getBounds());

      if (vehicleMarkerRef.current) {
        map.removeLayer(vehicleMarkerRef.current);
        clearInterval(animationIntervalRef.current);
      }

      const coords = data.features[0].geometry.coordinates;
      let i = 0;
      const vehicleIcons = {
        foot: L.icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
        motorbike: L.icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
        car: L.icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
      };

      vehicleMarkerRef.current = L.marker([coords[0][1], coords[0][0]], {
        icon: vehicleIcons[vehicle] || vehicleIcons.foot,
      }).addTo(map);

      animationIntervalRef.current = setInterval(() => {
        if (i < coords.length) {
          const latlng = [coords[i][1], coords[i][0]];
          vehicleMarkerRef.current.setLatLng(latlng);
          i++;
        } else {
          clearInterval(animationIntervalRef.current);
        }
      }, 100);

      const routeInfo = data.features[0].properties;
      const distanceInKm = routeInfo.summary.distance / 1000;
      const durationMinutes = routeInfo.summary.duration / 60;
      const steps = routeInfo.segments[0].steps;

      let directionsHTML = `
        <h3 class="text-lg font-bold text-gray-800 mb-2">${locFrom.name} ke ${
        locTo.name
      }</h3>
        <p class="text-sm text-gray-600 mb-3">${distanceInKm.toFixed(
          1
        )} km, ${Math.ceil(durationMinutes)} menit</p>
        <hr class="mb-3 border-gray-300">
        <ol class="list-decimal pl-5 space-y-2 text-sm">
      `;
      steps.forEach((step) => {
        directionsHTML += `<li class="text-gray-700">${
          step.instruction
        } <span class="text-gray-500">(${(step.distance / 1000).toFixed(
          2
        )} km)</span></li>`;
      });
      directionsHTML += "</ol>";

      setDirectionsContent(directionsHTML);
    } catch (e) {
      console.error(e);
      alert("Terjadi kesalahan saat mengambil rute. Silakan coba lagi.");
    }
  };

  return (
    <div
      className={cx(
        "relative w-full",
        isPage ? "h-screen" : "h-[420px] rounded-2xl overflow-hidden",
        className
      )}
    >
      {/* Loading Overlay */}
      {loading && (
        <div
          className={cx(
            isPage ? "fixed inset-0" : "absolute inset-0",
            "bg-black bg-opacity-50 flex items-center justify-center z-2000"
          )}
        >
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <p className="text-gray-800">Mendapatkan lokasi Anda...</p>
          </div>
        </div>
      )}

      {/* Back Button */}
      {showBack && (
        <button
          onClick={() => (onBack ? onBack() : window.history.back())}
          className={cx(
            isPage
              ? "fixed top-3 left-13 z-1100" // ← dari left-3 jadi left-5
              : "absolute top-3 left-13 z-20", // ← dari left-3 jadi left-5
            "w-10 h-10 bg-[#fd6b1c] text-white rounded-lg flex items-center justify-center hover:bg-[#e35a00] shadow-lg"
          )}
          title="Kembali"
        >
          <ArrowLeft size={20} />
        </button>
      )}

      {/* Show Sidebar Button */}
      {showMenu && (
        <button
          onClick={() => setSidebarOpen(true)}
          className={cx(
            sidebarOpen ? "hidden" : "flex items-center justify-center",
            isPage
              ? "fixed top-20 left-2 z-1100"
              : "absolute top-16 left-2 z-20",
            "w-10 h-10 bg-[#fd6b1c] text-white rounded-lg shadow-lg hover:bg-[#e35a00] transition-all"
          )}
          title="Menu"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={cx(
          isPage
            ? "fixed z-1000 bg-white bg-opacity-[0.97] shadow-xl transition-all duration-400 md:rounded-2xl rounded-t-2xl md:w-80 w-full md:h-[85vh] h-[60vh] md:top-6"
            : "absolute z-30 bg-white/95 shadow-xl transition-all duration-300 rounded-xl w-[min(320px,calc(100%-24px))] h-[calc(100%-24px)] top-3",
          sidebarOpen
            ? isPage
              ? "md:left-6 left-0"
              : "left-3"
            : isPage
            ? "md:-left-[400px] left-0 md:top-6"
            : "-left-[360px]"
        )}
      >
        {/* Top Buttons */}
        <div className="sticky top-0 z-30 bg-white/95 px-3 py-2 flex justify-end gap-2">
          <button
            onClick={() => window.location.reload()}
            className="w-8 h-8 bg-[#fd6b1c] text-white rounded-full flex items-center justify-center hover:bg-[#e35a00] shadow-md"
            title="Refresh"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            className="w-8 h-8 bg-[#fd6b1c] text-white rounded-full flex items-center justify-center hover:bg-[#e35a00] shadow-md"
            title="Tutup"
          >
            <X size={18} />
          </button>
        </div>
        {/* Drag Handle (Mobile) */}
        <div className="md:hidden w-16 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 cursor-grab active:cursor-grabbing"></div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(100%-40px)] md:max-h-[calc(100%-60px)] p-5">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Cari nama lokasi atau koordinat (lat, lng)"
            className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:border-[#fd6b1c] focus:ring-2 focus:ring-[#fd6b1c] outline-none mb-3"
          />
          <button
            onClick={handleSearch}
            className="w-full bg-[#fd6b1c] text-white py-2 rounded-lg font-semibold hover:bg-[#e35a00] mb-4"
          >
            Cari
          </button>

          <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
            <label htmlFor="use-my-location" className="text-sm text-gray-700">
              Ingin gunakan titik anda berada?
            </label>
            <input
              type="checkbox"
              id="use-my-location"
              checked={useMyLocation}
              onChange={(e) => {
                setUseMyLocation(e.target.checked);
                if (e.target.checked && !userLocation) getUserLocation();
              }}
              className="w-5 h-5 cursor-pointer"
            />
          </div>

          {!useMyLocation && (
            <div className="mb-4">
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Dari:
              </label>
              <select
                id="from"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#fd6b1c] focus:ring-2 focus:ring-[#fd6b1c] outline-none"
              >
                <option value="">Pilih lokasi</option>
                {locations.map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="to"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ke:
            </label>
            <select
              id="to"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#fd6b1c] focus:ring-2 focus:ring-[#fd6b1c] outline-none"
            >
              <option value="">Pilih lokasi</option>
              {locations.map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="vehicle-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Pilih transportasi:
            </label>
            <select
              id="vehicle-select"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#fd6b1c] focus:ring-2 focus:ring-[#fd6b1c] outline-none"
            >
              <option value="foot">🚶 Jalan Kaki</option>
              <option value="motorbike">🏍️ Motor</option>
              <option value="car">🚗 Mobil</option>
            </select>
          </div>

          <button
            onClick={handleRoute}
            className="w-full bg-[#fd6b1c] text-white py-3 rounded-lg font-semibold hover:bg-[#e35a00]"
          >
            Tampilkan Rute
          </button>
        </div>
      </div>

      {/* Directions Panel */}
      {directionsVisible && (
        <div
          className={cx(
            isPage
              ? "fixed top-5 right-5 z-999"
              : "absolute top-4 right-4 z-40",
            "bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 max-w-xs max-h-96 overflow-y-auto transition-all duration-300",
            directionsMinimized
              ? isPage
                ? "translate-x-[280px]"
                : "translate-x-[260px]"
              : "translate-x-0"
          )}
        >
          <button
            onClick={() => setDirectionsMinimized(!directionsMinimized)}
            className="absolute top-2 left-2 w-8 h-8 bg-[#fd6b1c] text-white rounded-full flex items-center justify-center hover:bg-[#e35a00] text-base font-bold leading-none shadow-md"
            title={directionsMinimized ? "Tampilkan" : "Sembunyikan"}
          >
            {directionsMinimized ? ">>" : "<<"}
          </button>
          <div
            className="mt-6"
            dangerouslySetInnerHTML={{ __html: directionsContent }}
          />
        </div>
      )}

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" id="mymap">
        {!leafletLoaded && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">Loading map...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maps;
