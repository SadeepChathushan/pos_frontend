// src/pages/StockKeeper/ReturnExpireGoods.jsx

import React, { useState } from "react";
import { FiSearch, FiChevronDown, FiUser } from "react-icons/fi";

const sampleData = [
  {
    orderId: "G01",
    itemId: "001",
    deliveredDate: "2025/03/09",
    returnDate: "2025/03/15",
    previousBatch: "wetery",
    latestBatch: "2400",
  },
  {
    orderId: "G02",
    itemId: "002",
    deliveredDate: "2025/03/10",
    returnDate: "2025/03/16",
    previousBatch: "fghth",
    latestBatch: "2400",
  },
];

export default function ReturnExpireGoods() {
  const [query, setQuery] = useState("");

  const filtered = sampleData.filter((row) =>
    row.orderId.toLowerCase().includes(query.toLowerCase()) ||
    row.itemId.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className=" bg-[#BED0DB] ">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Return & Expire Goods
        </h1>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <FiUser className="w-6 h-6 text-gray-700" />
          <span className="text-gray-700 font-medium">Ms. Lakshi</span>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative w-full md:w-4/4">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order ID or Item ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-lg bg-white placeholder-gray-400 focus:outline-none"
          />
          <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#1C3F50] text-white text-sm">
              {[
                "Order ID",
                "Item ID",
                "Delivered Date",
                "Return Date",
                "Previous Batch No",
                "Latest Batch No",
              ].map((col) => (
                <th key={col} className="px-4 py-3 text-left">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((row) => (
                <tr key={row.orderId} className="border-b border-gray-300">
                  <td className="px-4 py-2 text-gray-700">{row.orderId}</td>
                  <td className="px-4 py-2 text-gray-700">{row.itemId}</td>
                  <td className="px-4 py-2 text-gray-700">{row.deliveredDate}</td>
                  <td className="px-4 py-2 text-gray-700">{row.returnDate}</td>
                  <td className="px-4 py-2 text-gray-700">{row.previousBatch}</td>
                  <td className="px-4 py-2 text-gray-700">{row.latestBatch}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
