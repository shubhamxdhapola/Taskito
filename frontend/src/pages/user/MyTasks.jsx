import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../redux/slices/tasksSlice";
import LoadingScreen from "../../components/ui/LoadingScreen";

const MyTasks = () => {
  
  const [filterStatus, setFilterStatus] = useState("All");
  const { allTasks, statusSummary, loading } = useSelector(
    (state) => state.tasks
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
  });

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

  const handleOnClick = (taskId) => {
    navigate(`/user/task-details/${taskId}`);
  };

  useEffect(() => {
    getAllTasks(filterStatus);
    return () => {};
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <h2 className="text-xl md:text-xl font-medium" data-aos="fade-right">
            My Tasks
          </h2>

          <TaskStatusTabs
            tabs={tabs}
            activeTab={filterStatus}
            setActiveTab={setFilterStatus}
          />
        </div>
        {loading ? (
          <LoadingScreen height="70dvh" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            {allTasks.length > 0 ? (
              allTasks?.map((item, index) => (
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
                  onClick={() => handleOnClick(item._id)}
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

export default MyTasks;
