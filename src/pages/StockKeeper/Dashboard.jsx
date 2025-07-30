import React, { useState, useEffect } from "react";
import { TrendingUp, Package, DollarSign, Clock, ShoppingCart, AlertTriangle, Users, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample data
const products = [
  { name: "Sunlight Soap", barcode: "8850001", category: "Toiletries", price: "95.00", qty: 30, status: "In Stock" },
  { name: "Signal Toothpaste", barcode: "8850002", category: "Oral Care", price: "150", qty: 4, status: "Low Stock" },
  { name: "Lifebuoy Shampoo", barcode: "8850003", category: "Hair Care", price: "250", qty: 100, status: "In Stock" },
  { name: "Head & Shoulders", barcode: "8850004", category: "Hair Care", price: "300", qty: 75, status: "In Stock" },
  { name: "Dove Body Wash", barcode: "8850005", category: "Body Care", price: "400", qty: 12, status: "Low Stock" },
];

const recentInvoices = [
  { invoiceNo: "INV001", customer: "John Doe", total: "1,200", date: "2025-07-30", status: "paid" },
  { invoiceNo: "INV002", customer: "Jane Smith", total: "2,000", date: "2025-07-29", status: "paid" },
  { invoiceNo: "INV003", customer: "Mark Lee", total: "1,500", date: "2025-07-28", status: "pending" },
  { invoiceNo: "INV004", customer: "Sarah Wilson", total: "890", date: "2025-07-27", status: "paid" },
];

export default function Dashboard() {
  const navigate = useNavigate(); 
  const handleNavigate = () => {
    navigate("/stockkeeper/purchaseorder");
  };

  const [currentDate, setCurrentDate] = useState("");
  const [animatedValues, setAnimatedValues] = useState({
    sales: 0,
    inventory: 0,
    profit: 0
  });

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const formattedTime = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    setCurrentDate(`${formattedDate} • ${formattedTime}`);

    // Animate counter values
    const targets = { sales: 12900, inventory: 230000, profit: 3500 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedValues({
        sales: Math.floor(targets.sales * easeOut),
        inventory: Math.floor(targets.inventory * easeOut),
        profit: Math.floor(targets.profit * easeOut)
      });

      if (step >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, trend, bgGradient }) => (
    <div className={`relative p-6 rounded-2xl backdrop-blur-md bg-gradient-to-br ${bgGradient} border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <div className="flex items-center text-sm text-emerald-600 font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{trend}%
            </div>
          )}
        </div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  const ProductCard = ({ title, products, colorClass, textColorClass }) => (
    <div className={`p-6 rounded-2xl backdrop-blur-md bg-gradient-to-br ${colorClass} border border-white/30 shadow-xl transition-all duration-300 hover:scale-105`}>
      <h4 className="text-lg font-semibold text-gray-800 mb-4">{title}</h4>
      <div className="space-y-2">
        {products.slice(0, 3).map((product, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-white/20 backdrop-blur-sm">
            <span className={`font-medium ${textColorClass}`}>{product.name}</span>
            <span className={`text-sm font-bold ${textColorClass}`}>Qty: {product.qty}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
              Dashboard Overview
            </h1>
            <p className="text-purple-200/80 font-medium">{currentDate}</p>
          </div>

          {/* User Profile */}
          <div className="absolute right-6 top-6 flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-lg">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Ms. Lakshi</span>
          </div>
        </div>

        {/* Purchase Order Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleNavigate} // Trigger navigation on button click
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <Package className="w-5 h-5" />
            Purchase Order
          </button>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Today's Sales"
            value={`LKR ${animatedValues.sales.toLocaleString()}`}
            icon={DollarSign}
            color="from-emerald-500 to-teal-600"
            bgGradient="from-emerald-50/90 to-teal-50/90"
            trend="12"
          />
          <StatCard
            title="Inventory Value"
            value={`LKR ${animatedValues.inventory.toLocaleString()}`}
            icon={Package}
            color="from-blue-500 to-indigo-600"
            bgGradient="from-blue-50/90 to-indigo-50/90"
            trend="8"
          />
          <StatCard
            title="Net Profit"
            value={`LKR ${animatedValues.profit.toLocaleString()}`}
            icon={TrendingUp}
            color="from-purple-500 to-pink-600"
            bgGradient="from-purple-50/90 to-pink-50/90"
            trend="24"
          />
          <StatCard
            title="Active Customers"
            value="247"
            icon={Users}
            color="from-orange-500 to-red-600"
            bgGradient="from-orange-50/90 to-red-50/90"
            trend="16"
          />
        </div>

        {/* Product Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductCard
            title="🏆 Top Selling Products"
            products={products.sort((a, b) => b.qty - a.qty)}
            colorClass="from-emerald-100/90 to-teal-100/90"
            textColorClass="text-emerald-800"
          />
          <ProductCard
            title="⚠️ Low Stock Alert"
            products={products.filter(p => p.status === "Low Stock")}
            colorClass="from-amber-100/90 to-orange-100/90"
            textColorClass="text-amber-800"
          />
        </div>

        {/* Recent Invoices */}
        <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <BarChart3 className="w-7 h-7 text-purple-400" />
              Recent Transactions
            </h3>
            <button className="text-purple-300 hover:text-white transition-colors text-sm font-medium">
              View All →
            </button>
          </div>
          
          <div className="overflow-hidden rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5 backdrop-blur-sm">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-purple-200">Invoice</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-purple-200">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-purple-200">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-purple-200">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-purple-200">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {recentInvoices.map((invoice, index) => (
                    <tr key={invoice.invoiceNo} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-white">{invoice.invoiceNo}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {invoice.customer.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-gray-200">{invoice.customer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-emerald-400">LKR {invoice.total}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300">{invoice.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          invoice.status === 'paid' 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
