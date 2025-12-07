import React, { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

const USER_KEY = "demo_user";
const TOKEN_KEY = "token";

function readAuthFromStorage() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      localStorage.removeItem(USER_KEY);
      return { user: null, token: null };
    }

    const rawUser = localStorage.getItem(USER_KEY);
    const user = rawUser ? JSON.parse(rawUser) : null;

    return { user, token };
  } catch {
    return { user: null, token: null };
  }
}

export default function AuthProvider({ children }) {
  const [state, setState] = useState(() => {
    const { user, token } = readAuthFromStorage();
    return {
      user,
      token,
      isAuthReady: true,
    };
  });

  function login(payload) {
    const nextUser = payload?.user ?? payload;
    const nextToken = payload?.token ?? localStorage.getItem(TOKEN_KEY) ?? null;

    setState({ user: nextUser ?? null, token: nextToken, isAuthReady: true });

    try {
      if (nextToken) localStorage.setItem(TOKEN_KEY, nextToken);
      if (nextUser) localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    } catch {
    }
  }

  function logout() {
    setState({ user: null, token: null, isAuthReady: true });
    try {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    } catch {
    }
  }

  const value = useMemo(() => {
    return {
      user: state.user,
      token: state.token,
      isAuthReady: state.isAuthReady,
      isLoggedIn: !!state.token && !!state.user,
      login,
      logout,
    };
  }, [state.user, state.token, state.isAuthReady]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
