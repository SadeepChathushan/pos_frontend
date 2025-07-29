import React from "react";

// Sample product data
const products = [
  {
    name: "Sunlight Scap",
    barcode: "8850001",
    category: "Toiletries",
    price: "95.00",
    qty: 30,
    status: "In Stock",
  },
  {
    name: "Signal Toothpaste",
    barcode: "8850002",
    category: "Oral Care",
    price: "LKR 150",
    qty: 4,
    status: "Low Stock",
  },
  {
    name: "Lifebuoy Shampoo",
    barcode: "8850003",
    category: "Hair Care",
    price: "LKR 250",
    qty: 100,
    status: "In Stock",
  },
];

export default function Dashboard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Inventory Overview
        </h2>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg">
          Add Product
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-500">Total Sales Today</p>
          <p className="text-xl font-bold text-gray-800">LKR 12,900</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-500">Inventory Value</p>
          <p className="text-xl font-bold text-gray-800">LKR 230,000</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-500">Low Stock Items</p>
          <p className="text-xl font-bold text-gray-800">4</p>
        </div>
      </div>

      {/* Alert */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
        <p className="font-medium">Alert:</p>
        <p>4 items are below the low stock threshold.</p>
      </div>

      {/* Search + Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <input
          type="text"
          placeholder="Search or scan products"
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:outline-none"
        />
        <div className="flex gap-2">
          {/* <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Add Product
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-lg">
            Stock Out Report
          </button> */}
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full mt-4 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Barcode</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Qty</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.barcode} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{p.name}</td>
                <td className="py-2 px-4">{p.barcode}</td>
                <td className="py-2 px-4">{p.category}</td>
                <td className="py-2 px-4">{p.price}</td>
                <td className="py-2 px-4">{p.qty}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      p.status === "In Stock"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button className="bg-gray-200 px-3 py-1 rounded text-sm">
                    ✏️
                  </button>
                  <button className="bg-gray-200 px-3 py-1 rounded text-sm">
                    ➡️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
