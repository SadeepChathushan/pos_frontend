import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function DeleteUserModal({ onClose, onDelete }) {
      const navigate = useNavigate();
      
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleDelete = () => {
    onDelete();            
    onClose();             
    navigate("/admin/usermanagement"); 
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-white w-full max-w-sm rounded-lg shadow-xl">
        {/* Header */}
        <div className="bg-[#8DA1AF] px-6 py-4 rounded-t-lg text-xl font-bold text-black">
          Delete User
        </div>

        {/* Message */}
        <div className="p-6 text-center text-gray-800 text-lg font-medium">
          Are you sure you want to delete this user?
        </div>

        {/* Buttons */}
        <div className="px-6 pb-6 pt-2 flex justify-center gap-4">
          <button
            onClick={onDelete}
            className="bg-[#DD9F52] text-white font-bold px-6 py-2 rounded-full hover:bg-orange-500 transition btn-size"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-[#47EB73] text-white font-bold px-6 py-2 rounded-full hover:bg-green-500 transition btn-size"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
