import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/login");
      })
      .catch(() => toast.error("Error in logging out!"));
  },[]);
};

export default Logout;
