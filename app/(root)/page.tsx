import DashboardCharts from "@/components/dashboard/DashboardCharts";
import UpcommingEvents from "@/components/event/UpcommingEvents";
import StatsCard from "@/components/StatsCard"; // import the new StatsCard component
import { Timer, TimerResetIcon } from "lucide-react";

const Home = () => {
  const cardData = [
    {
      icon: <Timer className="w-3.5 h-5 text-yellow-600" />,
      title: "Upcoming Events",
      value: "$45,231.89",
      percentage: "+20.1% from last month",
    },
    {
      icon: <Timer className="text-lime-500 w-5 h-5" />,
      title: "Ongoing Events",
      value: "+2350",
      percentage: "+180.1% from last month",
    },
    {
      icon: <TimerResetIcon className="text-green-600 w-5 h-5" />,
      title: "Completed Events",
      value: "+12,234",
      percentage: "+19% from last month",
    },
  ];

  return (
    <div className="flex justify-between gap-5">
      <div className="w-full pb-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {cardData.map((card, index) => (
            <StatsCard
              key={index}
              icon={card.icon}
              title={card.title}
              value={card.value}
              percentage={card.percentage}
            />
          ))}
        </div>
        <DashboardCharts />
      </div>
      <div>
        <UpcommingEvents />
      </div>
    </div>
  );
};

export default Home;
