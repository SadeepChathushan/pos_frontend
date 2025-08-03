import React, { useEffect, useState, useRef } from "react";
import { Plus, X } from "lucide-react";
import { fetchAllItems, submitOrder } from "../../services/StockKeeperServices";

export default function AddOrderModal({ onClose, onSubmit }) {
  const [itemsList, setItemsList] = useState([]); // [{id, name}]
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Notification state (place here, INSIDE component!)
  const [notificationMsg, setNotificationMsg] = useState("");

  // Rows state: item, inputValue, unitPrice, sellPrice, quantity
  const [rows, setRows] = useState([
    { item: null, inputValue: "", unitPrice: "", sellPrice: "", quantity: "" },
  ]);
  const [activeSuggestion, setActiveSuggestion] = useState({});
  const [success, setSuccess] = useState(false);
  const containerRef = useRef(null);

  // Fetch item list on mount
  useEffect(() => {
    fetchAllItems()
      .then(setItemsList)
      .catch(() => setFetchError("Failed to load items"))
      .finally(() => setLoading(false));
  }, []);

  // Esc closes modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Click outside closes suggestions
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveSuggestion({});
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ========== Handlers ==========

  // Autocomplete typing
  const handleItemInput = (index, value) => {
    const updated = [...rows];
    updated[index].inputValue = value;
    updated[index].item = null; // Unselect item
    setRows(updated);
    setActiveSuggestion((prev) => ({ ...prev, [index]: 0 }));
  };

  // Suggestion click
  const handleSuggestionClick = (index, suggestion) => {
    const updated = [...rows];
    updated[index].item = suggestion;
    updated[index].inputValue = `${suggestion.name} (ID:${suggestion.id})`;
    // Optionally, fetch price from backend; here just a demo
    updated[index].unitPrice = suggestion.unitPrice || "100.00";
    setRows(updated);
    setActiveSuggestion((prev) => ({ ...prev, [index]: null }));
  };

  // Field change
  const handleInputChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  // Add row
  const addItemRow = () => {
    setRows([
      ...rows,
      {
        item: null,
        inputValue: "",
        unitPrice: "",
        sellPrice: "",
        quantity: "",
      },
    ]);
  };

  // Keyboard navigation
  const handleKeyDown = (index, e, filteredSuggestions) => {
    if (!filteredSuggestions.length) return;
    const act = activeSuggestion[index] ?? 0;
    if (e.key === "ArrowDown") {
      setActiveSuggestion((prev) => ({
        ...prev,
        [index]: Math.min(filteredSuggestions.length - 1, act + 1),
      }));
    } else if (e.key === "ArrowUp") {
      setActiveSuggestion((prev) => ({
        ...prev,
        [index]: Math.max(0, act - 1),
      }));
    } else if (e.key === "Enter") {
      if (filteredSuggestions[act]) {
        handleSuggestionClick(index, filteredSuggestions[act]);
        e.preventDefault();
      }
    }
  };

  // Submit to backend
  const handleSubmitOrder = async () => {
    const orders = rows
      .filter((r) => r.item && r.quantity && r.unitPrice && r.sellPrice)
      .map((r) => ({
        itemId: r.item.id,
        quantity: Number(r.quantity),
        unitPrice: parseFloat(r.unitPrice),
        sellPrice: parseFloat(r.sellPrice),
      }));

    if (!orders.length) {
      setNotificationMsg("Please fill at least one order row completely.");
      return;
    }

    try {
      const response = await submitOrder(orders); // Capture the response
      setNotificationMsg(response.message || "Order submitted successfully!");
      setSuccess(true);
      if (onSubmit) onSubmit(orders); // optional
      setTimeout(() => {
        setSuccess(false);
        setNotificationMsg("");
        onClose();
      }, 1500);
    } catch (e) {
      setNotificationMsg("Order submission failed!");
    }
  };

  // ========== UI ==========

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-5xl h-[95vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200/50">
        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200 z-10"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 🧾 Header */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white px-6 py-6 rounded-t-2xl">
          <h2 className="text-center text-2xl font-bold tracking-wide">
            Add Order
          </h2>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto px-10 py-8 space-y-6 bg-gray-50/30"
          ref={containerRef}
        >
          {/* 🟢 Notification message - place here! */}
          {notificationMsg && (
            <div
              className={`mb-4 text-center p-3 rounded-xl shadow-sm font-semibold 
      ${
        success
          ? "bg-green-50 border-2 border-green-200 text-green-800"
          : "bg-red-50 border-2 border-red-200 text-red-800"
      }`}
            >
              {notificationMsg}
            </div>
          )}

          {loading ? (
            <div className="text-center py-20 text-lg font-semibold text-gray-600">
              Loading items…
            </div>
          ) : fetchError ? (
            <div className="text-center py-20 text-red-600">{fetchError}</div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="grid grid-cols-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold px-6 py-4 text-sm">
                <span>ID or Name</span>
                <span className="text-right">Unit Price</span>
                <span className="text-right">Sell Price</span>
                <span className="text-right">Quantity</span>
              </div>
              <div className="divide-y divide-gray-100">
                {rows.map((row, index) => {
                  // Filter by name or ID
                  const filteredSuggestions =
                    row.inputValue.length > 0
                      ? itemsList.filter(
                          (item) =>
                            (typeof item.name === "string" ? item.name : "")
                              .toLowerCase()
                              .includes((row.inputValue ?? "").toLowerCase()) ||
                            String(item.id).includes(row.inputValue)
                        )
                      : [];

                  return (
                    <div
                      key={index}
                      className="relative grid grid-cols-4 items-center px-6 py-4 gap-4 hover:bg-gray-50/50 transition-colors duration-150"
                    >
                      {/* Autocomplete */}
                      <div className="col-span-1">
                        <input
                          type="text"
                          autoComplete="off"
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm"
                          placeholder="Type Item ID or Name…"
                          value={row.inputValue}
                          onChange={(e) =>
                            handleItemInput(index, e.target.value)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(index, e, filteredSuggestions)
                          }
                        />
                        {/* Suggestion Box */}
                        {filteredSuggestions.length > 0 && !row.item && (
                          <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-40 max-h-48 overflow-auto">
                            {filteredSuggestions.map((suggestion, sIdx) => (
                              <div
                                key={suggestion.id}
                                className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                                  activeSuggestion[index] === sIdx
                                    ? "bg-blue-100"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleSuggestionClick(index, suggestion)
                                }
                                onMouseEnter={() =>
                                  setActiveSuggestion((prev) => ({
                                    ...prev,
                                    [index]: sIdx,
                                  }))
                                }
                              >
                                <span className="font-medium">
                                  {suggestion.name}
                                </span>
                                <span className="text-xs text-gray-500 ml-2">
                                  (ID:{suggestion.id})
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Unit Price */}
                      <input
                        type="text"
                        className="text-right px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm bg-gray-100"
                        value={row.unitPrice}
                        onChange={(e) =>
                          handleInputChange(index, "unitPrice", e.target.value)
                        }
                        placeholder="0.00"
                      />
                      {/* Sell Price */}
                      <input
                        type="text"
                        className="text-right px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm"
                        value={row.sellPrice}
                        onChange={(e) =>
                          handleInputChange(index, "sellPrice", e.target.value)
                        }
                        placeholder="0.00"
                      />
                      {/* Quantity */}
                      <input
                        type="number"
                        min={1}
                        className="text-right px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm"
                        value={row.quantity}
                        onChange={(e) =>
                          handleInputChange(index, "quantity", e.target.value)
                        }
                        placeholder="1"
                      />
                    </div>
                  );
                })}
              </div>
              {/* ➕ Add Row */}
              <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                <div className="text-right">
                  <button
                    onClick={addItemRow}
                    className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium text-sm"
                    title="Add Row"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* ✅ Submit */}
        <div className="px-6 py-6 border-t border-gray-200 bg-white rounded-b-2xl">
          <div className="text-center">
            <button
              onClick={handleSubmitOrder}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Submit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
