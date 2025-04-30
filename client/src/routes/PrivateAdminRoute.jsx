import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AdminAuthContext from "../context/AdminAuthContext";

const PrivateAdminRoute = ({ children }) => {
  const { adminData, loading } = useContext(AdminAuthContext);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return adminData ? children : <Navigate to="/admin/login" replace />;
};

export default PrivateAdminRoute;
