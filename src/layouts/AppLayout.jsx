import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const userRole = user?.role;

  return (
    <div className="relative flex h-screen">
      {/* Desktop sidebar (fixed) */}
      <div className="hidden md:block">
        <Sidebar userRole={userRole} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-50 bg-[#1C3F50] w-64 h-full">
            <Sidebar userRole={userRole} />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 p-4 md:p-6 bg-[#BED0DB] w-full overflow-y-auto md:ml-64">
        {/* Mobile top bar toggle button */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <FiMenu className="w-6 h-6 text-gray-800" />
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
