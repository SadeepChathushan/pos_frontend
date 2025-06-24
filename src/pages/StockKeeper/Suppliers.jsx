import React, { useState } from "react";
import { FiSearch, FiUser, FiX,FiChevronDown } from "react-icons/fi";

export default function SupplierManagement() {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const suppliers = [
    { id: "SUP001", name: "ABC Traders", email: "abc@traders.com", phone: "0771234567", address: "Colombo" },
    { id: "SUP002", name: "XYZ Suppliers", email: "xyz@sup.com", phone: "0712345678", address: "Galle" },
  ];

  const filtered = suppliers.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* Top bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Supplier Management</h1>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <FiUser className="w-6 h-6 text-gray-700" />
                <span className="text-gray-700 font-medium">Ms. Lakshi</span>
              </div>
            </div>
      
            {/* Search + Buttons */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-4 space-y-4 md:space-y-0">
              {/* Search box */}
              <div className="relative w-full md:w-5/6">
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
      
              {/* Add Supplier  */}
              <div className="flex flex-col md:flex-row md:justify-end items-center space-y-3 md:space-y-0 md:space-x-3 mt-4">
                <button
                  // onClick={() => console.log("Add Order")}
                  onClick={() => setShowModal(true)}
                  className="btn-size w-40 px-4 py-2 bg-[#DD9F52] text-white rounded-lg hover:bg-orange-500 transition"
                >
                  + Add Supplier
                </button>
                {/* Modal Component */}
                {showModal && <AddSupplierModal onClose={() => setShowModal(false)} />}
                
                
              </div>
            </div>

      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-[#1C3F50] text-white">
            <tr>
              {["ID", "Name", "Email", "Phone", "Address"].map((col) => (
                <th key={col} className="px-4 py-3 font-medium">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="px-4 py-2">{s.id}</td>
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.email}</td>
                  <td className="px-4 py-2">{s.phone}</td>
                  <td className="px-4 py-2">{s.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No suppliers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && <AddSupplierModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function AddSupplierModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-[#21414d] hover:bg-red-600 rounded-full p-1"
          title="Close"
        >
          <FiX className="w-5 h-5" />
        </button> */}

        <h2 className="text-xl font-bold mb-4 text-center bg-[#8DA1AF] py-2 rounded-t-lg">Add Supplier</h2>

        <form className="space-y-4">
          {["Name", "Email", "Phone", "Address"].map((label) => (
            <div key={label} className="flex items-center gap-4">
              <label className="w-24 text-right">{label} :</label>
              <input className="flex-1 p-2 bg-[#BED0DB] rounded" placeholder={label} />
            </div>
          ))}

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#DD9F52] text-white px-6 py-2 rounded-lg hover:bg-orange-500"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="bg-[#47EB73] text-white px-6 py-2 rounded-lg hover:bg-green-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
