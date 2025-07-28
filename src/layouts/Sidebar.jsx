import React, { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";

const Sidebar = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating Menu Icon (Mobile Only) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 right-4 z-50 bg-[#1C3F50] text-white p-2 rounded-full shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
        ></div>
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 w-64 h-screen bg-gradient-to-b from-[#2B576D] to-[#1C3F50] text-white transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex md:flex-col`}
      >
        {/* Title (Desktop Only) */}
        <div className="hidden md:block bg-[#1C3F50] py-4 px-4 text-xl font-semibold text-center">
          POS System
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col justify-between h-full p-6">
          <nav className="space-y-4">
            {userRole === "cashier" && (
              <>
                <NavLink to="/cashier/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
                <NavLink to="/cashier/billing" icon={<FileText />} label="Billing" />
                <NavLink to="/cashier/customer-history" icon={<ShoppingCart />} label="Customers" />
              </>
            )}
            {userRole === "admin" && (
              <>
                <NavLink to="/admin/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
                <NavLink to="/admin/employee" icon={<UserCog />} label="Employees" />
                <NavLink to="/admin/usermanagement" icon={<Users />} label="User Management" />
                <NavLink to="/admin/attendance" icon={<Users />} label="Attendance" />
              </>
            )}
            {userRole === "stockkeeper" && (
              <>
                <NavLink to="/stockkeeper/dashboard" icon={<ClipboardCheck />} label="Dashboard" />
                <NavLink to="/stockkeeper/purchaseorder" icon={<Boxes />} label="Purchase Order" />
                {/* <NavLink to="/stockkeeper/randomdelivery" icon={<Package />} label="Random delivery" /> */}
                {/* <NavLink to="/stockkeeper/grn" icon={<ClipboardList />} label="GRN" /> */}
                <NavLink to="/stockkeeper/inventory" icon={<Boxes />} label="Inventory" />
                <NavLink to="/stockkeeper/suppliers" icon={<ClipboardCheck />} label="Suppliers" />
                {/* <NavLink to="/stockkeeper/return-expire" icon={<Repeat />} label="Return & Expire" /> */}
              </>
            )}
          </nav>

          {/* Bottom Section */}
          <div className="pt-6 mt-6 space-y-4 border-t border-white/30">
            <NavLink to="/settings" icon={<Settings />} label="Settings" />
            <NavLink to="/login" icon={<LogOut />} label="Log Out" />
          </div>
        </div>
      </div>
    </>
  );
};

// NavLink Component
const NavLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3"
  >
    {React.cloneElement(icon, { size: 20 })}
    <span className="text-lg">{label}</span>
  </Link>
);

export default Sidebar;
