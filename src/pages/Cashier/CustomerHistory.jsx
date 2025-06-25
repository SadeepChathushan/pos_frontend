import React, { useState } from "react";

const CustomerHistory = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showPrintPopup, setShowPrintPopup] = useState(false);

  const historyData = [
    {
      billNo: "P01",
      date: "2025/03/09",
      time: "10:31:08 am",
      amount: 12000,
      paymentMethod: "Credit",
      customerName: "Mr.Jagath",
    },
    {
      billNo: "P02",
      date: "2025/03/10",
      time: "11:00:00 am",
      amount: 9500,
      paymentMethod: "Cash",
      customerName: "Ms.Sanduni",
    },
  ];

  const totalPurchase = historyData.reduce((acc, curr) => acc + curr.amount, 0);
  const totalVisits = historyData.length.toString().padStart(2, "0");

  return (
    <div className="w-full h-screen flex flex-col bg-[#bed0db] px-4 py-6 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-palette-bluegray">Customer History</h1>
        <span className="text-sm text-gray-700">👤 Ms.Lakshi</span>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-2">
          <label className="text-lg font-medium whitespace-nowrap">Customer Name:</label>
          <div className="flex flex-col sm:flex-row w-full gap-2">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Type or scan..."
              className="flex-1 border p-2 rounded text-sm"
            />
            <button className="bg-palette-orange text-white px-5 py-2 rounded font-semibold">
              Search
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto mb-4">
          <table className="min-w-full text-sm border-collapse">
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
                <tr
                  key={index}
                  onClick={() => setSelectedRow(row)}
                  className={`cursor-pointer border-b ${
                    selectedRow?.billNo === row.billNo ? "bg-yellow-100" : "hover:bg-gray-100"
                  }`}
                >
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

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 mb-4">
          {historyData.map((row, index) => (
            <div
              key={index}
              onClick={() => setSelectedRow(row)}
              className={`rounded-lg shadow-md p-4 bg-white cursor-pointer ${
                selectedRow?.billNo === row.billNo ? "border-2 border-yellow-400" : "border"
              }`}
            >
              <div className="flex justify-between">
                <span className="font-semibold text-sm text-palette-bluegray">Bill No:</span>
                <span className="text-sm">{row.billNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-sm">Date:</span>
                <span className="text-sm">{row.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-sm">Time:</span>
                <span className="text-sm">{row.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-sm">Amount:</span>
                <span className="text-sm">Rs. {row.amount}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-sm">Payment:</span>
                <span className="text-sm flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
                  {row.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-sm">Customer:</span>
                <span className="text-sm">{row.customerName}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="flex justify-between text-sm mb-3 px-1 flex-wrap">
          <span>Total Visits: {totalVisits}</span>
          <span>Total Purchase: {totalPurchase}.00</span>
        </div>

        <hr className="border-gray-400 mb-3" />
        <div className="text-base font-medium mb-6">
          Total Purchase: <span className="ml-2">{totalPurchase}.00</span>
        </div>
      </div>

      {/* Buttons at Bottom */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-4">
        <button
          disabled={!selectedRow}
          onClick={() => setShowViewPopup(true)}
          className={`w-full sm:w-[150px] py-2 ${
            selectedRow ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-200 cursor-not-allowed"
          } text-white font-semibold rounded`}
        >
          View Bill
        </button>
        <button
          disabled={!selectedRow}
          onClick={() => setShowPrintPopup(true)}
          className={`w-full sm:w-[150px] py-2 ${
            selectedRow ? "bg-purple-500 hover:bg-purple-600" : "bg-purple-200 cursor-not-allowed"
          } text-white font-semibold rounded`}
        >
          Print History
        </button>
        <button className="w-full sm:w-[150px] py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded">
          Close
        </button>
      </div>

      {/* View Modal */}
      {showViewPopup && selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm space-y-2">
            <h2 className="text-xl font-bold text-palette-bluegray mb-4 text-center">
              Bill Details - {selectedRow.billNo}
            </h2>
            <p><strong>Date:</strong> {selectedRow.date}</p>
            <p><strong>Time:</strong> {selectedRow.time}</p>
            <p><strong>Customer:</strong> {selectedRow.customerName}</p>
            <p><strong>Amount:</strong> Rs. {selectedRow.amount}.00</p>
            <p><strong>Payment:</strong> {selectedRow.paymentMethod}</p>
            <button
              onClick={() => setShowViewPopup(false)}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Print Modal */}
      {showPrintPopup && selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-center mb-4 text-palette-deepblue">🧾 Print View</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Bill No:</strong> {selectedRow.billNo}</p>
              <p><strong>Date:</strong> {selectedRow.date}</p>
              <p><strong>Time:</strong> {selectedRow.time}</p>
              <p><strong>Customer Name:</strong> {selectedRow.customerName}</p>
              <p><strong>Payment Method:</strong> {selectedRow.paymentMethod}</p>
              <p><strong>Total Amount:</strong> Rs. {selectedRow.amount}.00</p>
            </div>
            <button
              onClick={() => window.print()}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-bold mt-4"
            >
              Print Bill
            </button>
            <button
              onClick={() => setShowPrintPopup(false)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-bold mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerHistory;
