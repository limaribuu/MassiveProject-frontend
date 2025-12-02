const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const BACKEND_BASE_URL =
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5000";

export { API_BASE_URL, BACKEND_BASE_URL };
