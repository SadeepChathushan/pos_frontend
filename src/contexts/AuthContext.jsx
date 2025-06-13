// src/contexts/AuthContext.jsx
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Example: { name: "Sam", role: "admin" }

  const login = (userData) => {
    setUser(userData); // E.g., { name: "Sam", role: "admin" }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
