import React from "react";
import {
  DollarSign,
  TrendingUp,
  Users,
  ShoppingCart,
  CreditCard,
  RotateCcw,
} from "lucide-react";
import FloatingCalculator from "../../Components/cal";

const Dashboard = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-palette-bluegray">
          Cashier Dashboard
        </h1>
        <span className="text-sm md:text-base text-palette-lightblue">👤 Ms.Lakshi</span>
      </div>

      {/* Main Scrollable Area */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <SummaryCard icon={<DollarSign />} title="Total Sales Today" value="12000" color="orange" />
          <SummaryCard icon={<TrendingUp />} title="Sales Today" value="40" color="neon" />
          <SummaryCard icon={<Users />} title="Total Customers" value="40" color="purple" />
        </div>

        {/* Sales Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* New Sale */}
          <div className="bg-white p-4 rounded shadow flex flex-col space-y-4">
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

            <div className="grid grid-cols-3 text-sm text-palette-bluegray text-center mt-2">
              <span>Discount</span>
              <span>Tax</span>
              <span>Total</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between mt-auto gap-2">
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
          <div className="bg-white p-4 rounded shadow flex flex-col">
            <h2 className="text-lg font-bold text-palette-deepblue mb-2">Recent Sales</h2>
            <div className="overflow-auto">
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
                  {/* More rows here if needed */}
                </tbody>
              </table>
            </div>
            <FloatingCalculator />
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ icon, title, value, color }) => {
  const palette = {
    orange: "palette-orange",
    neon: "palette-neon",
    purple: "palette-purple",
  };
  return (
    <div className={`bg-white p-4 rounded shadow border-t-4 border-${palette[color]} flex items-center gap-4`}>
      <div className={`bg-${palette[color]}/20 p-3 rounded-full`}>
        {React.cloneElement(icon, { className: `text-${palette[color]}`, size: 32 })}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-palette-bluegray">{title}</h2>
        <p className={`text-2xl font-bold text-${palette[color]}`}>{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;
