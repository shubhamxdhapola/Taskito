import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const DeleteAlert = ({ content, onDelete, onClose, loading }) => {
  const { deleteTaskLoading } = useSelector((state) => state.tasks);
  return (
    <div>
      <p className="text-sm">{content}</p>
      <div className="flex justify-end mt-6 gap-2">
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 text-xs md:text-sm font-md text-green-500 whitespace-nowrap bg-green-50 border border-green-200/50 rounded-lg px-4 py-2 cursor-pointer hover:bg-green-100 hover:text-green-600 duration-300"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 text-xs md:text-sm font-md text-rose-500 whitespace-nowrap bg-rose-50 border border-rose-100 rounded-lg px-4 py-2 cursor-pointer hover:bg-red-100 hover:text-red-600 duration-300"
          onClick={onDelete}
          disabled={deleteTaskLoading}
        >
          {deleteTaskLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
