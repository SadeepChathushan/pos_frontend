import { Route, Routes } from 'react-router-dom';
import CashierDashboard from '../pages/Cashier/Dashboard';

const CashierRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<CashierDashboard />} />
    {/* Other admin-specific routes */}
  </Routes>
);

export default CashierRoutes;
