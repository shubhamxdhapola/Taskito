import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const { user } = useSelector((state) => state.auth);
  return user && user.role === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;
