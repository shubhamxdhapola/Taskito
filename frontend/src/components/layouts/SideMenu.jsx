import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { logout } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const SideMenu = ({ activeMenu }) => {
  const { user } = useSelector((state) => state.auth);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/login");
      })
      .catch(() => toast.error("Error in logging out"));
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
    return () => {};
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-62px)] bg-white border-r border-b border-gray-200/50 sticky top-[62px] -left-[1px] z-40 overflow-y-auto scrollbar-hide">
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className="relative">
          <img          
            src={user?.profileImageUrl || ""}
            alt="profile-image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        </div>
        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}

        <h5 className="text-gray-950 font-medium leading-6 mt-3">
          {user?.name || ""}
        </h5>

        <p className="text-[12px] text-gray-500">{user?.email}</p>
      </div>
      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] text-base-200 ${
            activeMenu == item.label
              ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3"
              : ""
          } py-3 px-6 mb-3 cursor-pointer`}
          onClick={() => navigate(item.path)}
        >
          <item.icon className="text-xl text-base-200" />
          {item.label}
        </button>
      ))}
      <button
        className="w-full flex items-center gap-4 text-[15px] -mt-1 py-3 px-6 mb-3 cursor-pointer min-[1100px]:hidden text-base-200"
        onClick={handleLogout}
      >
        <LuLogOut className="text-xl" /> Logout
      </button>
    </div>
  );
};

export default SideMenu;
