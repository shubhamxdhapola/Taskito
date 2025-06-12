import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineTrash, HiPlusCircle } from "react-icons/hi";
import { LuPaperclip } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if(!option.trim()) return toast.error("Attachment can't be empty")
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      toast.success("Attachment added");
      setOption("");
    }
  };

  const handleDeleteOption = (index) => {
    const updatedArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedArr);
    toast.success("Attachment removed");
  };

  return (
    <div>
      {attachments.map((item, index) => (
        <div
          key={item}
          className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <div className="flex-1 flex items-center gap-3  border-gray-100">
            <LuPaperclip className="text-gray-400" />
            <a
              href={item}
              className="text-xs text-black hover:text-primary/80 duration-200"
              target="_blank"
            >
              {item}
            </a>
          </div>

          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-5 mt-4">
        <div className="flex-1 flex items-center gap-3 border border-gray-100 rounded-md px-3">
          <LuPaperclip className="text-gray-400" />
          <input
            type="text"
            placeholder="Add File Link"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-[13px] text-black outline-none bg-white py-2"
          />
        </div>
        <button className="card-btn text-nowrap" onClick={handleAddOption}>
          <HiPlusCircle className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
