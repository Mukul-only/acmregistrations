import {
  Calendar,
  Users,
  UserCheck,
  UsersRound,
  TrendingUp,
} from "lucide-react";

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: Calendar,
      iconBg: "bg-[#2a2a2a]",
      textColor: "text-blue-400",
    },
    {
      title: "Total Registrations",
      value: stats.totalRegistrations,
      icon: UserCheck,
      iconBg: "bg-[#2a2a2a]",
      textColor: "text-green-400",
    },
    {
      title: "Individual",
      value: stats.individualRegistrations,
      icon: Users,
      iconBg: "bg-[#2a2a2a]",
      textColor: "text-purple-400",
    },
    {
      title: "Group",
      value: stats.groupRegistrations,
      icon: UsersRound,
      iconBg: "bg-[#2a2a2a]",
      textColor: "text-orange-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="stat-card group relative overflow-hidden">
            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`${stat.iconBg} p-4 rounded-xl backdrop-blur-sm border border-[#2a2a2a]`}
                >
                  <Icon className={stat.textColor} size={20} />
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-xs font-normal mb-3">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <div className="h-px w-16 bg-[#2a2a2a] rounded-full"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsOverview;
