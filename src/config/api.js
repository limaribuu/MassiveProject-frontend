const isDev = import.meta.env.DEV;

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    (isDev
        ? "http://localhost:5000/api"
        : "https://api-pelesirpalembang.infinitelearningstudent.id/api");

const BACKEND_BASE_URL =
    import.meta.env.VITE_BACKEND_BASE_URL ||
    (isDev
        ? "http://localhost:5000"
        : "https://api-pelesirpalembang.infinitelearningstudent.id");

export { API_BASE_URL, BACKEND_BASE_URL };
