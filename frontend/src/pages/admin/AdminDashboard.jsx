import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdminDashboardData } from "../../redux/slices/adminDashboardSlice";
import moment from "moment";
import { addThousandsSeparator, greetUser } from "../../utils/helper";
import InfoCard from "../../components/Cards/InfoCard";
import { IoMdCard } from "react-icons/io";
import { LuArrowRight } from "react-icons/lu";
import TaskListTable from "../../components/TaskListTable";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";
import LoadingScreen from "../../components/ui/LoadingScreen";

const COLORS = [`#8D51FF`, "#00BBDB", "#7BCE00"];

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { dashboardData, loading } = useSelector(
    (state) => state.adminDashboard
  );
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    dispatch(getAdminDashboardData())
      .unwrap()
      .then((res) => prepareChartData(res?.charts || null));
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const onSeeMore = () => {
    navigate("/admin/tasks");
  };

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const PriorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];

    setBarChartData(PriorityLevelData);
  };

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5" data-aos="fade-right">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl greet-user text-gray-800">
              {" "}
              {`${greetUser()}, ${user?.name.split(" ")[0]}`}
            </h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-primary"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color="bg-violet-500"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="In Progress Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.InProgress || 0
            )}
            color="bg-cyan-500"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Completed Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-lime-500"
          />
        </div>
      </div>
      {loading ? (
        <LoadingScreen height="70dvh" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 my-4 md:my-6">
          <div data-aos="fade-right">
            <div className="card">
              <div className="flex items-center justify-between mb-4 sm:mb-0">
                <h5 className="font-medium">Task Distribution</h5>
              </div>
              <CustomPieChart data={pieChartData} colors={COLORS} />
            </div>
          </div>

          <div data-aos="fade-left">
            <div className="card">
              <div className="flex items-center justify-between">
                <h5 className="font-medium">Task Priority Levels</h5>
              </div>
              <CustomBarChart data={barChartData} />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="card" data-aos="fade-right">
              <div className="flex items-center justify-between">
                <h5 className="text-md sm:text-lg">Recent Tasks</h5>
                <button className="card-btn" onClick={onSeeMore}>
                  See All <LuArrowRight className="text-base" />
                </button>
              </div>
              {dashboardData?.recentTasks.length > 0 ? (
                <TaskListTable tableData={dashboardData?.recentTasks || []} />
              ) : (
                <div className="flex justify-center items-center col-span-12 h-[30dvh]">
                  <p className="text-md font-medium text-gray-700">
                    No tasks to show!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
