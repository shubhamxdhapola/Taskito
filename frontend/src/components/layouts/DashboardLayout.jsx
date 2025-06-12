import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1100px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-4 md:mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
