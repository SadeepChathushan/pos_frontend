// AdminRoutes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StockKeeperDashboard from '../pages/StockKeeper/Dashboard';
import PurchaseOrder from '../pages/StockKeeper/PurchaseOrder';
import RandomDelivery from '../pages/StockKeeper/RandomDelivery';
import GRN from '../pages/StockKeeper/GRN';
import Inventory from '../pages/StockKeeper/Inventory';
import ReturnExpire from '../pages/StockKeeper/Return-Expire';

const StockKeeperRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<StockKeeperDashboard />} />
    {/* Other admin-specific routes */}

    <Route path='/purchaseorder' element = {<PurchaseOrder />}/>
    <Route path='/randomdelivery' element={<RandomDelivery/>}/>
    <Route path='/grn' element={<GRN/>}/>
    <Route path='/inventory' element={<Inventory/>}/>
    <Route path='/return-expire' element={<ReturnExpire/>}/>
    
    
  </Routes>
);

export default StockKeeperRoutes;