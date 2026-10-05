import axios from "axios";

// URL del backend, definida en VITE_API_URL (ver .env.example)
export const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        console.log(
            `${config.method?.toUpperCase()} -> ${config.url}`
        );

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;