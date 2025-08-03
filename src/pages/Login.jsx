import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../assets/bg_image.jpg";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const role = await login(email, password);
      // Redirect based on role
      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "CASHIER") navigate("/cashier/billing");
      else if (role === "STOCKKEEPER") navigate("/stockkeeper/dashboard");
      else navigate("/login");
    } catch (err) {
      alert(`Login failed: ${err.message}`);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black opacity-80" />

      <div className="relative z-10 flex flex-col items-center justify-between w-full max-w-5xl p-6 space-y-8 md:space-y-0 md:flex-row">
        {/* left panel */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left md:w-1/2">
          <img src={logo} alt="Logo" className="w-64 mb-1 md:w-100" />
          <h1 className="mt-3 font-serif text-4xl italic text-white">
            WELCOME POS SYSTEM
          </h1>
          <p className="mt-3 text-lg italic text-gray-300">
            Empowering Retail, One Transaction at a Time
          </p>
        </div>

        {/* right panel */}
        <div className="w-full p-8 md:w-1/2 ">
          <h2 className="mb-6 text-3xl font-bold text-center text-white">
            LOGIN
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-200">
                E mail Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-[#1C3F50] text-white rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-[#1C3F50] text-white rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-300">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 mr-2 text-teal-500 bg-white rounded"
                />
                Keep me logged in
              </label>
              <Link
                to="/forgot-password"
                className="underline hover:text-white"
              >
                Forget password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2 text-lg font-semibold text-white bg-[#1C3F50] rounded-lg hover:bg-teal-500 transition"
            >
              LOGIN
            </button>
          </form>

          <p className="mt-4 text-center text-gray-300">
            Not registered yet?{" "}
            <Link to="/register" className="underline hover:text-white">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
