// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AppLayout from "./layouts/AppLayout";
import AdminRoutes from "./routes/AdminRoutes";
import CashierRoutes from "./routes/CashierRoutes";
import StockKeeperRoutes from "./routes/StockKeeperRoutes";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute allowedRoles={["ADMIN","CASHIER","STOCKKEEPER"]} />}>
          <Route element={<AppLayout />}>
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/cashier/*" element={<CashierRoutes />} />
            
          </Route>
        </Route>
          <Route element={<PrivateRoute allowedRoles={["STOCKKEEPER"]} />}>
          
           
            <Route path="/stockkeeper/*" element={<StockKeeperRoutes />} />
         
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
