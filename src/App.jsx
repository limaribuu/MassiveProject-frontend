import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import Destinasi from "./pages/Destinasi.jsx";
import Ulasan from "./pages/Ulasan.jsx";
import TambahRating from "./pages/TambahRating.jsx";
import Itinerary from "./pages/Itinerary.jsx";
import HiddenGem from "./pages/HiddenGem.jsx";
import Populer from "./pages/Populer.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Forgot from "./pages/Forgot.jsx";
import Profile from "./pages/Profile.jsx";
import RencanaPelesir from "./pages/rencanapelesir.jsx";
import EditRencana from "./pages/editrencana.jsx";
import DeleteItinerary from "./pages/deleteitinerary.jsx";

import AuthProvider from "./context/AuthProvider.jsx";
import FavoritesProvider from "./context/FavoritesProvider.jsx";

export default function App() {
    return (
        <AuthProvider>
            <FavoritesProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot" element={<Forgot />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/destinasi" element={<Destinasi />} />
                    <Route path="/itinerary" element={<Itinerary />} />
                    <Route path="/hidden-gem" element={<HiddenGem />} />
                    <Route path="/populer" element={<Populer />} />
                    <Route path="/ulasan" element={<Ulasan />} />
                    <Route path="/ulasan/tambah-rating" element={<TambahRating />} />
                    <Route path="/profil" element={<Profile />} />
                    <Route path="/rencana-pelesir" element={<RencanaPelesir />} />
                    <Route path="/edit-rencana" element={<EditRencana />} />
                    <Route path="/delete-itinerary" element={<DeleteItinerary />} />
                    <Route path="/detail/:slug" element={<Detail />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </FavoritesProvider>
        </AuthProvider>
    );
}
