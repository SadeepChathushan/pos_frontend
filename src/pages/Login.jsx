// src/pages/Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUserRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded users
    const users = {
      admin: { email: "admin@example.com", password: "admin123" },
      cashier: { email: "cashier@example.com", password: "cashier123" },
      stockkeeper: { email: "stock@example.com", password: "stock123" },
    };

    // Match role by email & password
    for (const [role, creds] of Object.entries(users)) {
      if (email === creds.email && password === creds.password) {
        setUserRole(role);
        navigate(`/${role}/dashboard`);
        return;
      }
    }

    alert("Invalid credentials");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 scale-105 bg-center bg-cover filter blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full p-10 md:flex-row">
        <div className="p-6 mb-10 text-center text-white md:w-1/2 md:mb-0 md:text-left">
          <h1 className="font-bold text-8xl">WELCOME<br />ZIPMA<br />SALON</h1>
          <p className="mt-4 italic text-gray-300">Where Style Meets Simplicity</p>
        </div>

        <div className="w-full p-6 bg-black bg-opacity-50 rounded-lg md:w-1/2">
          <h2 className="mb-6 text-2xl font-semibold text-white">LOGIN</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-200">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 text-black bg-gray-200 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-200">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 text-black bg-gray-200 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
