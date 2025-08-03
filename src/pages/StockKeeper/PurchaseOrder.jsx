import React, { useEffect, useState } from "react";
import { Search, User, Plus, ChevronDown, ChevronRight } from "lucide-react";
import AddOrderModal from "../../Components/StockKeeper/AddOrderModal";
import AddItemModal from "../../Components/StockKeeper/AddItemModal";
import GRNModal from "../../Components/StockKeeper/GRNModal";
import { fetchItemsWithBatches } from "../../services/StockKeeperServices";


export default function PurchaseOrder() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showGRNModal, setShowGRNModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch from backend on mount
  
  useEffect(() => {
    setLoading(true);
    fetchItemsWithBatches().then((data)=> {
      setItems(data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  // Utility: total stock for a batch array
  const getTotalStock = (batches) =>
    (batches || []).reduce((sum, b) => sum + Number(b.quantity), 0);;

  // Stock status badge
  const getStockStatus = (totalStock) => {
    if (totalStock <= 5) {
      return (
        <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full animate-pulse">
          Low Stock
        </span>
      );
    } else if (totalStock <= 15) {
      return (
        <span className="px-3 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">
          Medium Stock
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
          In Stock
        </span>
      );
    }
  };

  // Simple search filter (name, batch_id, category)
  const filteredItems = items.filter((item) => {
  const q = query.trim().toLowerCase();

  // Numeric search: decide if it's batchId or itemId by length
  if (/^\d+$/.test(q)) {
    // If it's a likely batchId (eg. length >= 6), search in batchIds
    if (q.length >= 6) {
      return item.batches && item.batches.some((batch) => String(batch.batchId) === q);
    }
    // Otherwise, treat as Item ID search
    return String(item.id) === q;
  }

  // Otherwise, search broadly
  return (
    (item.itemName && item.itemName.toLowerCase().includes(q)) ||
    (item.batches && item.batches.some((batch) => String(batch.batchId).includes(q)))
  );
});


  // Expand/collapse
  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen px-6 py-6 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Bar */}
      <div className="flex items-start justify-between mb-6 md:items-center">
        <div>
          <h1 className="mb-1 text-3xl font-bold text-gray-900">Stock Items</h1>
          <p className="text-gray-600">Manage your inventory items and batches</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 border shadow-lg bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-xl">
          <User className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">Ms. Lakshi</span>
        </div>
      </div>

      {/* Search Filter ONLY */}
      <div className="p-6 mb-6 border shadow-lg bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-xl">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search by item name, batch ID, or category"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-sm transition-all duration-300 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Add Order / Add Item */}
      <div className="flex flex-wrap justify-end gap-10 mb-6">
        <button 
          onClick={() => setShowModal(true)} 
          className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all duration-300 bg-green-600 rounded-lg shadow-lg hover:bg-green-700 hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Add Order
        </button>
        {showModal && <AddOrderModal onClose={() => setShowModal(false)} onSubmit={() => {}} />}
        <button 
          onClick={() => setShowAddItemModal(true)} 
          className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
        {showAddItemModal && <AddItemModal onClose={() => setShowAddItemModal(false)} />}
      </div>

      {/* Table */}
      <div className="overflow-hidden border shadow-lg bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-lg text-left text-white bg-gray-800">
                <th className="px-4 py-4"></th>
                <th className="px-6 py-4 font-semibold">Item ID</th>
                <th className="px-6 py-4 font-semibold">Item Name</th>
                <th className="px-6 py-4 font-semibold">Total Stock</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                    No items found matching your filters.
                  </td>
                </tr>
              )}
              {filteredItems.map((item) => {
                const totalStock = getTotalStock(item.batches);
                return (
                  <React.Fragment key={item.id}>
                    <tr className="transition hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="focus:outline-none"
                        >
                          {expanded[item.id] ? (
                            <ChevronDown className="w-5 h-5 text-gray-700" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-700" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 font-mono font-semibold">{item.id}</td>
                      <td className="px-6 py-4 font-medium">{item.itemName}</td>
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {totalStock}
                      </td>
                      <td className="px-6 py-4">
                        {getStockStatus(totalStock)}
                      </td>
                    </tr>
                    {expanded[item.id] && (
                      <tr>
                        <td></td>
                        <td colSpan={4} className="px-6 py-4 bg-gray-50">
                          <div className="overflow-x-auto">
                            <table className="min-w-full">
                              <thead>
                                <tr className="text-base text-gray-600">
                                  <th className="px-3 py-2 text-left">Batch ID</th>
                                  <th className="px-3 py-2 text-left">Date Added</th>
                                  <th className="px-3 py-2 text-left">Sell Price</th>
                                  <th className="px-3 py-2 text-left">Unit Price</th>
                                  <th className="px-3 py-2 text-left">Quantity</th>
                                </tr>
                              </thead>
                              <tbody>
                                {item.batches.map((batch) => (
                                  <tr key={batch.batch_id} className="hover:bg-gray-100">
                                    <td className="px-3 py-2 font-mono text-sm">{batch.batchId}</td>
                                    <td className="px-3 py-2 text-sm">{batch.dateAdded}</td>
                                    <td className="px-3 py-2 font-semibold text-green-600">Rs. {batch.sellPrice}</td>
                                    <td className="px-3 py-2 text-gray-600">Rs. {batch.unitPrice}</td>
                                    <td className="px-3 py-2 font-semibold">{batch.quantity}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {showGRNModal && <GRNModal onClose={() => setShowGRNModal(false)} />}
    </div>
  );
}
