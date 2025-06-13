import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../redux/slices/tasksSlice";
import LoadingScreen from "../../components/ui/LoadingScreen";

const ManageTasks = () => {
  
  const [filterStatus, setFilterStatus] = useState("All");
  const { allTasks, loading, statusSummary } = useSelector(
    (state) => state.tasks
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const getAllTasks = async () => {
    try {
      const status = { status: filterStatus === "All" ? "" : filterStatus };
      dispatch(getTasks(status));
    } catch (err) {
      console.error("Error in fetching tasks : ", err);
      toast.error("Error in fetching tasks");
    }
  };

  const tabs = [
    { label: "All", count: statusSummary?.all || 0 },
    { label: "Pending", count: statusSummary?.pendingTasks || 0 },
    { label: "In Progress", count: statusSummary?.inProgressTasks || 0 },
    { label: "Completed", count: statusSummary?.completedTasks || 0 },
  ];

  const handleOnClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "task_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error in downloading report : ", error);
      toast.error("Error in downloading report");
    }
  };

  useEffect(() => {
    getAllTasks();
    return () => {};
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex items-center justify-between gap-3 " data-aos="fade-right">
            <h2 className="text-lg md:text-xl font-medium">My Tasks</h2>
            <button
              className="flex lg:hidden download-btn px-2"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              Download Report
            </button>
          </div>

          <div className="flex items-center gap-3" data-aos="fade-left">
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
            <button
              className="hidden lg:flex download-btn"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              Download Report
            </button>
          </div>
        </div>

        {loading ? (
          <LoadingScreen height="70dvh" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            {allTasks.length > 0 ? (
              allTasks?.map((item) => (
                <TaskCard
                  key={item._id}
                  title={item.title}
                  description={item.description}
                  priority={item.priority}
                  status={item.status}
                  progress={item.progress}
                  createdAt={item.createdAt}
                  dueDate={item.dueDate}
                  assignedTo={item.assignedTo?.map(
                    (item) => item.profileImageUrl
                  )}
                  attachmentsCount={item.attachments?.length || 0}
                  completedTodoCount={item.completedTodoCount || 0}
                  todoChecklist={item.todoChecklist || []}
                  onClick={() => handleOnClick(item)}
                />
              ))
            ) : (
              <div className="flex justify-center items-center col-span-12 h-[70dvh]">
                <p className="text-lg font-medium text-gray-700">
                  No tasks to show!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;
