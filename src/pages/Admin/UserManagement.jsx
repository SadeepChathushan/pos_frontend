import React, { useState } from "react";
import { FiSearch, FiChevronDown, FiUser } from "react-icons/fi";
import AddUserModal from "../../Components/Admin/AddUserModal";
import EditUserModal from "../../Components/Admin/EditUserModal";
import DeleteUserModal from "../../Components/Admin/DeleteUserModal";


const sampleUsers = [
  { name: "Eva", status: "active", role: "Editor", lastLogin: "Today" },
  { name: "Alex", status: "inactive", role: "Admin", lastLogin: "2 Days ago" },
];

export default function UserManagement() {
  const [query, setQuery] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] =useState(null);

  const filtered = sampleUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-[#BED0DB] ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <div className="flex items-center gap-2 text-gray-700">
          <FiUser className="w-5 h-5" />
          <span className="font-medium">Ms.Lakshi</span>
        </div>
      </div>

      {/* Search + Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="relative w-full md:w-4/5">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search By ID, Name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-lg bg-white placeholder-gray-400 focus:outline-none"
          />
          <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <button
            onClick={() => setShowAddUserModal(true)}
            className="px-5 py-2 bg-[#DD9F52] text-white font-semibold rounded-lg hover:bg-orange-500 transition btn-size"
        >
            + Add User
        </button>
        {showAddUserModal && <AddUserModal onClose={() => setShowAddUserModal(false)} />}

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#1C3F50] text-white text-sm">
              {["Name", "Status", "Role", "Last Login", "Actions"].map((col) => (
                <th key={col} className="px-4 py-3 text-left font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, i) => (
              <tr key={i} className="border-b border-gray-300 text-sm text-gray-700">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      user.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  {user.status === "active" ? "Active" : "Inactive"}
                </td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.lastLogin}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="bg-[#4285F4] text-white px-4 py-1 rounded-full text-sm hover:bg-blue-600 btn-size" 
                  >
                    Edit
                </button>
                {editingUser && (
                <EditUserModal user={editingUser} onClose={() => setEditingUser(null)} />
                )}

                  <button 
                  onClick={() => setDeletingUser(user)}
                  className="bg-[#B073C6] text-white px-4 py-1 rounded-full text-sm hover:bg-purple-500 btn-size">
                    Delete
                  </button>
                  {deletingUser &&(
                    <DeleteUserModal user={deletingUser} onClose={()=> setDeletingUser(null)}/>

                  )}
                </td>
              </tr>
            ))}
            {[...Array(5 - filtered.length)].map((_, i) => (
              <tr key={`empty-${i}`} className="h-10 border-b border-gray-200">
                <td colSpan={5}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
