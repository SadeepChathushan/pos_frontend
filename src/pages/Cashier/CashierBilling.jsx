import React, { useState } from "react";
import BlueInput from "./../../Components/Input";

const Billing = () => {
  const [searchValue, setSearchValue] = useState("");
  const [cartItems] = useState([
    { name: "Coca Cola", qty: 2, price: 100 },
    { name: "Biscuit", qty: 1, price: 50 },
  ]);
  const total = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="w-full">
  {/* Top Header Bar */}
  <div className="flex justify-between items-center  px-6 py-3 rounded-t-md ">
    <h1 className="text-2xl font-bold text-palette-bluegray">Billing</h1>
    <span className="text-sm text-gray-700 flex items-center gap-1">
      👤 Ms.Lakshi
    </span>
  </div>

  {/* Main Content Panels */}
  <div className="flex gap-4 p-4 text-sm">
    {/* Cashier Terminal */}
    <div className="w-1/3 overflow-hidden rounded-lg ">
      <div className="bg-palette-deepblue text-white p-3 rounded-t-lg">
        <h2 className="text-lg font-semibold">Cashier Terminal</h2>
      </div>
      <div className="bg-white p-4 space-y-3 rounded-b-lg">
        <div className="space-y-2">
          <BlueInput
            label="Search Product"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Type or scan..."
          />
          <BlueInput
            label="Scan Bar Code"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Scan barcode..."
          />
        </div>

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

        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>{total}.00</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Discount:</span>
          <span>0.00</span>
        </div>

        <div className="flex gap-3">
          <button className="btn-size bg-palette-green rounded text-white font-bold">Pay</button>
          <button className="btn-size bg-palette-orange rounded text-white font-bold">Cancel</button>
        </div>
      </div>
    </div>

    {/* Payment Screen */}
    <div className="w-1/3 overflow-hidden rounded-lg ">
      <div className="bg-palette-deepblue text-white p-3 rounded-t-lg">
        <h2 className="text-lg font-semibold">Payment Screen</h2>
      </div>
      <div className="bg-white p-4 space-y-3 rounded-b-lg">
        <p>Amount Due: <strong>{total}.00</strong></p>
        <div className="flex flex-col items-center space-y-3">
          <button className="btn-size bg-palette-orange rounded text-white font-bold">Card</button>
          <button className="btn-size bg-palette-green rounded text-white font-bold">Cash</button>
          <button className="btn-size bg-palette-purple rounded text-white font-bold">Credit</button>
        </div>
        <div className="space-y-2">
          <BlueInput
            label="Enter Amount"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter amount..."
          />
          <BlueInput
            label="Change Due"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Change due..."
          />
        </div>
        <button className="w-full bg-deepblue text-white font-bold py-2 rounded">Confirm Payment</button>
      </div>
    </div>

    {/* Receipt Print */}
    <div className="w-1/3 overflow-hidden rounded-lg ">
      <div className="bg-palette-deepblue text-white p-3 rounded-t-lg">
        <h2 className="text-lg font-semibold">Receipt Print</h2>
      </div>
      <div className="bg-white p-4 space-y-3 rounded-b-lg text-sm">
        <div>
          <p><strong>Keels</strong></p>
          <p>No:09, Attidiya, Ratmalane</p>
          <p>04/04/2025 - 10:31:08 AM</p>
          <p>Bill No: B0097 | Ms. Janudi</p>
        </div>
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
        <div className="space-y-1">
          <p>Discount: 0.00</p>
          <p><strong>Grand Total: {total}.00</strong></p>
          <p>Paid Amount: {total}.00</p>
          <p>Payment Method: Cash</p>
          <p>Change Due: 0.00</p>
        </div>
        <p className="text-center font-semibold">Thank You For Purchase!</p>
        <div className="flex gap-3">
          <button className="btn-size bg-palette-green rounded text-white font-bold">Print</button>
          <button className="btn-size bg-palette-orange rounded text-white font-bold">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Billing;
