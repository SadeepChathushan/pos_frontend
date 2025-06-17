// src/pages/StockKeeper/GoodsReceivedNote.jsx

import React, { useState } from "react";
import { FiSearch, FiChevronDown, FiUser } from "react-icons/fi";

const sampleData = [
  {
    grn: "G01",
    orderId: "O01",
    itemId: "001",
    name: "Pens",
    returnItems: "wetery",
    paidAmount: 2400,
    payableAmount: 1000,
  },
  {
    grn: "G02",
    orderId: "O02",
    itemId: "001",
    name: "Book",
    returnItems: "fghth",
    paidAmount: 2400,
    payableAmount: 1000,
  },
];

export default function GoodsReceivedNote() {
  const [data, setData] = useState(sampleData);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const filtered = data.filter(
    (row) =>
      row.grn.toLowerCase().includes(query.toLowerCase()) ||
      row.name.toLowerCase().includes(query.toLowerCase()) ||
      row.itemId.toLowerCase().includes(query.toLowerCase())
  );

  const handleSave = (updatedRow) => {
    setData((all) =>
      all.map((r) => (r.grn === updatedRow.grn ? updatedRow : r))
    );
    setEditing(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const btn = "h-10 px-4 text-sm font-medium rounded-lg flex items-center justify-center";

  return (
    <div className=" bg-[#BED0DB]">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          Updated successfully!
        </div>
      )}

      {/* Top bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Good Received Note
        </h1>
        <div className="flex items-center text-gray-700 mt-3 md:mt-0">
          <FiUser className="w-6 h-6 mr-2" />
          <span className="font-medium">Ms. Lakshi</span>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative w-full md:w-4/4">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by GRN ID, Name or Item ID"
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
            <tr className="bg-[#1C3F50] text-white">
              {[
                "GRN ID",
                "Order ID",
                "Item ID",
                "Name Of Good",
                "Return Items",
                "Paid Amount",
                "Payable Amount",
                "Update",
              ].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-sm font-medium"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((row) => (
                <tr key={row.grn} className="border-b border-gray-300">
                  <td className="px-4 py-2 text-gray-700">{row.grn}</td>
                  <td className="px-4 py-2 text-gray-700">{row.orderId}</td>
                  <td className="px-4 py-2 text-gray-700">{row.itemId}</td>
                  <td className="px-4 py-2 text-gray-700">{row.name}</td>
                  <td className="px-4 py-2 text-gray-700">{row.returnItems}</td>
                  <td className="px-4 py-2 text-gray-700">{row.paidAmount}</td>
                  <td className="px-4 py-2 text-gray-700">{row.payableAmount}</td>
                  <td className="px-4 py-2">
                    <button
                      className={`${btn} bg-[#DD9F52] text-white hover:bg-orange-500 btn-size`}
                      onClick={() => setEditing(row)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              Update GRN {editing.grn}
            </h3>

            <div className="space-y-3">
              {[
                { label: "Return Items", key: "returnItems" },
                { label: "Paid Amount",  key: "paidAmount",  type: "number" },
                { label: "Payable Amount", key: "payableAmount", type: "number" },
              ].map(({ label, key, type = "text" }) => (
                <div key={key}>
                  <label className="block text-gray-700 mb-1">{label}</label>
                  <input
                    type={type}
                    value={editing[key]}
                    onChange={(e) =>
                      setEditing({ ...editing, [key]: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C3F50] outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-[#DD9F52] text-white rounded-lg hover:bg-orange-500 transition btn-size"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave(editing)}
                className="px-4 py-2 bg-[#47EB73] text-white rounded-lg hover:bg-green-500 transition btn-size"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
