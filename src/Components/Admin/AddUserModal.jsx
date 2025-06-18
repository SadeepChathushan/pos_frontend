import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function AddUserModal({ onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-xl">
        

        {/* Header */}
        <div className="bg-[#8DA1AF] px-6 py-4 rounded-t-lg text-xl font-bold text-black ">
          Add User
        </div>

        {/* Form */}
        <div className="p-6 space-y-4 text-sm text-gray-800">
          {[
            { label: "Name", type: "text" },
            { label: "Status", type: "text" },
            { label: "Role", type: "text" },
            { label: "Email", type: "email" },
            { label: "Password", type: "password" },
            { label: "Confirm Password", type: "password" },
          ].map((field) => (
            <div key={field.label} className="flex items-center gap-4">
              <label className="w-32 text-right">{field.label} :</label>
              <input
                type={field.type}
                className="flex-1 p-2 bg-[#BED0DB] rounded outline-none"
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="px-6 pb-6 pt-2 flex justify-center gap-4">
          <button className="bg-[#DD9F52] text-white px-6 py-2 rounded hover:bg-orange-500 transition btn-size">
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-[#47EB73] text-white px-6 py-2 rounded hover:bg-green-500 transition btn-size"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
