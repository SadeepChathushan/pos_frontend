// Updated PurchaseOrder.jsx with modern simple colors
import React, { useState } from "react";
import { Search, User, Plus, Eye } from "lucide-react";
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

// Mock Modal Components (replace with your actual components)
// const AddOrderModal = ({ onClose, onSubmit }) => (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white p-6 rounded-xl">
//       <h3 className="text-lg font-semibold mb-4">Add Order Modal</h3>
//       <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-lg">Close</button>
//     </div>
//   </div>
// );


// const AddItemModal = ({ onClose }) => (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white p-6 rounded-xl">
//       <h3 className="text-lg font-semibold mb-4">Add Item Modal</h3>
//       <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-lg">Close</button>
//     </div>
//   </div>
// );

// const ViewOrderModal = ({ order, onClose }) => (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white p-6 rounded-xl">
//       <h3 className="text-lg font-semibold mb-4">Order Details: {order.id}</h3>
//       <p>Name: {order.name}</p>
//       <p>Amount: Rs. {order.amount.toLocaleString()}</p>
//       <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg">Close</button>
//     </div>
//   </div>
// );

// const GRNModal = ({ onClose }) => (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white p-6 rounded-xl">
//       <h3 className="text-lg font-semibold mb-4">GRN Modal</h3>
//       <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-lg">Close</button>
//     </div>
//   </div>
// );

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-6">
      {/* Top Bar */}
      <div className="flex items-start justify-between mb-6 md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Purchase Orders</h1>
          <p className="text-gray-600">Manage your purchase orders and payments</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-lg">
          <User className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">Ms. Lakshi</span>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 mb-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg rounded-xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by ID or Name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300"
            />
          </div>
          <input 
            type="date" 
            value={fromDate} 
            onChange={(e) => setFromDate(e.target.value)} 
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300" 
          />
          <input 
            type="date" 
            value={toDate} 
            onChange={(e) => setToDate(e.target.value)} 
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300" 
          />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)} 
            className="w-full px-4 py-3 text-sm text-gray-600 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300"
          >
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          <input 
            type="number" 
            value={minAmount} 
            onChange={(e) => setMinAmount(e.target.value)} 
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300" 
            placeholder="Min Amount" 
          />
          <input 
            type="number" 
            value={maxAmount} 
            onChange={(e) => setMaxAmount(e.target.value)} 
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300" 
            placeholder="Max Amount" 
          />
        </div>

        <div className="flex justify-end mt-6">
          <button 
            onClick={clearFilters} 
            className="bg-gray-200 text-sm text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300 font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Add Order / Add Item */}
    <div className="flex flex-wrap gap-4 mb-6">
  <button 
    onClick={() => setShowModal(true)} 
    className="flex items-center gap-2 px-6 py-3 text-white transition-all duration-300 bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105 shadow-lg font-medium"
  >
    <Plus className="w-4 h-4" />
    Add Order
  </button>
  {showModal && <AddOrderModal onClose={() => setShowModal(false)} onSubmit={handleAddOrder} />}

  <button 
    onClick={() => setShowAddItemModal(true)} 
    className="flex items-center gap-2 px-6 py-3 text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105 shadow-lg font-medium"
  >
    <Plus className="w-4 h-4" />
    Add Item
  </button>
  {showAddItemModal && <AddItemModal onClose={() => setShowAddItemModal(false)} />}
</div>

      {/* Table */}
      <div className="overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg rounded-xl">
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead>
        <tr className="bg-gray-800 text-white text-left text-lg"> {/* Increased font size */}
          <th className="px-6 py-4 font-semibold">ID</th>
          <th className="px-6 py-4 font-semibold">Date</th>
          <th className="px-6 py-4 font-semibold">Name</th>
          <th className="px-6 py-4 font-semibold">Amount</th>
          <th className="px-6 py-4 font-semibold">Payment Status</th>
          <th className="px-6 py-4 font-semibold">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {paginated.map((po) => (
          <tr key={po.id} className="text-lg text-gray-800 transition-all duration-200 hover:bg-gray-50"> {/* Increased font size */}
            <td className="px-6 py-4 font-semibold">{po.id}</td>
            <td className="px-6 py-4 text-gray-600">{po.date}</td>
            <td className="px-6 py-4 font-medium">{po.name}</td>
            <td className="px-6 py-4 font-bold text-gray-900">Rs. {po.amount.toLocaleString()}</td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${po.paid ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className={`font-medium px-3 py-1 rounded-full text-xs ${
                  po.paid 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {po.paid ? "Paid" : "Unpaid"}
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <button 
                onClick={() => setSelectedOrder(po)} 
                className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              {selectedOrder?.id === po.id && (
                <ViewOrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination */}
  <div className="flex items-center justify-center gap-4 py-6 text-lg text-gray-600 bg-gray-50/50">
    <button 
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} 
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        currentPage === 1 
          ? "text-gray-400 cursor-not-allowed" 
          : "text-gray-700 hover:bg-gray-200 font-medium"
      }`}
    >
      Previous
    </button>
    <span className="px-4 py-2 text-gray-800 bg-white border border-gray-200 rounded-lg font-semibold shadow-sm">
      Page {currentPage} of {totalPages}
    </span>
    <button 
      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} 
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        currentPage === totalPages 
          ? "text-gray-400 cursor-not-allowed" 
          : "text-gray-700 hover:bg-gray-200 font-medium"
      }`}
    >
      Next
    </button>
  </div>
</div>

      {showGRNModal && <GRNModal onClose={() => setShowGRNModal(false)} />}
    </div>
  );
}