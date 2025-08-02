import React, { useEffect, useState, useRef } from "react";
import { cashierService } from "../../services/cashierService";

const Billing = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showBillPopup, setShowBillPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [updateItemsList, setUpdateItemsList] = useState([]);
  const [items, setItems] = useState([]);
  const printableRef = useRef();

  useEffect(() => {
    cashierService
      .getitem()
      .then((res) => {
        console.log("Fetched items:", res);
        setItems(res);
      })
      .catch((err) => {
        console.error("Failed to fetch items", err);
      });
  }, []);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSelectedBatch("");
    setQuantity("");
    setSearchTerm(item.itemName);
  };

  const addToCart = () => {
    if (!selectedItem || !selectedBatch || !quantity) return;

    const batch = selectedItem.orders.find((b) => b.batchId === selectedBatch);
    if (!batch) return;

    const existingIndex = cartItems.findIndex(
      (ci) => ci.name === selectedItem.itemName && ci.batchId === selectedBatch
    );

    const updatedCart = [...cartItems];
    const tobeUpdateCart = [...updateItemsList];

    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity += parseInt(quantity);
      tobeUpdateCart[existingIndex].quantity += parseInt(quantity);
    } else {
      updatedCart.push({
        name: selectedItem.itemName,
        batchId: selectedBatch,
        quantity: parseInt(quantity),
        price: batch.sellPrice,
        // remain: parseInt(batch.total) - parseInt(quantity),
        itemId: selectedItem.id,
      });
      tobeUpdateCart.push({
        id: parseInt(batch.id),
        total: parseInt(batch.total) - parseInt(quantity),
      });
    }

    setCartItems(updatedCart);
    setUpdateItemsList(tobeUpdateCart);
    setQuantity("");
    setSelectedBatch("");
    setSelectedItem(null);
    setSearchTerm("");
  };

  const removeCartItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    const tobeUpdateCart = [...updateItemsList];
    tobeUpdateCart.splice(index, 1);
    setUpdateItemsList(tobeUpdateCart);
  };

  const cancelBilling = () => {
    setSearchTerm("");
    setSelectedItem(null);
    setSelectedBatch("");
    setQuantity("");
    setCartItems([]);
    setUpdateItemsList([]);
    setPaymentMethod(null);
    setPaidMethod(null);
    setShowPopup(false);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handlePay = () => {
    if (cartItems.length === 0) return;
    setShowPopup(true);
  };

  function getCompactDateTimeString() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }

  const handlePaymentType = (type) => {
    setPaymentMethod(type);
    setShowPopup(false);
    const invoice_id = getCompactDateTimeString();
    setShowBillPopup(true);
    console.log("--------------111111--", paymentMethod);

    const billDetails = {
      saleInvoiceId: invoice_id,
      invoices: cartItems,
    };

    const paymentDetails = {
      type: type,
      amount: total,
      fileName: `bill_${invoice_id}.pdf`,
      salesInvoiceId: invoice_id,
    };

    setTimeout(() => {
      const element = printableRef.current;
      if (element) {
        const opt = {
          margin: 0.1,
          filename: `bill_${invoice_id}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a5", orientation: "portrait" },
        };

        window
          .html2pdf()
          .set(opt)
          .from(element)
          .save()
          .then(() => {
            setShowBillPopup(false);
            cancelBilling();
          });
      }
    }, 500); // Delay ensures div is rendered before printing

    cashierService
      .updateItemtotal(updateItemsList)
      .then((res) => {
        console.log("stock updated successfully:", res);
      })
      .catch((err) => {
        console.error("❌ Error updating stock:", err);
      });

    cashierService
      .insertBilldata(billDetails)
      .then((res) => {
        console.log("Bill inserted successfully:", res);
      })
      .catch((err) => {
        console.error("❌ Error inserting bill:", err);
      });

    cashierService
      .insertPayment(paymentDetails)
      .then((res) => {
        console.log("Payment inserted successfully:", res);
      })
      .catch((err) => {
        console.error("❌ Error inserting payment:", err);
      });

    console.log("🧾 BILL SUMMARY");
    console.log("-------------------------------");
    cartItems.forEach((item, i) => {
      console.log(
        `${i + 1}. ${item.name} | Batch: ${item.batchId} | Qty: ${
          item.quantity
        } | Price: ${item.price} | Subtotal: ${
          item.quantity * item.price
        }|||| ${item.remain} remain`
      );
    });
    console.log("-------------------------------");
    console.log(` Invoice No: ${invoice_id}`);
    console.log("-------------------------------");
    console.log(`💰 Total: Rs. ${total}.00`);
    console.log(`💳 Payment Method: ${type.toUpperCase()}`);
    console.log("-------------------------------");
    console.log("updateItemsList", updateItemsList);
    console.log("billDetails", billDetails);
    console.log("caartItems", cartItems);
    console.log("paymentDetails", paymentDetails);
    // cancelBilling();
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 bg-white shadow-sm">
        <span className="text-sm text-gray-700 flex items-center gap-1">
          👤 Ms.Lakshi
        </span>
        <span className="text-sm text-gray-700 flex items-center gap-1">
          Logout
        </span>
      </div>

      {/* Main */}
      <div className="flex flex-col md:flex-row gap-4 overflow-auto flex-1 px-6 mt-10">
        <div className="w-full md:w overflow-hidden rounded-lg flex flex-col">
          <h2 className="font-semibold mb-2">ID or Name</h2>

          {/* Search Input */}
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
                {items
                  .filter((item) => {
                    const term = searchTerm.toLowerCase();
                    return (
                      item.itemName
                        .split(" ")[0]
                        .toLowerCase()
                        .includes(term.toLowerCase()) ||
                      item.id.toString().includes(term)
                    );
                  })
                  .map((item, i) => (
                    <li
                      key={i}
                      onClick={() => handleItemSelect(item)}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {item.itemName}{" "}
                      <span className="text-xs">(ID:{item.id})</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Batch Dropdown */}
          {selectedItem && (
            <div className="mb-4">
              <label className="block font-semibold mb-2 mt-10">
                Select a batch
              </label>
              <select
                className="w-1/2 border p-2 rounded"
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                <option value="">-- Select Batch --</option>
                {selectedItem.orders?.map((batch, i) => (
                  <option key={i} value={batch.batchId}>
                    {batch.batchId} - Rs. {batch.sellPrice} ({batch.total}{" "}
                    available)
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

          {/* Add to Cart */}
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
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.price}</td>
                    <td className="p-2">{item.quantity * item.price}</td>
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

            {/* Total + Actions */}
            <div className="text-right mt-4 mr-2 font-bold text-2xl">
              Total: Rs. {total}.00
            </div>
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

      {/* Payment Popup */}
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

      {showBillPopup && (
        <div ref={printableRef} className="bg-white p-6 text-black max-w-md mx-auto">
        <div
          ref={printableRef}
          className="bg-white p-6 text-black max-w-md mx-auto"
        >
          <h2 className="text-xl font-bold text-center mb-2">NRNS COMPANY</h2>
          <div className="text-sm mb-2">
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date().toLocaleString()}
            </p>
          </div>

          <table className="w-full text-xs mb-2">
            <thead>
              <tr>
                <th className="border-l border-gray-300 p-1">Item</th>
                <th className="border-l border-gray-300 p-1">Batch</th>
                <th className="border-l border-gray-300 p-1 text-right">Qty</th>
                <th className="border-l border-gray-300 p-1 text-right">Price</th>
                <th className="border-l border-gray-300 p-1 text-right">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => (
                <tr key={i}>
                  <td className="p-1">{item.name}</td>
                  <td className="p-1">{item.batchId}</td>
                  <td className="p-1 text-right">{item.quantity}</td>
                  <td className="p-1 text-right">Rs. {item.price}</td>
                  <td className="p-1 text-right">
                    Rs. {item.quantity * item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="font-semibold">Total: Rs. {total}.00</p>
          <p className="font-semibold">
            Payment Method: {paymentMethod.toUpperCase()}
          </p>
          <p className="text-center mt-4">Thank you for your purchase!</p>
        </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
