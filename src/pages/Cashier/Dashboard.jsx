import React from "react";
import {
  DollarSign,
  TrendingUp,
  Users,
  ShoppingCart,
  CreditCard,
  RotateCcw,
} from "lucide-react";
import FloatingCalculator 
 from "../../Components/cal";

const Dashboard = () => {
  return (
    <div className="space-y-6 overflow-hidden h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-palette-bluegray">Cashier Dashboard</h1>
        <span className="text-palette-lightblue">👤 Ms.Lakshi</span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow border-t-4 border-palette-orange flex items-center gap-4">
          <div className="bg-palette-orange/20 p-3 rounded-full">
            <DollarSign className="text-palette-orange" size={32} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-palette-bluegray">Total Sales Today</h2>
            <p className="text-2xl font-bold text-palette-orange">12000</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow border-t-4 border-palette-neon flex items-center gap-4">
          <div className="bg-palette-neon/20 p-3 rounded-full">
            <TrendingUp className="text-palette-neon" size={32} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-palette-bluegray">Sales Today</h2>
            <p className="text-2xl font-bold text-palette-neon">40</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow border-t-4 border-palette-purple flex items-center gap-4">
          <div className="bg-palette-purple/20 p-3 rounded-full">
            <Users className="text-palette-purple" size={32} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-palette-bluegray">Total Customers</h2>
            <p className="text-2xl font-bold text-palette-purple">40</p>
          </div>
        </div>
      </div>

      {/* Sales Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* New Sale */}
        <div className="bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-lg font-bold text-palette-deepblue flex items-center gap-2">
            <ShoppingCart className="text-palette-deepblue" size={20} /> New Sale
          </h2>

          <div className="flex items-center gap-2">
            <input className="w-full border p-2 rounded" placeholder="Product or item select" />
            <button className="bg-palette-beige px-3 py-1 rounded text-sm font-medium">+</button>
          </div>

          <div className="flex items-center gap-2">
            <input className="w-full border p-2 rounded" placeholder="Quantity" />
            <button className="bg-palette-beige px-3 py-1 rounded text-sm font-medium">+</button>
          </div>

          <div className="grid grid-cols-3 text-sm text-palette-bluegray text-center mt-4">
            <span>Discount</span>
            <span>Tax</span>
            <span>Total</span>
          </div>

          <div className="flex justify-between mt-4 gap-2">
            <button className="flex-1 bg-palette-orange text-white px-4 py-2 rounded flex items-center justify-center gap-2">
              <ShoppingCart size={16} /> Print Bill
            </button>
            <button className="flex-1 bg-palette-bluegray text-white px-4 py-2 rounded flex items-center justify-center gap-2">
              <CreditCard size={16} /> Credit Card
            </button>
            <button className="flex-1 bg-palette-lighterblue text-white px-4 py-2 rounded flex items-center justify-center gap-2">
              <RotateCcw size={16} /> Return
            </button>
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold text-palette-deepblue mb-4">Recent Sales</h2>
          <table className="w-full text-left text-sm border">
            <thead className="bg-gray-100">
              <tr className="border-b">
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Customer</th>
                <th className="py-2 px-3">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-3">2025-06-13</td>
                <td className="py-2 px-3">John</td>
                <td className="py-2 px-3">$150</td>
              </tr>
              {/* You can map more rows here */}
               
            </tbody>
          </table>
          <FloatingCalculator />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
