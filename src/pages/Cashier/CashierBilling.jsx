import React, { useState } from "react";

const Billing = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const [barcode, setBarcode] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [changeDue, setChangeDue] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [cartItems] = useState([
    { name: "Coca Cola", qty: 2, price: 100 },
    { name: "Biscuit", qty: 1, price: 50 },
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-palette-bluegray">Billing</h1>
        <span className="text-sm text-gray-700 flex items-center gap-1">👤 Ms.Lakshi</span>
      </div>

      {/* Main Content Panels */}
      <div className="flex flex-col md:flex-row gap-4 p-4 overflow-auto flex-1">
        {/* Cashier Terminal */}
        <div className="w-full md:w-1/3 overflow-hidden rounded-lg flex flex-col">
          <div className="bg-palette-deepblue text-white p-3 rounded-t-lg">
            <h2 className="text-lg font-semibold">Cashier Terminal</h2>
          </div>
          <div className="bg-white p-4 space-y-3 rounded-b-lg flex-1">
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium mb-1">Search Product</label>
                <input
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                  placeholder="Type or scan..."
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Scan Bar Code</label>
                <input
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  placeholder="Scan barcode..."
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm mb-3">
                <thead className="bg-lightblue text-palette-deepblue">
                  <tr>
                    <th>Cart Items</th>
                    <th>QTY</th>
                    <th>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td>{item.name}</td>
                      <td>{item.qty.toString().padStart(2, "0")}</td>
                      <td>{item.qty * item.price}.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>{total}.00</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Discount:</span>
              <span>0.00</span>
            </div>
          </div>
        </div>

        {/* Payment Screen */}
        <div className="w-full md:w-1/3 overflow-hidden rounded-lg flex flex-col">
          <div className="bg-palette-deepblue text-white p-3 rounded-t-lg">
            <h2 className="text-lg font-semibold">Payment Screen</h2>
          </div>
          <div className="bg-white p-4 space-y-3 rounded-b-lg flex-1">
            <p>
              Amount Due: <strong>{total}.00</strong>
            </p>
            <div className="flex flex-col items-center space-y-3">
              {["card", "cash", "credit"].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`btn-size rounded text-white font-bold w-full ${
                    paymentMethod === method
                      ? method === "card"
                        ? "bg-orange-600"
                        : method === "cash"
                        ? "bg-green-700"
                        : "bg-purple-700"
                      : method === "card"
                      ? "bg-palette-orange hover:bg-orange-500"
                      : method === "cash"
                      ? "bg-palette-green hover:bg-green-600"
                      : "bg-palette-purple hover:bg-purple-600"
                  }`}
                >
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium mb-1">Enter Amount</label>
                <input
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  placeholder="Enter amount..."
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Change Due</label>
                <input
                  value={changeDue}
                  onChange={(e) => setChangeDue(e.target.value)}
                  placeholder="Change due..."
                  disabled={paymentMethod === "card"}
                  className={`w-full border p-2 rounded ${
                    paymentMethod === "card" ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                className="btn-size bg-palette-green rounded text-white font-bold flex-1"
                onClick={() => setShowPopup(true)}
              >
                Pay
              </button>
              <button className="btn-size bg-palette-orange rounded text-white font-bold flex-1">Cancel</button>
            </div>
          </div>
        </div>

        {/* Receipt Print */}
        <div className="w-full md:w-1/3 overflow-hidden rounded-lg flex flex-col">
          <div className="bg-palette-deepblue text-white p-3 rounded-t-lg">
            <h2 className="text-lg font-semibold">Receipt Print</h2>
          </div>
          <div className="bg-white p-4 space-y-3 rounded-b-lg text-sm flex-1">
            <div>
              <p><strong>Keels</strong></p>
              <p>No:09, Attidiya, Ratmalane</p>
              <p>04/04/2025 - 10:31:08 AM</p>
              <p>Bill No: B0097 | Ms. Janudi</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm mb-3">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>QTY</th>
                    <th>Unit Price</th>
                    <th>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>{item.price}.00</td>
                      <td>{item.qty * item.price}.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-1">
              <p>Discount: 0.00</p>
              <p><strong>Grand Total: {total}.00</strong></p>
              <p>Paid Amount: {total}.00</p>
              <p>Payment Method: {paymentMethod || "-"}</p>
              <p>Change Due: {changeDue || "0.00"}</p>
            </div>
            <p className="text-center font-semibold">Thank You For Purchase!</p>
            <div className="flex gap-3 flex-wrap">
              <button className="btn-size bg-palette-green rounded text-white font-bold flex-1">Print</button>
              <button className="btn-size bg-palette-orange rounded text-white font-bold flex-1">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative space-y-4 text-center">
            <h2 className="text-xl font-bold text-palette-deepblue mb-2">Payment Details</h2>
            <p className="text-sm mb-4">Amount to Pay: <strong>{total}.00</strong></p>

            {paymentMethod === "card" ? (
              <div className="space-y-2">
                <p className="text-gray-700 font-medium">💳 Enter Card Details</p>
                <input className="w-full border p-2 rounded" placeholder="Card Number" />
                <input className="w-full border p-2 rounded" placeholder="Expiry Date" />
                <input className="w-full border p-2 rounded" placeholder="CVV" />
                <button
                  className="w-full bg-palette-orange text-white font-bold py-2 rounded mt-3"
                  onClick={() => setShowPopup(false)}
                >
                  Pay Now
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-green-600 font-semibold text-lg">✅ Payment Successful!</p>
                <button
                  className="w-full bg-palette-green text-white font-bold py-2 rounded"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            )}

            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
