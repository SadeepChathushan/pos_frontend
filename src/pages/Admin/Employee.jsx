import React from "react";
import { FiDownload, FiCalendar, FiDollarSign, FiPlus, FiMinus } from "react-icons/fi";

export default function SalaryDashboardContent() {
  return (
    <div className=" space-y-6 bg-[#BED0DB] ">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#B073C6] text-white rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm">Month</p>
            <p className="text-xl font-bold">MARCH</p>
          </div>
          <FiCalendar className="w-6 h-6" />
        </div>
        <div className="bg-[#47EB73] text-white rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm">Total Salary</p>
            <p className="text-xl font-bold">Rs. 80,000</p>
          </div>
          <FiPlus className="w-6 h-6" />
        </div>
        <div className="bg-[#DD9F52] text-white rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm">Deduction</p>
            <p className="text-xl font-bold">Rs. 25,000</p>
          </div>
          <FiMinus className="w-6 h-6" />
        </div>
        <div className="bg-[#991b1b] text-white rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm">Month Salary</p>
            <p className="text-xl font-bold">Rs. 55,000</p>
          </div>
          <FiDollarSign className="w-6 h-6" />
        </div>
      </div>

      {/* Month Dropdown and Download */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <select className="px-4 py-2 w-full md:w-1/4 rounded-md bg-white border">
          <option>March</option>
          <option>February</option>
        </select>
        <button className="flex items-center gap-2 bg-[#1C3F50] text-white font-medium px-4 py-2 rounded-lg ">
          <FiDownload /> Download Pay Slip
        </button>
      </div>

      {/* Pay Slip Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-center font-bold text-lg mb-4 text-[#0A2540]">
          Salary Calculation of month of March 2024
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-sm">
          <div>
            <p><strong>Employee Code</strong>: 1004</p>
            <p><strong>EPF Number</strong>: 123</p>
            <p><strong>Joined Date</strong>: 2020-08-20</p>
            <p><strong>Employment Type</strong>: Permanent</p>
          </div>
          <div>
            <p><strong>Employee Name</strong>: K. Raguram</p>
            <p><strong>Designation</strong>: Graphic Designer</p>
            <p><strong>NIC</strong>: 0000-0000-0000</p>
            <p><strong>Address</strong>: No.54/A, Colombo 06</p>
          </div>
        </div>

        {/* Table */}
        <table className="w-full border text-left text-sm mb-6">
          <thead className="bg-[#0A2540] text-white">
            <tr>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Earnings</th>
              <th className="py-2 px-4">Deductions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border">
              <td className="px-4 py-2">Basic Salary</td>
              <td className="px-4 py-2">200,000.00</td>
              <td></td>
            </tr>
            <tr className="border">
              <td className="px-4 py-2">Additional Income</td>
              <td className="px-4 py-2">50,000.00</td>
              <td></td>
            </tr>
            <tr className="border">
              <td className="px-4 py-2">Medical Allowance</td>
              <td className="px-4 py-2">50,000.00</td>
              <td></td>
            </tr>
            <tr className="border">
              <td className="px-4 py-2">Other Allowances</td>
              <td className="px-4 py-2">50,000.00</td>
              <td></td>
            </tr>
            <tr className="border">
              <td className="px-4 py-2">Advanced Personal Income Tax</td>
              <td></td>
              <td className="px-4 py-2">50,000.00</td>
            </tr>
            <tr className="border">
              <td className="px-4 py-2">EPF Employee Contribution</td>
              <td></td>
              <td className="px-4 py-2">50,000.00</td>
            </tr>
            <tr className="border font-semibold">
              <td className="px-4 py-2">Total</td>
              <td className="px-4 py-2">Rs.350,000.00</td>
              <td className="px-4 py-2">Rs.100,000.00</td>
            </tr>
          </tbody>
        </table>

        {/* Net Salary */}
        <div className="bg-[#0A2540] text-white text-center py-2 font-semibold rounded-t">NET SALARY</div>
        <div className="bg-gray-100 text-center py-6 rounded-b">
          <p className="text-2xl font-bold">Rs.200,000.00</p>
          <p className="text-gray-500">Two Hundred Thousand Only</p>
        </div>

        {/* Payment Info */}
        <div className="mt-4 text-xs text-gray-600 italic">
          <p><strong>Payment Date</strong>: March 28, 2024</p>
          <p><strong>Bank Name</strong>: Commercial Bank</p>
          <p><strong>Account Number</strong>: 8000-7996-4564-1111</p>
        </div>
      </div>
    </div>
  );
}
