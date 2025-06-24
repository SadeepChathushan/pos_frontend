// src/pages/StockKeeper/Inventory.jsx

import React, { useState } from "react";
import { FiSearch, FiChevronDown, FiUser } from "react-icons/fi";

const sampleData = [
  {
    stock: "S01",
    productName: "hvhfjf",
    batchNumber: 90,
    stockStatus: true,            // true = In (green), false = Out (red)
    showroomQuantity: "In",
  },
  {
    stock: "S02",
    productName: "dbfghghf",
    batchNumber: 39,
    stockStatus: false,
    showroomQuantity: "Out",
  },
];

export default function Inventory() {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);           // which row is being edited
  const [showroomQty, setShowroomQty] = useState("");     // temp value for modal input
  const [showSuccess, setShowSuccess] = useState(false);  // toast visibility

  // Filter by productName
  const filtered = sampleData.filter((item) =>
    item.productName.toLowerCase().includes(query.toLowerCase())
  );

  const handleShowroomSave = () => {
    console.log("Saving showroom qty", editing.stock, showroomQty);
    // here you would update your data source...
    setEditing(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Shared button classes
  const btn =
    "h-10 px-4 text-sm font-medium rounded-lg flex items-center justify-center transition";

  return (
    <div className="bg-[#BED0DB] ">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          Showroom quantity updated successfully!
        </div>
      )}

      {/* Showroom Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h3 className="text-xl font-semibold mb-4">
              Update Showroom Qty for {editing.productName}
            </h3>
            <label className="block text-gray-700 mb-2">Showroom Quantity</label>
            <input
              type="text"
              value={showroomQty}
              onChange={(e) => setShowroomQty(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-[#1C3F50] outline-none"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-[#DD9F52] text-white rounded-lg hover:bg-orange-500 transition btn-size"
              >
                Cancel
              </button>
              <button
                onClick={handleShowroomSave}
                className="px-4 py-2 bg-[#28D556] text-white rounded-lg hover:bg-green-500 transition btn-size"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Inventory</h1>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <FiUser className="w-6 h-6 text-gray-700" />
          <span className="text-gray-700 font-medium">Ms. Lakshi</span>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative w-full md:w-1/2">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search By product Name"
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
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Product Name</th>
              <th className="px-4 py-3 text-left">Batch Number</th>
              <th className="px-4 py-3 text-left">Stock Quantity</th>
              <th className="px-4 py-3 text-left">Showroom Quantity</th>
              <th className="px-4 py-3 text-left">Showroom Update</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <tr key={item.stock} className="border-b border-gray-300">
                  <td className="px-4 py-2 text-gray-700">{item.stock}</td>
                  <td className="px-4 py-2 text-gray-700">{item.productName}</td>
                  <td className="px-4 py-2 text-gray-700">{item.batchNumber}</td>
                  <td className="px-4 py-2 flex items-center">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        item.stockStatus ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                  </td>
                  <td className="px-4 py-2 text-gray-700">{item.showroomQuantity}</td>
                  <td className="px-4 py-2">
                    <button
                      className={`${btn} bg-[#DD9F52] text-white hover:bg-orange-500 btn-size`}
                      onClick={() => {
                        setEditing(item);
                        setShowroomQty(item.showroomQuantity);
                      }}
                    >
                      Showroom In
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
