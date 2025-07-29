// src/services/authService.js
import api from "../api/axios";

export const authService = {
  /**
   * call POST /login
   * body: { email, password }
   * returns your backend JSON
   */
  login: (email, password) =>
    api.post("/auth/login", { email, password }).then((res) => res.data),

  /**
   * clear tokens
   */
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  /**
   * (used by axios interceptor)
   */
  refresh: (refreshToken) =>
    api.post("/auth/refresh", { refreshToken }).then((res) => res.data),
};
