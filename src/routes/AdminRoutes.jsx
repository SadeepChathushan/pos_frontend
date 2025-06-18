import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/Admin/Dashboard';
import UserManagement from '../pages/Admin/UserManagement';

const AdminRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="usermanagement" element={<UserManagement />} />
    {/* Other admin-specific routes */}
  </Routes>
);

export default AdminRoutes;
