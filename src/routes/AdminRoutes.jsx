import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/Admin/Dashboard';
import UserManagement from '../pages/Admin/UserManagement';
import Employee from '../pages/Admin/Employee';

const AdminRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="usermanagement" element={<UserManagement />} />
    <Route path="employee" element={<Employee />} />
    {/* Other admin-specific routes */}
  </Routes>
);

export default AdminRoutes;
