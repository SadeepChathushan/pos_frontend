import React from 'react';
import { FiUser } from 'react-icons/fi';

const attendanceData = [
  {
    date: '2025/06/12',
    name: 'Eva',
    role: 'Editor',
    checkIn: '08:50 AM',
    checkOut: '05:20 PM',
    status: 'Present',
    color: 'green',
  },
  {
    date: '2025/06/12',
    name: 'Eva',
    role: 'Admin',
    checkIn: '08:50 AM',
    checkOut: '05:20 PM',
    status: 'Absent',
    color: 'red',
  },
  {
    date: '2025/06/12',
    name: 'Eva',
    role: 'Admin',
    checkIn: '08:50 AM',
    checkOut: '05:20 PM',
    status: 'Late',
    color: 'yellow',
  },
];

export default function Attendance() {
  return (
    <div className="min-h-screen  ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
        <div className="flex items-center text-gray-600">
          <FiUser className="mr-2" />
          Ms.Lakshi
        </div>
      </div>

   {/* Filter Panel */}
<div className="flex flex-wrap items-end gap-4 p-4 mb-6 ">
  {/* Employee Filter */}
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">Employee</label>
    <select className="w-48 p-2 border rounded bg-blue-50">
      <option>All Employees</option>
      <option>Eva</option>
      <option>John</option>
      <option>Sahan</option>
    </select>
  </div>

  {/* Designation Filter */}
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">Designation</label>
    <select className="w-48 p-2 border rounded bg-blue-50">
      <option>All Roles</option>
      <option>Admin</option>
      <option>Editor</option>
      <option>Manager</option>
    </select>
  </div>

  {/* Attendance Status Filter */}
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">Status</label>
    <select className="w-48 p-2 border rounded bg-blue-50">
      <option>All Statuses</option>
      <option>Present</option>
      <option>Absent</option>
      <option>Late</option>
    </select>
  </div>

  {/* Date Range Filter */}
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">Date Range</label>
    <input
      type="text"
      placeholder="YYYY/MM/DD - YYYY/MM/DD"
      className="w-64 p-2 border rounded bg-blue-50"
      defaultValue="2025/06/10 - 2025/06/30"
    />
  </div>

  {/* Search Button */}
  <div className="flex items-end">
    <button className="px-5 py-2 bg-[#1C3F50] text-white rounded hover:bg-[#163240] btn-size">
      Filter
    </button>
  </div>
</div>


        {/* Table */}
<div className="overflow-x-auto bg-white shadow rounded-t-xl">
  <table className="w-full text-left border-separate border-spacing-0">
    <thead>
      <tr className="bg-[#1C3F50] text-white text-sm">
        <th className="p-3 rounded-tl-xl">Attendance Date</th>
        <th className="p-3">Employee Name</th>
        <th className="p-3">Designation</th>
        <th className="p-3">Clock-In Time</th>
        <th className="p-3">Clock-Out Time</th>
        <th className="p-3 rounded-tr-xl">Attendance Status</th>
      </tr>
    </thead>
    <tbody>
      {attendanceData.map((entry, index) => (
        <tr
          key={index}
          className="text-gray-700 bg-white border-b border-gray-200"
        >
          <td className="p-3">{entry.date}</td>
          <td className="p-3">{entry.name}</td>
          <td className="p-3">{entry.role}</td>
          <td className="p-3">{entry.checkIn}</td>
          <td className="p-3">{entry.checkOut}</td>
          <td className="p-3">
            <span className="inline-flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  entry.color === 'green'
                    ? 'bg-green-500'
                    : entry.color === 'red'
                    ? 'bg-red-500'
                    : 'bg-yellow-400'
                }`}
              ></span>
              {entry.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Export Button */}
      <div className="flex justify-end mt-6">
        <button className="px-6 py-2 text-white rounded bg-[#B073C6] btn-size hover:bg-purple-700">
          Export
        </button>
      </div>
    </div>
  );
}
