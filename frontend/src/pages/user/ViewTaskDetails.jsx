import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import InfoBox from "../../components/InfoBox";
import moment from "moment";
import AvatarGroup from "../../components/AvatarGroup";
import TodoChecklist from "../../components/TodoChecklist";
import Attachment from "../../components/Attachment";
import { useDispatch } from "react-redux";
import { updateTodoCheckList } from "../../redux/slices/tasksSlice";
import LoadingScreen from "../../components/ui/LoadingScreen";

const ViewTaskDetails = () => {
  
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [updatingTodoId, setUpdatingTodoId] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  const getTaskDetailsById = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );
      if (response.data && response.status == 200) {
        const taskInfo = response.data;
        setTask(taskInfo);
        setLoading(false);
      }
    } catch (err) {
      console.log("Error in getting task details : ", err);
      toast.error("Error in getting task details");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTodoChecklist = async (index) => {
    const todoChecklist = task?.todoChecklist.map((item) => ({ ...item }));
    const taskId = id;
    setUpdatingTodoId(todoChecklist[index]._id);

    if (todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed;
    }

    try {
      const response = await dispatch(
        updateTodoCheckList({ taskId, todoChecklist })
      ).unwrap();
      setUpdatingTodoId(null)

      if (response.status === 200) {
        setTask(response.data?.task || task);
      } else {
        todoChecklist[index].completed = !todoChecklist[index].completed;
      }
    } catch (error) {
      todoChecklist[index].completed = !todoChecklist[index].completed;
    } finally {
      setUpdatingTodoId(null)
    }
  };

  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsById();
    }
    return () => {};
  }, [id]);
  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {loading ? (
          <LoadingScreen height="80dvh" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
            <div className="form-card col-span-3" data-aos="fade-right">
              <div className="flex flex-col-reverse gap-2 sm:flex-row items-start sm:items-center justify-between">
                <h2 className="text-sm sm:text-md md:text-lg font-medium">
                  {task?.title}
                </h2>
                <div
                  className={`text-[11px] md:text-[13px] font-medium ${getStatusTagColor(
                    task?.status
                  )} px-4 py-0.5 rounded`}
                >
                  {task?.status}
                </div>
              </div>
              <div className="mt-4">
                <InfoBox label="Description" value={task?.description} />
              </div>
              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={task?.priority} />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <InfoBox
                    label="Due Data"
                    value={
                      task?.dueDate
                        ? moment(task?.dueDate).format("Do MMM YYYY")
                        : "N/A"
                    }
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-500">
                    Assignment To
                  </label>
                  <AvatarGroup
                    avatars={
                      task?.assignedTo?.map((item) => item?.profileImageUrl) ||
                      []
                    }
                    maxVisible={5}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="text-xs font-medium text-slate-500">
                  Todo Checklist
                </label>
                {task?.todoChecklist?.map((item, index) => (
                  <TodoChecklist
                    key={`todo_${index}`}
                    id={item._id}
                    updatingTodoId={updatingTodoId}
                    text={item?.text}
                    isChecked={item?.completed}
                    onChange={() => handleUpdateTodoChecklist(index)}
                  />
                ))}
              </div>
              {task?.attachments?.length > 0 && (
                <div className="">
                  <label className="text-xs font-medium text-slate-500">
                    Attachments
                  </label>
                  {task?.attachments?.map((link, index) => (
                    <Attachment
                      key={`link_${index}`}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;
