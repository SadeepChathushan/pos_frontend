// src/App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AppLayout from "./layouts/AppLayout";
import AdminRoutes from "./routes/AdminRoutes";
import CashierRoutes from "./routes/CashierRoutes";
import StockKeeperRoutes from "./routes/StockKeeperRoutes";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  // const [userRole, setUserRole] = useState("admin"); // Hardcoded role for testing
  const userRole = "admin";

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute allowedRoles={["admin", "cashier", "stockkeeper"]} userRole={userRole} />}>
          <Route element={<AppLayout userRole={userRole} />}>
            {/* Role-based Routes */}
            <Route path="/cashier/*" element={<CashierRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/stockkeeper/*" element={<StockKeeperRoutes />} />
          </Route>
        </Route>

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
