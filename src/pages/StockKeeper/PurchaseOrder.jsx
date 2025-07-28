// Updated PurchaseOrder.jsx with working pagination and filters
import React, { useState } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import AddOrderModal from "../../Components/StockKeeper/AddOrderModal";
import AddItemModal from "../../Components/StockKeeper/AddItemModal";
import GRNModal from "../../Components/StockKeeper/GRNModal";
import ViewOrderModal from "../../Components/StockKeeper/ViewOrderModal";

const initialOrders = [
  { id: "P01", date: "2025-03-09", name: "Mr. Jagath", amount: 12000, paid: false },
  { id: "P02", date: "2025-03-09", name: "Ms. Kamala", amount: 25000, paid: true },
  { id: "P03", date: "2025-03-10", name: "Mr. Pathirana", amount: 15000, paid: false },
  { id: "P04", date: "2025-03-11", name: "Mrs. Silva", amount: 30000, paid: true },
  { id: "P05", date: "2025-03-12", name: "Mr. Bandara", amount: 8000, paid: false },
  { id: "P06", date: "2025-03-13", name: "Ms. Nisansala", amount: 9500, paid: true },
  { id: "P07", date: "2025-03-14", name: "Mr. Nuwan", amount: 18000, paid: false },
  { id: "P08", date: "2025-03-15", name: "Mr. Roshan", amount: 21000, paid: true },
  { id: "P09", date: "2025-03-16", name: "Mr. Gamage", amount: 16000, paid: false },
  { id: "P10", date: "2025-03-17", name: "Mrs. Kumari", amount: 27000, paid: true }
];

export default function PurchaseOrder() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showGRNModal, setShowGRNModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = orders.filter((po) => {
    const matchesQuery =
      po.id.toLowerCase().includes(query.toLowerCase()) ||
      po.name.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || (statusFilter === "Paid" && po.paid) || (statusFilter === "Unpaid" && !po.paid);
    const matchesMin = !minAmount || po.amount >= parseFloat(minAmount);
    const matchesMax = !maxAmount || po.amount <= parseFloat(maxAmount);
    const matchesFrom = !fromDate || new Date(po.date) >= new Date(fromDate);
    const matchesTo = !toDate || new Date(po.date) <= new Date(toDate);
    return matchesQuery && matchesStatus && matchesMin && matchesMax && matchesFrom && matchesTo;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddOrder = (newOrder) => {
    setOrders((prev) => [...prev, newOrder]);
  };

  const clearFilters = () => {
    setQuery("");
    setStatusFilter("All");
    setMinAmount("");
    setMaxAmount("");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
  };

  return (
    <div className="p-4 md:p-6 bg-[#BED0DB] min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Purchase Orders</h1>
        <div className="flex items-center space-x-2">
          <FiUser className="w-5 h-5 text-gray-700" />
          <span className="text-gray-700 font-medium">Ms. Lakshi</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID or Name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none"
            />
          </div>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-4 py-2 border rounded-md text-sm" />
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-4 py-2 border rounded-md text-sm" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-4 py-2 border rounded-md text-sm text-gray-600">
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          <input type="number" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} className="w-full px-4 py-2 border rounded-md text-sm" placeholder="Min Amount" />
          <input type="number" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} className="w-full px-4 py-2 border rounded-md text-sm" placeholder="Max Amount" />
        </div>

        <div className="flex justify-end mt-6">
          <button onClick={clearFilters} className="bg-gray-300 text-sm text-gray-700 px-5 py-1.5 rounded-full hover:bg-gray-400 transition">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Add Order / Add Item */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button onClick={() => setShowModal(true)} className="w-40 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          + Add Order
        </button>
        {showModal && <AddOrderModal onClose={() => setShowModal(false)} onSubmit={handleAddOrder} />}

        <button onClick={() => setShowAddItemModal(true)} className="w-40 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          + Add Item
        </button>
        {showAddItemModal && <AddItemModal onClose={() => setShowAddItemModal(false)} />}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#1C3F50] text-white text-left text-sm">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Paid or Unpaid</th>
              <th className="px-4 py-3 font-medium">View</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((po) => (
              <tr key={po.id} className="text-sm text-gray-800 border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3">{po.id}</td>
                <td className="px-4 py-3">{po.date}</td>
                <td className="px-4 py-3">{po.name}</td>
                <td className="px-4 py-3">Rs. {po.amount.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center space-x-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${po.paid ? "bg-green-500" : "bg-red-500"}`}></span>
                    <span className={po.paid ? "text-green-700" : "text-red-700"}>{po.paid ? "Paid" : "Unpaid"}</span>
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => setSelectedOrder(po)} className="px-4 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-700 text-sm">
                    View
                  </button>
                  {selectedOrder?.id === po.id && <ViewOrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 py-4 text-sm text-gray-600">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} className={currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:underline"}>
            Previous
          </button>
          <span className="px-3 py-1 bg-gray-200 rounded-md text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} className={currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:underline"}>
            Next
          </button>
        </div>
      </div>

      {showGRNModal && <GRNModal onClose={() => setShowGRNModal(false)} />}
    </div>
  );
}
