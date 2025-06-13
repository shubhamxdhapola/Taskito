import StatsCard from "./StatsCard";

const UserCard = ({ userInfo }) => {
  return (
    <div className="user-card" data-aos="fade-right">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userInfo?.profileImageUrl}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />
          <div className="">
            <p className="text-sm font-medium">{userInfo?.name}</p>
            <p className="text-xs text-gray-500">{userInfo?.email}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-5">
        <StatsCard
          label="Assigned"
          count={
            userInfo?.pendingTasks +
              userInfo?.inProgressTasks +
              userInfo?.completedTasks || 0
          }
          status="Assigned"
        />
        <StatsCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatsCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />
        <StatsCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

export default UserCard;
