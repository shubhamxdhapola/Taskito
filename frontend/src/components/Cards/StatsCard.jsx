const StatsCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "Assigned" :
        return " text-orange-500 bg-gray-100 border border-gray-200";
      case "In Progress":
        return "text-cyan-500 bg-gray-100 border border-gray-200";
      case "Completed":
        return "text-green-500 bg-gray-100 border border-gray-200";
      default:
        return "text-violet-500 bg-gray-50 border border-gray-200";
    }
  };
  return (
    <div
      className={`text-sm  ${getStatusTagColor()} px-4 py-2 rounded whitespace-nowrap`}
    >
      <span className="text-sm  text-center">{count}</span> <br /> {label}
    </div>
  );
};

export default StatsCard;
