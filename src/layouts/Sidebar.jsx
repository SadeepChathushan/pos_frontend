import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Package,
  ShoppingCart,
  ClipboardList,
  Boxes,
  Repeat,
  Settings,
  LogOut,
  Users,
  UserCog,
  ClipboardCheck,
  BarChart2,
} from "lucide-react";

const Sidebar = ({ userRole }) => {
  return (
    <div className="flex flex-col w-64 min-h-screen text-white">
      {/* Top title bar */}
      <div className="bg-[#1C3F50] py-4 px-4 text-xl font-semibold text-center">
        POS System
      </div>

      {/* Sidebar content */}
      <div className="flex-1 bg-gradient-to-b from-[#2B576D] to-[#1C3F50] p-6">
        <nav className="flex flex-col space-y-4">
          {/* Role Based Links */}
          {userRole === "cashier" && (
            <>
              <Link
                to="/cashier/dashboard"
                className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
              >
                <LayoutDashboard size={20} />
                <span className="text-lg">Dashboard</span>
              </Link>
              <Link
                to="/cashier/billing"
                className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
              >
                <FileText size={20} />
                <span className="text-lg">Billing</span>
              </Link>
              <Link
                to="/cashier/customer-history"
                className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
              >
                <ShoppingCart size={20} />
                <span className="text-lg">Customers</span>
              </Link>
            </>
          )}

          {userRole === "admin" && (
            <>
              <Link
                to="admin/dashboard"
                className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
              >
                <LayoutDashboard size={20} />
                <span className="text-lg">Dashboard</span>
              </Link>
              <Link
                to="/admin/employees"
                className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
              >
                <UserCog size={20} />
                <span className="text-lg">Employees</span>
              </Link>
              <Link
                to="/admin/usermanagement"
                className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
              >
                <Users size={20} />
                <span className="text-lg">User Management</span>
              </Link>
              
              <Link
                to="/admin/attendance"
                className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
              >
                <Users size={20} />
                <span className="text-lg">Attendance</span>
              </Link>
            </>
          )}

          {userRole === "stockkeeper" && (
            <>
              <Link
                to="/stockkeeper/dashboard"
                className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
              >
                <ClipboardCheck size={20} />
                <span className="text-lg">Dashboard</span>
              </Link>
              <Link
                to="/stockkeeper/purchaseorder"
                className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
              >
                <Boxes size={20} />
                <span className="text-lg">Purchase Order</span>
              </Link>
              <Link
            to="/stockkeeper/randomdelivery"
            className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
          >
            <Package size={20} />
            <span className="text-lg">Random delivery</span>
          </Link>
          <Link
            to="/stockkeeper/grn"
            className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
          >
            <ClipboardList size={20} />
            <span className="text-lg">GRN</span>
          </Link>
          <Link
            to="/stockkeeper/inventory"
            className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
          >
            <Boxes size={20} />
            <span className="text-lg">Inventory</span>
          </Link>
          <Link
            to="/stockkeeper/return-expire"
            className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
          >
            <Repeat size={20} />
            <span className="text-lg">Return & Expire</span>
          </Link>
            </>
          )}

          {/* Static Links */}
          
          

          <div className="pt-6 mt-auto space-y-4 border-t border-white/30">
            <Link
              to="/settings"
              className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
            >
              <Settings size={20} />
              <span className="text-lg">Settings</span>
            </Link>
            <Link
              to="/logout"
              className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
            >
              <LogOut size={20} />
              <span className="text-lg">Log Out</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
