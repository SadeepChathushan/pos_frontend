// src/Components/StockKeeper/AddItemModal.jsx
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { addItem } from "../../services/StockKeeperServices";

export default function AddItemModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [itemData, setItemData] = useState({ itemName: "" });
  const [error, setError] = useState("");

  // close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleAddItem = async () => {
    if (!itemData.itemName.trim()) {
      setError("Item name is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await addItem(itemData);
      setSuccessMessage(res.message || "Item added successfully.");
      setError("");

      // auto-close after 2s
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to add item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-[#21414d] hover:bg-red-600 rounded-full p-1 transition"
          aria-label="Close"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-[#BED0DB] text-black px-6 py-3 rounded-t-lg text-center text-xl font-bold">
          Add New Item
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddItem();
          }}
          className="p-6 space-y-4"
        >
          {/* Item Name */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="itemName"
              className="w-24 text-right font-medium"
            >
              Item Name:
            </label>
            <input
              id="itemName"
              name="itemName"
              type="text"
              className="flex-1 p-2 bg-[#B5C7D6] rounded focus:outline-none"
              value={itemData.itemName}
              onChange={(e) => {
                setError("");
                setItemData({ itemName: e.target.value });
              }}
              disabled={loading}
            />
          </div>

          {/* Success */}
          {successMessage && (
            <div className="p-2 text-center text-green-600 border border-green-300 rounded bg-green-50 font-medium">
              {successMessage}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-2 text-center text-red-600 border border-red-300 rounded bg-red-50 font-medium">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-6 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white transition
                ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#DD9F52] hover:bg-orange-500"}`}
            >
              {loading ? "Adding…" : "Add Item"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="bg-[#47EB73] text-white px-6 py-2 rounded-lg hover:bg-green-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
