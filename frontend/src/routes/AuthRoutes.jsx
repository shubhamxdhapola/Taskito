import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? (
    user.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/user/dashboard" />
    )
  ) : (
    <Outlet />
  );
};

export default AuthRoutes;
