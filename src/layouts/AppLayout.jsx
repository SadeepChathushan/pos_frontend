// src/layouts/AppLayout.jsx

import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = ({ userRole }) => {
  return (
    <div className="flex h-screen">
      <Sidebar userRole={userRole} />
      <div className="flex-1 p-6">
        {/* Render the nested routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
