import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

export default function GRNModal({ onClose }) {
  const [remark, setRemark] = useState("");

  // ESC to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Sample order data
  const items = [
    { name: "Item 01", ordered: 100 },
    { name: "Item 02", ordered: 50 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
        {/* Close Button */}
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-[#21414d] hover:bg-red-600 rounded-full p-1 transition"
        >
          <FiX className="w-5 h-5" />
        </button> */}

        {/* Header */}
        <div className="bg-[#8DA1AF] text-black px-6 py-3 rounded-t-lg text-center text-xl font-bold">
          Purchase Order : P01
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse">
            <thead className="bg-[#1C3F50] text-white">
              <tr>
                <th className="px-4 py-2 text-left">Item Name</th>
                <th className="px-4 py-2 text-left">Ordered Qty</th>
                <th className="px-4 py-2 text-left">Received Qty</th>
                <th className="px-4 py-2 text-left">Returned Qty</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.ordered}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      className="bg-[#BED0DB] p-1 rounded w-full"
                      placeholder="0"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      className="bg-[#BED0DB] p-1 rounded w-full"
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <p className="text-xs mt-2 text-center text-black">
          <strong>Note:</strong> Received Qty + Returned Qty cannot exceed Ordered Qty
        </p>

        {/* Remark */}
        <div className="mt-4">
          <label className="font-semibold mb-1 block">Remark / Note</label>
          <textarea
            className="w-full bg-gray-200 h-16 rounded p-2"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-6">
          <button className="bg-[#DD9F52] text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition btn-size">
            Confirm GRN
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
  );
}
