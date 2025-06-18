import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/Admin/Dashboard';
import UserManagement from '../pages/Admin/UserManagement';
import Attendance from '../pages/Admin/Attendance';

const AdminRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="usermanagement" element={<UserManagement />} />
    <Route path="attendance" element={<Attendance />} />
    {/* Other admin-specific routes */}
  </Routes>
);

export default AdminRoutes;
