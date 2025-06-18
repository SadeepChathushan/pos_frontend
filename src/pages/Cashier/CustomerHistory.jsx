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
    // Add more rows as needed
  ];

  const totalPurchase = historyData.reduce((acc, curr) => acc + curr.amount, 0);
  const totalVisits = historyData.length.toString().padStart(2, "0");

  return (
    <div className="w-full min-h-screen bg-[#bed0db] p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-palette-bluegray">Customer History</h1>
        <span className="text-sm text-gray-700">👤 Ms.Lakshi</span>
      </div>

      {/* Search */}
      <div className="flex items-center mb-6 gap-2">
        <label className="text-lg font-medium whitespace-nowrap mr-2">Customer Name :</label>
        <div className="flex-1">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Type or scan..."
            className="w-full border p-2 rounded text-sm"
          />
        </div>
        <button className="bg-palette-orange text-white px-5 py-2 rounded font-semibold ml-2">Search</button>
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

      {/* Summary */}
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
        <button
          disabled={!selectedRow}
          onClick={() => setShowViewPopup(true)}
          className={`w-[150px] py-2 ${
            selectedRow
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-blue-200 cursor-not-allowed"
          } text-white font-semibold rounded`}
        >
          View Bill
        </button>
        <button
          disabled={!selectedRow}
          onClick={() => setShowPrintPopup(true)}
          className={`w-[150px] py-2 ${
            selectedRow
              ? "bg-purple-500 hover:bg-purple-600"
              : "bg-purple-200 cursor-not-allowed"
          } text-white font-semibold rounded`}
        >
          Print History
        </button>
        <button className="w-[150px] py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded">
          Close
        </button>
      </div>

      {/* View Bill Popup */}
      {showViewPopup && selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] relative space-y-2">
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

      {/* Print History Popup */}
      {showPrintPopup && selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] relative">
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
  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-bold mb-2"
>
  Print Bill
</button>
<button
  onClick={() => setShowPrintPopup(false)}  // ✅ correct
  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-bold"
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
