// src/routes/CashierRoutes.jsx
import { Route, Routes } from 'react-router-dom';
import CashierDashboard from '../pages/Cashier/Dashboard';

const CashierRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<CashierDashboard />} />
    <Route path="/billing"   element={<CashierBilling />} />
    {/* Add more cashier-specific routes like: */}
    {/* <Route path="billing" element={<Billing />} /> */}
  </Routes>
);

export default CashierRoutes;
