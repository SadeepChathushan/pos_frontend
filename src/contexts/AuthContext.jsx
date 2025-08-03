import React, { createContext, useState, useContext } from "react";
import {jwtDecode} from "jwt-decode";
import { authService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage token if present
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const { sub: email, role, userId } = jwtDecode(token);
        return { email, role, userId };
      } catch {
        localStorage.removeItem("access_token");
      }
    }
    return null;
  });

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    // backend set refreshToken cookie; we store only access token
    localStorage.setItem("access_token", data.token);
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
