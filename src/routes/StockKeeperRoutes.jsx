// AdminRoutes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StockKeeperDashboard from '../pages/StockKeeper/Dashboard';

const StockKeeperRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<StockKeeperDashboard />} />
    {/* Other admin-specific routes */}
  </Routes>
);

export default StockKeeperRoutes;