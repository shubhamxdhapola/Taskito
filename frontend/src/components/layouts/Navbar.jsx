import { useEffect, useRef, useState } from "react";
import SideMenu from "./SideMenu";
import { HiOutlineX } from "react-icons/hi";
import { AlignRight, X } from "lucide-react";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const Navbar = ({ activeMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const navRef = useRef(null);

  function handleHideNavbar(e) {
    if (navRef.current && !navRef.current.contains(e.target)) {
      setOpenSideMenu(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleHideNavbar);
    return () => {
      document.removeEventListener("mousedown", handleHideNavbar);
    };
  }, []);

  // useEffect(() => {
  //   document.addEventListener("scroll", handleHideNavbar);
  //   return () => {
  //     document.removeEventListener("scroll", handleHideNavbar);
  //   };
  // }, []);

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/login");
      })
      .catch(() => toast.error("Error in logging out"));
  };

  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-3 px-4 sm:py-4 sm:px-6 sticky top-0 z-30 justify-between">
      <div className="flex gap-4 items-center">
        <h2 className="text-lg font-medium text-black logo">Taskito</h2>
        <div
          ref={navRef}
          className={`fixed top-[61px] -ml-4 bg-white duration-300 ${
            openSideMenu ? "left-[20px]" : "-left-90"
          }`}
        >
          <SideMenu activeMenu={activeMenu} />
        </div>
      </div>
      <div className="flex">
        <button
          className="flex items-center gap-3 text-[13px] font-medium text-gray-800 hover:text-primary bg-gray-100 hover:bg-blue-50 px-4 py-1.5 rounded-lg border border-gray-200 cursor-pointer duration-300 max-[1100px]:hidden "
          onClick={handleLogout}
        >
          <LuLogOut /> Logout
        </button>
        <button
          className="block min-[1100px]:hidden text-black cursor-pointer"
          onClick={() => {
            setOpenSideMenu(!openSideMenu);
          }}
        >
          {openSideMenu ? (
            <X className="text-2xl" />
          ) : (
            <AlignRight className="text-2xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
