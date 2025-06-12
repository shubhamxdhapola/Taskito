import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const DefaultRoute = () => {

  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="login" />;

  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );

};

export default DefaultRoute;
