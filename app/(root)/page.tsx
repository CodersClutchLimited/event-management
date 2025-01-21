import DashboardCharts from "@/components/dashboard/DashboardCharts";
import UpcommingEvents from "@/components/event/UpcommingEvents";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Timer, TimerResetIcon } from "lucide-react";
const Home = () => {
  return (
    <div className="flex justify-between gap-5">
      <div className="w-full pb-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Timer className="w-3=5 h-5 text-yellow-600" />
              <CardTitle className="text-sm font-medium">
                Upcomming Events
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Timer className="text-lime-500 w-5 h-5" />
              <CardTitle className="text-sm font-medium">
                Ongoing Events
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <TimerResetIcon className="text-green-600 w-5 h-5" />
              <CardTitle className="text-sm font-medium">
                Compleadte Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <DashboardCharts />
      </div>
      <div className="">
        <UpcommingEvents />
      </div>
    </div>
  );
};

export default Home;
