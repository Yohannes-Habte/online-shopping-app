// src/api/apiClient.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor to attach token for protected endpoints
api.interceptors.request.use(
  (config) => {
    // Only attach token if explicitly required
    if (config.requiresAuth) {
      const token = localStorage.getItem("authToken"); // or from context/Redux
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
