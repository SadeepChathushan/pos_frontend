// src/App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AppLayout from "./layouts/AppLayout";
import AdminRoutes from "./routes/AdminRoutes";
import CashierRoutes from "./routes/CashierRoutes";
import StockKeeperRoutes from "./routes/StockKeeperRoutes";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const [userRole, setUserRole] = useState(null); // null initially (unauthenticated)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login setUserRole={setUserRole} />} />

        <Route
          element={<PrivateRoute allowedRoles={["admin", "cashier", "stockkeeper"]} userRole={userRole} />}
        >
          <Route element={<AppLayout userRole={userRole} />}>
            <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/cashier/*" element={<Navigate to="/cashier/dashboard" replace />} />
            <Route path="/stockkeeper/*" element={<Navigate to="/stockkeeper/stock-overview" replace />} />

            {/* Routes */}
            <Route path="/admin/dashboard/*" element={<AdminRoutes />} />
            <Route path="/cashier/dashboard/*" element={<CashierRoutes />} />
            <Route path="/stockkeeper/stock-overview/*" element={<StockKeeperRoutes />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
