import { Loader } from "lucide-react";

const LoadingScreen = ({ height }) => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: height }}
    >
      <Loader className="animate-spin text-gray-800" size={30} />
    </div>
  );
};

export default LoadingScreen;
