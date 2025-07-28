// src/api/axios.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// for token refresh calls (no auth interceptor)
const refreshClient = axios.create({ baseURL });

// inject accessToken on every request
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");

  // List of public endpoints that should not get Authorization header
  const publicPaths = ["/auth/login", "/auth/refresh", "/auth/user-register"];
  const isPublic = publicPaths.some((path) => config.url?.includes(path));

  if (!isPublic && token) {
    config.headers.Authorization = `Bearer ${token}` ;
  }

  return config;
});

// on 401: try refresh once, else logout
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const orig = error.config;
    if (
      error.response?.status === 401 &&
      !orig._retry &&
      !orig.url.endsWith("/login") &&
      !orig.url.endsWith("/refresh")
    ) {
      orig._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await refreshClient.post("/refresh", {
            refreshToken,
          });
          localStorage.setItem("accessToken", data.token);
          localStorage.setItem("refreshToken", data.refreshToken);
          api.defaults.headers.Authorization = `Bearer ${data.token}`;
          orig.headers.Authorization = `Bearer ${data.token}`;
          return api(orig);
        } catch {
          // refresh failed
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
