import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { addItem } from "../../services/StockKeeperServices"; // Import the addItem function

export default function AddItemModal({ onClose }) {
  const [success, setSuccess] = useState(false);
  const [itemData, setItemData] = useState({ itemName: "" }); // Only itemName is required
  const [error, setError] = useState(""); // To store error messages

  // ESC key close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Handle the form submission
  const handleAddItem = async () => {
    try {
      const response = await addItem(itemData); // Call the addItem API function
      setSuccess(true); // Set success state if the item is added successfully
      setTimeout(() => {
        setSuccess(false);
        onClose(); // Close the modal after 2 seconds
      }, 2000);
    } catch (error) {
      setError('Failed to add item'); // Set error message in case of failure
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg">
        {/* ✖️ Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-[#21414d] hover:bg-red-600 rounded-full p-1 transition"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-[#BED0DB] text-black px-6 py-3 rounded-t-lg text-center text-xl font-bold">
          Add New Item
        </div>

        {/* Form */}
        <div className="p-6 space-y-3">
          {/* Inputs */}
          <div className="flex items-center gap-4">
            <label className="w-24 text-right">Item Name :</label>
            <input
              className="flex-1 p-2 bg-[#B5C7D6] rounded"
              value={itemData.itemName} // Controlled value
              onChange={(e) => setItemData({ ...itemData, itemName: e.target.value })} // Correctly bind itemName
            />
          </div>

          <hr className="my-4" />

          {/* Success Message */}
          {success && (
            <div className="text-green-600 font-semibold text-center border border-green-300 bg-green-50 p-2 rounded">
              Item added successfully!
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-red-600 font-semibold text-center border border-red-300 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <hr className="my-4" />

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-4">
            <button
              onClick={handleAddItem}
              className="bg-[#DD9F52] text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition btn-size"
            >
              Add Item
            </button>
            <button
              onClick={onClose}
              className="bg-[#47EB73] text-white px-6 py-2 rounded-lg hover:bg-green-500 transition btn-size"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
