import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../../redux/slices/adminUsersSlice";
import { LuFileSpreadsheet } from "react-icons/lu";
import UserCard from "../../components/Cards/UserCard";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import LoadingScreen from "../../components/ui/LoadingScreen";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.adminUsers);
  console.log(users)

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error in downloading report : ", error);
      toast.error("Error in downloading report");
    }
  };

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        <div className="flex md:flex-row items-center justify-between">
          <h2 className="text-lg md:text-xl font-medium" data-aos="fade-right">
            Team Members
          </h2>
          <button
            className="flex md:flex download-btn "
            data-aos="fade-left"
            onClick={handleDownloadReport}
          >
            <LuFileSpreadsheet className="text-md sm:text-lg" />
            Download Report
          </button>
        </div>
        {loading ? (
          <LoadingScreen height="70dvh" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            {users.length > 0 ? (
              users?.map((user) => <UserCard key={user._id} userInfo={user} />)
            ) : (
              <div className="flex justify-center items-center col-span-12 h-[70dvh]">
                <p className="text-lg font-medium text-gray-700">
                  No users to show!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
