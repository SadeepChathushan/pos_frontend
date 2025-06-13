import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles, userRole }) => {
  // Check if the user role exists and if the role is allowed
  if (!userRole) {
    // Redirect to login page if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Redirect to an unauthorized page if the role is not allowed
    return <Navigate to="/unauthorized" replace />;
  }

  // If allowed, render the protected route's children
  return <Outlet />;
};

export default PrivateRoute;
