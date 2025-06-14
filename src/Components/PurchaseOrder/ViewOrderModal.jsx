import React from "react";
import { FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function ViewOrderModal({ onClose, order }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl">
        {/* ❌ Close Button */}
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-[#21414d] hover:bg-red-600 rounded-full p-1.5 shadow transition"
          title="Close"
        >
          <FiX className="w-5 h-5" />
        </button> */}

        {/* Header */}
        <div className="bg-[#8DA1AF] px-6 py-4 rounded-t-xl text-center">
          <h2 className="text-xl font-bold text-black tracking-wide">Purchase Order Details</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-gray-700">
          <div className="grid grid-cols-2 gap-y-4 text-sm font-medium">
            <span className="text-gray-500">Order ID:</span>
            <span>{order.id}</span>

            <span className="text-gray-500">Date:</span>
            <span>{order.date}</span>

            <span className="text-gray-500">Customer:</span>
            <span>{order.name}</span>

            <span className="text-gray-500">Amount:</span>
            <span className="text-[#21414d] font-semibold">Rs. {order.amount.toLocaleString()}</span>

            <span className="text-gray-500">Payment Status:</span>
            <span>
              {order.paid ? (
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  <FiCheckCircle className="w-4 h-4" />
                  Paid
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                  <FiAlertCircle className="w-4 h-4" />
                  Unpaid
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#DD9F52] text-white rounded-md hover:bg-orange-500 transition shadow"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
