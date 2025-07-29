import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FiMenu } from "react-icons/fi";

const AppLayout = ({ userRole }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen relative">
      {/* Sidebar for desktop */}
      {userRole !== "cashier" && (
        <div className="hidden md:block">
          <Sidebar userRole={userRole} />
        </div>
      )}

      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative z-50 bg-[#1C3F50] w-64 h-full">
            <Sidebar userRole={userRole} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 bg-[#BED0DB] w-full overflow-y-auto">
        {/* Mobile top bar */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button onClick={() => setSidebarOpen(true)}>
            <FiMenu className="w-6 h-6 text-gray-800" />
          </button>
          {/* <h1 className="font-bold text-lg text-gray-800">POS System</h1> */}
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
