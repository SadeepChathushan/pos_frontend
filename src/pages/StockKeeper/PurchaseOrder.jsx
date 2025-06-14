// src/pages/StockKeeper/PurchaseOrder.jsx

import React, { useState } from "react";
import { FiSearch, FiChevronDown, FiUser } from "react-icons/fi";
import AddOrderModal from "../../Components/PurchaseOrder/AddOrderModal";
import AddItemModal from "../../Components/PurchaseOrder/AddItemModal";
import GRNModal from "../../Components/PurchaseOrder/GRNModal";


const sampleData = [
  { id: "P01", date: "2025/03/09", name: "Mr. Jagath", amount: 12000, paid: false },
  { id: "P02", date: "2025/03/09", name: "Mr. Jagath", amount: 12000, paid: true  },
];

export default function PurchaseOrder() {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false); 
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showGRNModal, setShowGRNModal]=useState(false);




  const filtered = sampleData.filter(
    (po) =>
      po.id.toLowerCase().includes(query.toLowerCase()) ||
      po.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div >
      {/* Top bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Purchase Order</h1>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <FiUser className="w-6 h-6 text-gray-700" />
          <span className="text-gray-700 font-medium">Ms. Lakshi</span>
        </div>
      </div>

      {/* Search + Buttons */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-4 space-y-4 md:space-y-0">
        {/* Search box */}
        <div className="relative w-full md:w-2/3">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search By ID, Name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-lg bg-white placeholder-gray-400 focus:outline-none"
          />
          <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Add Order / Add Item */}
        <div className="flex space-x-3">
          <button
            // onClick={() => console.log("Add Order")}
            onClick={() => setShowModal(true)}
            className="btn-size px-4 py-2 bg-[#DD9F52] text-white rounded-lg hover:bg-orange-500 transition"
          >
            + Add Order
          </button>
          {/* Modal Component */}
          {showModal && <AddOrderModal onClose={() => setShowModal(false)} />}
          <button
             onClick={() => setShowAddItemModal(true)}
            className="btn-size px-4 py-2 bg-[#10A1A3] text-white rounded-lg hover:bg-[#25CB51] transition"
          >
            + Add Item
          </button>
           {showAddItemModal && (
        <AddItemModal onClose={() => setShowAddItemModal(false)} />
      )}
          
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#1C3F50] text-white">
              {["ID", "Date", "Name", "Amount", "Paid Or Unpaid", "View order details", "Add GRN"].map(
                (col) => (
                  <th key={col} className="px-4 py-3 text-left text-sm font-medium">
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((po) => (
                <tr key={po.id} className="border-b border-gray-300">
                  <td className="px-4 py-2 text-gray-700">{po.id}</td>
                  <td className="px-4 py-2 text-gray-700">{po.date}</td>
                  <td className="px-4 py-2 text-gray-700">{po.name}</td>
                  <td className="px-4 py-2 text-gray-700">{po.amount}</td>
                  <td className="px-4 py-2 flex items-center space-x-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        po.paid ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span className="text-gray-700 text-sm px-4 py-2">
                      {po.paid ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="btn-size px-3 py-1 bg-[#4285F4] text-white rounded-full text-sm hover:bg-blue-600 transition">
                      View
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button 
                     onClick={() => setShowGRNModal(true)}
                    className="btn-size px-3 py-1 bg-[#B073C6] text-white rounded-full text-sm hover:bg-purple-500 transition">
                      Add To GRN
                    </button>
                    {showGRNModal && (
                    <GRNModal onClose={() => setShowGRNModal(false)} />
                    )}

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  No purchase orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
