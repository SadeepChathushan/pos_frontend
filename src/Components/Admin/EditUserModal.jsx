import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

export default function EditUserModal({ onClose, user }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    status: user?.status || "",
    role: user?.role || "",
    email: user?.email || "",
    password: user?.password || "",
    confirmPassword: user?.password || "",
  });

  // ESC key close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updated user:", formData);
    onClose(); // Close after save
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-xl">
       

        {/* Header */}
        <div className="bg-[#8DA1AF] px-6 py-4 rounded-t-lg text-xl font-bold text-black">
          Edit User
        </div>

        {/* Form */}
        <div className="p-6 space-y-3 text-sm text-gray-800">
          {[
            { label: "Name", name: "name" },
            { label: "Status", name: "status" },
            { label: "Role", name: "role" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm Password", name: "confirmPassword", type: "password" },
          ].map((field) => (
            <div key={field.name} className="flex items-center gap-4">
              <label className="w-32 text-right">{field.label} :</label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="flex-1 p-2 bg-[#BED0DB] rounded outline-none"
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="px-6 pb-6 pt-3 flex justify-center gap-4">
          <button
            onClick={handleSave}
            className="bg-[#DD9F52] text-white px-6 py-2 rounded hover:bg-orange-500 transition btn-size"
          >
            Save
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
