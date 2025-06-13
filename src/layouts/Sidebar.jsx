import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ userRole }) => {
  return (
    <div className="w-64 bg-[#2D3E50] text-white p-6 flex flex-col">
      <h2 className="text-2xl font-semibold mb-12 text-center">POS System</h2>

      <nav className="flex flex-col space-y-6">
        {/* Common Links for All Users */}
        <Link
          to="/dashboard"
          className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-2"
        >
          <span className="text-lg">Dashboard</span>
        </Link>

        {/* Role-Based Links */}
        {userRole === "cashier" && (
          <>
            <Link
              to="/cashier/dashboard"
              className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-2"
            >
              <span className="text-lg">Cashier Dashboard</span>
            </Link>
            <Link
              to="/cashier/transactions"
              className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-2"
            >
              <span className="text-lg">Transactions</span>
            </Link>
            <Link
              to="/cashier/sales"
              className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-2"
            >
              <span className="text-lg">Sales</span>
            </Link>
            <Link
              to="/cashier/reports"
              className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-2"
            >
              <span className="text-lg">Reports</span>
            </Link>
          </>
        )}

        {userRole === "admin" && (
          <>
            <Link
              to="/admin"
              className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-2"
            >
              <span className="text-lg">Admin Panel</span>
            </Link>
            <Link
              to="/admin/manage-users"
              className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-2"
            >
              <span className="text-lg">Manage Users</span>
            </Link>
          </>
        )}

        {userRole === "stockkeeper" && (
          <>
            <Link
              to="/stockkeeper"
              className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-2"
            >
              <span className="text-lg">Stock Overview</span>
            </Link>
            <Link
              to="/stockkeeper/manage-stock"
              className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-2"
            >
              <span className="text-lg">Manage Stock</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
