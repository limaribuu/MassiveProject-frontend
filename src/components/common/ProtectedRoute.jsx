import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({ children }) {
    const location = useLocation();
    const { user, token, isAuthReady } = useAuth();

    if (!isAuthReady) {
        return (
            <div style={{ padding: 24 }}>
                <p>Memuat sesi...</p>
            </div>
        );
    }

    const isAuthed = !!token && !!user;

    if (!isAuthed) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname + location.search }}
            />
        );
    }

    return children;
}
