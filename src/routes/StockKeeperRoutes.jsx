// AdminRoutes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StockKeeperDashboard from '../pages/StockKeeper/Dashboard';
import PurchaseOrder from '../pages/StockKeeper/PurchaseOrder';
import RandomDelivery from '../pages/StockKeeper/RandomDelivery';

const StockKeeperRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<StockKeeperDashboard />} />
    {/* Other admin-specific routes */}

    <Route path='/purchaseorder' element = {<PurchaseOrder />}/>
    <Route path='/randomdelivery' element={<RandomDelivery/>}/>
  </Routes>
);

export default StockKeeperRoutes;