import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Users,
  UserCog,
  ClipboardCheck,
  Boxes,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = ({ userRole }) => (
  <div className="fixed top-0 left-0 z-50 w-64 h-screen bg-gradient-to-b from-[#2B576D] to-[#1C3F50] text-white flex flex-col justify-between p-6">
    <div>
      <div className="px-4 py-4 text-xl font-semibold text-center">POS System</div>
      <nav className="space-y-4">
        {userRole === "CASHIER" && (
          <>
            <NavLink to="/cashier/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
            <NavLink to="/cashier/billing" icon={<FileText />} label="Billing" />
            <NavLink to="/cashier/customer-history" icon={<ShoppingCart />} label="Customers" />
          </>
        )}
        {userRole === "ADMIN" && (
          <>
            <NavLink to="/admin/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
            <NavLink to="/admin/employee" icon={<UserCog />} label="Employees" />
            <NavLink to="/admin/usermanagement" icon={<Users />} label="User Management" />
            <NavLink to="/admin/attendance" icon={<Users />} label="Attendance" />
          </>
        )}
        </nav>
    </div>

    <div className="pt-6 space-y-4 border-t border-white/30">
      <NavLink to="/settings" icon={<Settings />} label="Settings" />
      <NavLink to="/login" icon={<LogOut />} label="Log Out" />
    </div>
  </div>
);

const NavLink = ({ to, icon, label }) => (
  <Link to={to} className="hover:bg-[#3A4A5E] p-3 rounded-md flex items-center space-x-3">
    {React.cloneElement(icon, { size: 20 })}
    <span className="text-lg">{label}</span>
  </Link>
);

export default Sidebar;

        // {userRole === "STOCKKEEPER" && (
        //   <>
        //     <NavLink to="/stockkeeper/dashboard" icon={<ClipboardCheck />} label="Dashboard" />
        //     <NavLink to="/stockkeeper/purchaseorder" icon={<Boxes />} label="Purchase Order" />
        //     {/* add more stockkeeper links here */}
        //   </>
        // )}
      