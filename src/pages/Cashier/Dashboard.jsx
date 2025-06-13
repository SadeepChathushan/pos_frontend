import React from 'react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-palette-bluegray">Cashier Dashboard</h1>
        <span className="text-palette-lightblue">👤 Ms.Lakshi</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow text-center border-t-4 border-palette-orange">
          <h2 className="text-lg font-semibold text-palette-bluegray">Total Sales Today</h2>
          <p className="text-2xl font-bold text-palette-orange">12000</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center border-t-4 border-palette-neon">
          <h2 className="text-lg font-semibold text-palette-bluegray">Sales Today</h2>
          <p className="text-2xl font-bold text-palette-neon">40</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center border-t-4 border-palette-purple">
          <h2 className="text-lg font-semibold text-palette-bluegray">Total Customers</h2>
          <p className="text-2xl font-bold text-palette-purple">40</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4 text-palette-deepblue">New Sale</h2>
          <div className="flex gap-2 mb-2">
            <input className="w-full mb-2 border p-2 rounded" placeholder="Product or item select" />
            <button className="px-4 bg-palette-beige rounded">+</button>
          </div>

          <div className="flex gap-2 mb-2">
            <input className="flex-1 border p-2 rounded" placeholder="Quantity" />
            <button className="px-4 bg-palette-beige rounded">+</button>
          </div>

          <div className="flex justify-between mb-2 text-sm text-palette-bluegray">
            <span>Discount</span>
            <span>Tax</span>
            <span>Total</span>
          </div>

          <div className="flex justify-between">
            <button className="bg-palette-orange text-white px-4 py-2 rounded">Print bill</button>
            <button className="bg-palette-bluegray text-white px-4 py-2 rounded">Credit Card</button>
            <button className="bg-palette-lighterblue text-white px-4 py-2 rounded">Return</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4 text-palette-deepblue">Recent Sales</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th>Date</th>
                <th>Customer</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td>2025-06-13</td>
                <td>John</td>
                <td>$150</td>
              </tr>
              {/* More rows */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
