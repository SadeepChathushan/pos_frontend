// src/pages/StockKeeper/Dashboard.jsx

import React from "react";
import {
  FiUser,
  FiSearch,
  FiBell,
  FiPackage,
  FiCheckCircle,
  FiXCircle,
  FiRepeat,
} from "react-icons/fi";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const metrics = [
  {
    title: "Total SKUs",
    value: 1248,
    icon: <FiPackage className="w-6 h-6 text-white" />,
    gradient: "from-purple-500 to-purple-400",
  },
  {
    title: "In Stock",
    value: 1024,
    icon: <FiCheckCircle className="w-6 h-6 text-white" />,
    gradient: "from-green-500 to-green-400",
  },
  {
    title: "Out of Stock",
    value: 87,
    icon: <FiXCircle className="w-6 h-6 text-white" />,
    gradient: "from-red-500 to-red-400",
  },
  {
    title: "Returns",
    value: 37,
    icon: <FiRepeat className="w-6 h-6 text-white" />,
    gradient: "from-yellow-500 to-yellow-400",
  },
];

const areaData = [
  { day: "Mon", in: 30, out: 12 },
  { day: "Tue", in: 45, out: 20 },
  { day: "Wed", in: 35, out: 18 },
  { day: "Thu", in: 50, out: 25 },
  { day: "Fri", in: 40, out: 15 },
  { day: "Sat", in: 60, out: 30 },
  { day: "Sun", in: 55, out: 22 },
];

const pieData = [
  { name: "Stationery", value: 400 },
  { name: "Electronics", value: 300 },
  { name: "Consumables", value: 200 },
  { name: "Accessories", value: 148 },
];
const PIE_COLORS = ["#8B5CF6", "#10B981", "#F97316", "#E11D48"];

const recentOrders = [
  { id: "P12", date: "2025/06/15", supplier: "ABC Traders", amount: 18500 },
  { id: "P11", date: "2025/06/13", supplier: "XYZ Supplies", amount: 9200 },
  { id: "P10", date: "2025/06/10", supplier: "MegaSupply", amount: 12750 },
];

export default function Dashboard() {
  return (
    <div className=" bg-[#BED0DB]  space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          StockKeeper Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiSearch className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-purple-300 outline-none"
            />
          </div>
          {/* <FiBell className="w-6 h-6 text-gray-600 hover:text-gray-800" /> */}
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow">
            <FiUser className="w-6 h-6 text-gray-600" />
            <span className="text-gray-800 font-medium">Ms. Lakshi</span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div
            key={m.title}
            className={`bg-gradient-to-br ${m.gradient} p-5 rounded-2xl shadow-lg transform hover:scale-105 transition`}
          >
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-30 rounded-full">
                {m.icon}
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-white">
                  {m.value.toLocaleString()}
                </p>
                <p className="text-white opacity-75">{m.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Weekly Stock Flow
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="gradIn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradOut" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E11D48" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#E11D48" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#E5E7EB" strokeDasharray="4 4" />
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="in"
                stroke="#8B5CF6"
                fill="url(#gradIn)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="out"
                stroke="#E11D48"
                fill="url(#gradOut)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Category Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
              >
                {pieData.map((entry, idx) => (
                  <Cell key={entry.name} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Purchase Orders
        </h2>
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              {["Order ID", "Date", "Supplier", "Amount"].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-sm font-medium text-gray-600"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr
                key={o.id}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{o.id}</td>
                <td className="px-4 py-3">{o.date}</td>
                <td className="px-4 py-3">{o.supplier}</td>
                <td className="px-4 py-3">Rs. {o.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
