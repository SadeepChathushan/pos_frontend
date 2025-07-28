import React, { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";            // ← default import
import { authService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const { sub: email, role, userId } = jwtDecode(token);
        return { email, role, userId };
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
    return null;
  });

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    // keep the role exactly as the backend sent it (e.g. "STOCKKEEPER")
    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);

    const { sub } = jwtDecode(data.token);
    setUser({ email: sub, role: data.role, userId: data.userId });
    return data.role;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
