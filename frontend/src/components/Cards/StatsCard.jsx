const StatsCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-gray-50";
      case "Completed":
        return "text-green-500 bg-gray-50";
      default:
        return "text-violet-500 bg-gray-50";
    }
  };
  return (
    <div
      className={`flex-1 text-[12px] font-medium ${getStatusTagColor()} px-2 sm:px-4 py-2 rounded whitespace-nowrap`}
    >
      <span className="text-[12px] font-medium text-center">{count}</span> <br /> {label}
    </div>
  );
};

export default StatsCard;
