// src/routes/CashierRoutes.jsx
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Cashier/Dashboard';
import CashierBilling from '../pages/Cashier/CashierBilling';
import CustomerHistory from '../pages/Cashier/CustomerHistory';

const CashierRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/billing"   element={<CashierBilling />} />
    <Route path="/customer-history"   element={<CustomerHistory />} />
    {/* Add more cashier-specific routes like: */}
    {/* <Route path="billing" element={<Billing />} /> */}
  </Routes>
);

export default CashierRoutes;
