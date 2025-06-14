import React, { useState } from "react";
import BlueInput from "../../Components/Input";

const CustomerHistory = () => {
  const [searchValue, setSearchValue] = useState("");
  

  const historyData = [
    {
      billNo: "P01",
      date: "2025/03/09",
      time: "10:31:08 am",
      amount: 12000,
      paymentMethod: "Credit",
      customerName: "Mr.Jagath",
    },
    // Add more rows if needed
  ];

  const totalPurchase = historyData.reduce((acc, curr) => acc + curr.amount, 0);
  const totalVisits = historyData.length.toString().padStart(2, "0");

  return (
    <div className="w-full min-h-screen bg-[#bed0db] p-6">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-palette-bluegray">Customer History</h1>
        <span className="text-sm text-gray-700">👤 Ms.Lakshi</span>
      </div>

      <div className="flex items-center mb-6 gap-2">
  <label className="text-lg font-medium whitespace-nowrap mr-2">
    Customer Name :
  </label>
  <div className="flex-1">
    <BlueInput
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Type or scan..."
    />
  </div>
  <button className="bg-palette-orange text-white px-5 py-2 rounded font-semibold ml-2">
    Search
  </button>
</div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse mb-3">
          <thead className="bg-palette-deepblue text-white">
            <tr>
              <th className="p-2 text-left">Bill No</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Payment Method</th>
              <th className="p-2 text-left">Customer Name</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {historyData.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{row.billNo}</td>
                <td className="p-2">{row.date}</td>
                <td className="p-2">{row.time}</td>
                <td className="p-2">{row.amount}</td>
                <td className="p-2 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                  {row.paymentMethod}
                </td>
                <td className="p-2">{row.customerName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="flex justify-between text-sm mb-3 px-1">
        <span>Total Visits : {totalVisits}</span>
        <span>Total Purchase : {totalPurchase}.00</span>
      </div>

      <hr className="border-gray-400 mb-3" />

      <div className="text-base font-medium mb-6">
        Total Purchase : <span className="ml-2">{totalPurchase}.00</span>
      </div>

      {/* Action Buttons */}
    <div className="flex justify-center gap-20 mt-6">
  <button className="w-[150px] py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded">
    View Bill
  </button>
  <button className="w-[150px] py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded">
    Print History
  </button>
  <button className="w-[150px] py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded">
    Close
  </button>
</div>

    </div>
  );
};

export default CustomerHistory;
