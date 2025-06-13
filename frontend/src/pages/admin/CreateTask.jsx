import DashboardLayout from "../../components/layouts/DashboardLayout";
import { axiosInstance } from "../../utils/axiosInstance";
import { PRIORITY_DATA } from "../../utils/data";
import { API_PATHS } from "../../utils/apiPaths";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import SelectDropdown from "../../components/inputs/SelectDropdown";
import SelectedUsers from "../../components/inputs/SelectedUsers";
import TodoListInput from "../../components/inputs/TodoListInput";
import AddAttachmentsInput from "../../components/inputs/AddAttachmentsInput";
import { validateCreateTaskForm } from "../../utils/helper";
import { useEffect } from "react";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";
import { useDispatch } from "react-redux";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../../redux/slices/tasksSlice";

const CreateTask = () => {
  const initialTaskData = {
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  };

  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];

  const [taskData, setTaskData] = useState(initialTaskData);
  const [currentTask, setCurrentTask] = useState(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
  },[]);

  const handleOnChange = (key, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    const isFormOkay = validateCreateTaskForm(
      taskData.title,
      taskData.description,
      taskData.priority,
      taskData.dueDate,
      taskData.assignedTo,
      taskData.todoChecklist
    );

    if (isFormOkay === true) {
      if (taskId) {
        handleUpdateTask();
        return;
      }
      handleCreateTask();
    }
  };

  const handleCreateTask = async () => {
    try {
      setLoading(true);
      const todoList = taskData.todoChecklist?.map((item) => ({
        text: item,
        completed: false,
      }));
      const task = {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todoList,
      };

      dispatch(createTask(task))
        .unwrap()
        .then(() => {
          setLoading(false);
          toast.success("Task created successfully");
          setTaskData(initialTaskData);
        });
    } catch (err) {
      setLoading(false);
      toast.error("Error in creating task");
      console.log("Error in creating task : ", err);
    } finally {
      setLoading(false);
    }
  };

  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);

        setTaskData((prevData) => ({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
          todoChecklist:
            taskInfo?.todoChecklist?.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
        }));
      }
    } catch (err) {
      console.error("Error in getting details of task :", err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetailsById(taskId);
    }
    return () => {};
  }, [taskId]);

  const handleUpdateTask = async () => {
    setLoading(true);
    try {
      const todoList = taskData.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist || [];
        const matchedTask = prevTodoChecklist.find((task) => task.text == item);

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });
      const task = {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todoList,
      };
      dispatch(updateTask({ task, taskId }))
        .unwrap()
        .then(() => {
          toast.success("Task updated successfully");
        });
    } catch (err) {
      setLoading(false);
      console.log("Error in updating task!", err);
      toast.error("Error in updating task");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async () => {
    try {
      dispatch(deleteTask(taskId)).then(() => {
        setOpenDeleteAlert(false);
        toast.success("Task deleted successfully");
        navigate("/admin/tasks");
      });
    } catch (err) {
      console.log("Error in deleting task : ", err);
      toast.error("Error in deleting task");
    }
  };

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-medium text-base-200">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="" /> Delete
                </button>
              )}
            </div>
            <div className="mt-4" >
              <label className="text-sm font-medium text-slate-600">
                Task Title
              </label>
              <input
                type="text"
                placeholder="Add feedback feature to the app"
                className="form-input"
                value={taskData.title}
                onChange={(e) => handleOnChange("title", e.target.value)}
              />
            </div>
            <div className="mt-3" >
              <label className="text-sm font-medium text-slate-600">
                Description
              </label>
              <textarea
                placeholder="Describe your task here"
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={(e) => handleOnChange("description", e.target.value)}
              ></textarea>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-12 sm:col-span-4" >
                <label className="text-sm font-medium text-slate-600">
                  Priority
                </label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleOnChange("priority", value)}
                  placeholder="Select Priority"
                ></SelectDropdown>
              </div>

              <div className="col-span-12 sm:col-span-4"  >
                <label className="text-sm font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  type="date"
                  min={today}
                  placeholder="Create App UI"
                  className="form-input"
                  value={taskData.dueDate}
                  onChange={(e) => handleOnChange("dueDate", e.target.value)}
                />
              </div>

              <div className="col-span-12 sm:col-span-3">
                <label className="text-sm font-medium text-slate-600 whitespace-nowrap">
                  Assign To{" "}
                </label>
                <SelectedUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => {
                    handleOnChange("assignedTo", value);
                  }}
                />
              </div>
            </div>

            <div className="mt-3" >
              <label className="text-sm font-medium text-slate-600">
                TODO CHECKLIST
              </label>
              <TodoListInput
                todoList={taskData?.todoChecklist}
                setTodoList={(value) => handleOnChange("todoChecklist", value)}
              />
            </div>

            <div className="mt-3" >
              <label className="text-sm font-medium text-slate-600">
                Add Attachments
              </label>
              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) => handleOnChange("attachments", value)}
              />
            </div>

            <div className="flex justify-end mt-7">
              <button
                className="add-btn"
                disabled={loading}
                onClick={handleOnSubmit}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : taskId ? (
                  "UPDATE TASK"
                ) : (
                  "CREATE TASK"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want delete this task?"
          onDelete={() => handleDeleteTask()}
          onClose={() => setOpenDeleteAlert(false)}
        ></DeleteAlert>
      </Modal>
    </DashboardLayout>
  );
};

export default CreateTask;
