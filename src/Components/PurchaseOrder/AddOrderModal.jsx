import React, { useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

export default function AddOrderModal({ onClose }) {
  const [success, setSuccess] = useState(false); // ✅ Added success state

  // ✅ ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // ✅ Success message handler
  const handleAddOrder = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose(); // auto-close
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg">
        {/* ✖️ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-[#21414d] hover:bg-red-600 rounded-full p-1 transition"
          title="Close"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-[#8DA1AF] text-black px-6 py-3 rounded-t-lg text-center text-xl font-bold">
          Add Order
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block mb-1 font-medium">Date :</label>
            <input type="date" className="w-full p-2 bg-[#BED0DB] rounded" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Name :</label>
            <input type="text" className="w-full p-2 bg-[#BED0DB] rounded" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Amount :</label>
            <input type="number" className="w-full p-2 bg-[#BED0DB] rounded" />
          </div>

          <div className="mt-4">
            <div className="flex justify-between bg-[#1C3F50] text-white font-semibold px-4 py-2 rounded-t gap-10">
              <span>Item</span>
              <span>Unit Price</span>
            </div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between items-center border-b px-4 py-2">
                <select className="border-none outline-none w-1/2">
                  <option>Alariya Sahal</option>
                  <option>Atlas Pen</option>
                </select>
                <input
                  type="text"
                  className="w-1/2 text-right border-2 hover:border-[#1C3F50]"
                />
              </div>
            ))}
          </div>

          {/* ✅ Success Message */}
          {success && (
            <div className="text-green-600 font-semibold text-center border border-green-300 bg-green-50 p-2 rounded">
              Order added successfully!
            </div>
          )}

          {/* ✅ Add Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleAddOrder}
              className="flex items-center justify-center gap-2 bg-[#DD9F52] text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition"
            >
              <FiPlus /> Add Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
