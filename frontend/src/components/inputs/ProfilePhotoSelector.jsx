import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../redux/slices/uploadSlice";
import toast from "react-hot-toast";
import { Loader, Rss } from "lucide-react";

const ProfilePhotoSelector = ({ setFormData }) => {
  
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState(null);
  const { uploading } = useSelector((state) => state.upload);
  const { loading } = useSelector((state) => state.auth);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      dispatch(uploadImage(formData))
        .unwrap()
        .then((profileImageUrl) => {
          setProfilePic(profileImageUrl);
          setFormData((prevData) => ({
            ...prevData,
            profileImageUrl
          }));
          toast.success("Profile image updated!");
        })
        .catch(() => toast.error("Error in uploading image"));
    }
  };

  const handleRemoveImage = () => {
    setProfilePic(null);
    setFormData((prevData) => ({
      ...prevData,
      profileImageUrl: null,
    }));
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!profilePic ? (
        <div className="w-20 h-20 flex items-center justify-center bg-blue-100/50 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-primary" />
          <button
            type="button"
            className={`w-8 h-8 flex items-center justify-center bg-primary hover:bg-primary/80 duration-300 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer ${
              (loading || uploading) && "!cursor-not-allowed !bg-blue-400"
            }`}
            onClick={onChooseFile}
            disabled={uploading || loading}
          >
            {uploading ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              <LuUpload />
            )}
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={profilePic}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            className={`w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-500/80 duration-300 cursor-pointer text-white rounded-full absolute -bottom-1 -right-1 ${
              loading && "!cursor-not-allowed !bg-red-400"
            }`}
            type="button"
            onClick={handleRemoveImage}
            disabled={loading}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
