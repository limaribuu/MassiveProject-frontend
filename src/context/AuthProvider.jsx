import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const raw = localStorage.getItem("demo_user");
        if (raw) setUser(JSON.parse(raw));
    }, []);

    function login(nextUser) {
        setUser(nextUser);
        localStorage.setItem("demo_user", JSON.stringify(nextUser));
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("demo_user");
    }

    const value = { user, login, logout };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
