import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL; // e.g. "http://localhost:8082"

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,                 // send HttpOnly cookie on each request
  headers: { "Content-Type": "application/json" },
});

// Attach access token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (
    token &&
    !config.url?.endsWith("/auth/login") &&
    !config.url?.endsWith("/auth/refresh") &&
    !config.url?.endsWith("/auth/user-register")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401: try refresh once, otherwise force logout
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const orig = error.config;
    if (
      error.response?.status === 401 &&
      !orig._retry &&
      !orig.url?.endsWith("/auth/login") &&
      !orig.url?.endsWith("/auth/refresh")
    ) {
      orig._retry = true;
      try {
        // refresh endpoint reads HttpOnly cookie automatically
        const { data } = await api.post("/auth/refresh", {});
        // data.token is the new access token
        localStorage.setItem("access_token", data.token);
        orig.headers.Authorization = `Bearer ${data.token}`;
        return api(orig);
      } catch {
        // if refresh fails, clear and redirect
        localStorage.removeItem("access_token");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
