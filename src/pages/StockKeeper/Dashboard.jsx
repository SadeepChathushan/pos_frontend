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
    <div className="min-h-screen px-6 py-6 md:ml-64 bg-[#BED0DB]">
 

    <div className="p-6 space-y-6 bg-white hadow-lg rounded-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Inventory Overview
        </h2>
        <button className="px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">
          Add Product
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-500">Total Sales Today</p>
          <p className="text-xl font-bold text-gray-800">LKR 12,900</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-500">Inventory Value</p>
          <p className="text-xl font-bold text-gray-800">LKR 230,000</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-500">Low Stock Items</p>
          <p className="text-xl font-bold text-gray-800">4</p>
        </div>
      </div>

      {/* Alert */}
      <div className="p-4 text-yellow-700 bg-yellow-100 border-l-4 border-yellow-500 rounded-md">
        <p className="font-medium">Alert:</p>
        <p>4 items are below the low stock threshold.</p>
      </div>

      {/* Search + Buttons */}
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <input
          type="text"
          placeholder="Search or scan products"
          className="w-full px-4 py-2 border rounded-lg sm:w-1/2 focus:outline-none"
        />
        <div className="flex gap-2">
          {/* <button className="px-4 py-2 text-white bg-green-600 rounded-lg">
            Add Product
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg">
            Stock Out Report
          </button> */}
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full mt-4 text-sm">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Barcode</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.barcode} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.barcode}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2">{p.price}</td>
                <td className="px-4 py-2">{p.qty}</td>
                <td className="px-4 py-2">
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
                <td className="flex gap-2 px-4 py-2">
                  <button className="px-3 py-1 text-sm bg-gray-200 rounded">
                    ✏️
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-200 rounded">
                    ➡️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
</div>
  );
}
