import React, { useState } from "react";

const dummyItems = [
  {
    id: "itm01",
    name: "Coca Cola",
    batches: [
      { batchId: "B001", price: 100 },
      { batchId: "B002", price: 105 },
    ],
  },
  {
    id: "itm02",
    name: "Biscuit",
    batches: [{ batchId: "B003", price: 50 }],
  },
];

const Billing = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSelectedBatch("");
    setQuantity("");
    setSearchTerm(item.name);
  };

  const addToCart = () => {
    if (!selectedItem || !selectedBatch || !quantity) return;

    const batch = selectedItem.batches.find((b) => b.batchId === selectedBatch);
    const existingIndex = cartItems.findIndex(
      (ci) => ci.name === selectedItem.name && ci.batchId === selectedBatch
    );

    const updatedCart = [...cartItems];

    if (existingIndex !== -1) {
      updatedCart[existingIndex].qty += parseInt(quantity);
    } else {
      updatedCart.push({
        name: selectedItem.name,
        batchId: selectedBatch,
        qty: parseInt(quantity),
        price: batch.price,
      });
    }

    setCartItems(updatedCart);
    setQuantity("");
    setSelectedBatch("");
    setSelectedItem(null);
    setSearchTerm("");
  };

  const removeCartItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const cancelBilling = () => {
    setSearchTerm("");
    setSelectedItem(null);
    setSelectedBatch("");
    setQuantity("");
    setCartItems([]);
    setPaymentMethod(null);
    setShowPopup(false);
  };

  const handlePay = () => {
    if (cartItems.length === 0) return;
    setShowPopup(true);
  };

  const handlePaymentType = (type) => {
    setPaymentMethod(type);
    setShowPopup(false);

    const billDetails = {
      total: total,
      paymentMethod: type,
      cartItems: cartItems,
    };

    console.log("🧾 BILL SUMMARY");
    console.log("-------------------------------");
    console.log("🛒 Items:");
    cartItems.forEach((item, idx) => {
      console.log(
        `${idx + 1}. ${item.name} | Batch: ${item.batchId} | Qty: ${
          item.qty
        } | Price: ${item.price} | Subtotal: ${item.qty * item.price}`
      );
    });
    console.log("-------------------------------");
    console.log(`💰 Total: Rs. ${total}.00`);
    console.log(`💳 Payment Method: ${type.toUpperCase()}`);
    console.log("-------------------------------");

    // Reset after logging
    cancelBilling();
  };

  const total = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-white shadow-sm">
        <span className="text-sm text-gray-700 flex items-center gap-1">
          👤 Ms.Lakshi
        </span>
        <span className="text-sm text-gray-700 flex items-center gap-1">
          Logout
        </span>
      </div>

      {/* Main Content Panels */}
      <div className="flex flex-col md:flex-row gap-4 overflow-auto flex-1 px-6 mt-10">
        <div className="w-full md:w overflow-hidden rounded-lg flex flex-col">
          <h2 className="font-semibold mb-2">ID or Name</h2>

          {/* Product Search */}
          <div className="mb-4 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type Item ID or Name..."
              className="w-full border p-2 rounded"
            />
            {searchTerm && (
              <ul className="absolute bg-white border w-full mt-1 max-h-48 overflow-auto z-10">
                {dummyItems
                  .filter(
                    (item) =>
                      item.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.id.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item, i) => (
                    <li
                      key={i}
                      onClick={() => handleItemSelect(item)}
                      className="p-2 bg-gray-300 cursor-pointer"
                    >
                      {item.name} ({item.id})
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Batch Selection */}
          {selectedItem && (
            <div className="mb-4">
              <label className="block font-semibold mb-2 mt-10">
                Select a batch
              </label>
              <select
                className="w-1/5 border p-2 rounded"
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                <option value="">-- Select Batch --</option>
                {selectedItem.batches.map((batch, i) => (
                  <option key={i} value={batch.batchId}>
                    {batch.batchId} - Rs. {batch.price}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Input */}
          {selectedBatch && (
            <div className="mb-4">
              <label className="block font-semibold mb-2">Quantity</label>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Enter quantity"
              />
            </div>
          )}

          {/* Add Button */}
          {quantity && (
            <button
              className="bg-sky-800 text-white px-4 py-2 rounded font-bold"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          )}

          {/* Cart Table */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Cart Items</h3>
            <table className="w-full border text-left rounded-md">
              <thead className="bg-sky-800 text-white">
                <tr>
                  <th className="p-2">Item</th>
                  <th className="p-2">Batch</th>
                  <th className="p-2">QTY</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Sub Total</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.batchId}</td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">{item.price}</td>
                    <td className="p-2">{item.qty * item.price}</td>
                    <td className="p-2">
                      <button
                        onClick={() => removeCartItem(index)}
                        className="text-red-600 font-bold"
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-4 mr-2 font-bold text-2xl ">
              Total: Rs. {total}.00
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-4 gap-3">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded font-bold"
                onClick={cancelBilling}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-6 py-2 rounded font-bold"
                onClick={handlePay}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 relative space-y-4 text-center">
            <h2 className="text-xl font-bold text-palette-deepblue mb-2">
              Select Payment Method
            </h2>
            <div className="space-y-2">
              <button
                className="w-full bg-green-600 text-white font-bold py-2 rounded"
                onClick={() => handlePaymentType("cash")}
              >
                Pay with Cash
              </button>
              <button
                className="w-full bg-blue-600 text-white font-bold py-2 rounded"
                onClick={() => handlePaymentType("card")}
              >
                Pay with Card
              </button>
            </div>
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
