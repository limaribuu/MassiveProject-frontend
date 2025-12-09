// src/config/api.js
const isDev = import.meta.env.DEV;

export const API_BASE_URL = isDev
  ? "http://localhost:5000/api"
  : "https://api-pelesirpalembang.infinitelearningstudent.id/api";

export const BACKEND_BASE_URL = isDev
  ? "http://localhost:5000"
  : "https://api-pelesirpalembang.infinitelearningstudent.id";
