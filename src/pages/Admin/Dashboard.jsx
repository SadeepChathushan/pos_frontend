import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const pieData = {
  labels: ["Desktop", "Mobile", "Tablet"],
  datasets: [
    {
      data: [65, 25, 10],
      backgroundColor: ["#1C3F50", "#DCC894", "#8DA1AF"],
    },
  ],
};

const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Sales",
      data: [250, 750, 400, 1050],
      borderColor: "#2563eb",
      backgroundColor: "#2C586E",
      tension: 0.4,
    },
  ],
};

export default function AdminDashboard() {
  return (
    <div className=" bg-[#BED0DB]  space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <span className="text-gray-500">👤 admin</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Revenue" value="$45,386" color="bg-[#B073C6]" />
        <Card title="New Users" value="134" color="bg-[#47EB73]" />
        <Card title="Active Projects" value="12" color="bg-[#DD9F52]" />
        <Card title="Conversion Rate" value="3.2%" color="bg-[#991b1b]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-4 col-span-2">
          <h2 className="font-semibold text-gray-700 mb-2">Sales Report</h2>
          <Line data={lineData} />
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold text-gray-700 mb-2">User Analytics</h2>
          <Pie data={pieData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityLog />
        <ActivityLog />
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`text-white rounded-lg shadow p-4 ${color}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>
        <FiArrowUpRight size={24} className="opacity-70" />
      </div>
    </div>
  );
}

function ActivityLog() {
  const activities = [
    { text: 'Completed task “Website Redesign”', time: "2h ago", color: "text-blue-600" },
    { text: "New user registered", time: "3h ago", color: "text-purple-500" },
    { text: "Uploaded new file “project-plan.pdf”", time: "1d ago", color: "text-yellow-500" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="font-semibold text-gray-700 mb-3">Recent Activity</h2>
      <ul className="space-y-2 text-sm text-gray-600">
        {activities.map((a, i) => (
          <li key={i} className="flex justify-between">
            <span><span className={`inline-block w-2 h-2 rounded-full mr-2 ${a.color}`}></span>{a.text}</span>
            <span className="text-xs text-gray-400">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
