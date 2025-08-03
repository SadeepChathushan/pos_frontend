import api from "../api/axios";

export const authService = {
  login: (email, password) =>
    api.post("/auth/login", { email, password }).then((res) => res.data),

  logout: () => {
    localStorage.removeItem("access_token");
    // refresh cookie will expire on server path or via backend logout if implemented
  },
};
