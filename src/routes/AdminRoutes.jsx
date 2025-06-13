import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/Admin/Dashboard';

const AdminRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<AdminDashboard />} />
    {/* Other admin-specific routes */}
  </Routes>
);

export default AdminRoutes;
