import DashboardCharts from "@/components/dashboard/DashboardCharts";
import CancelledEventsLength from "@/components/event/CancelledEventsLength";
import CompletedEventLength from "@/components/event/CompletedEventLength";
import UpcommingEvents from "@/components/event/UpcommingEvents";
import UpcommingEventsLength from "@/components/event/UpcommingEventsLength";
import { Skeleton } from "@/components/ui/skeleton";
// import { Eventstatus } from "@/lib/actions/event/GetAllEvent";
import { Suspense } from "react";

const Home = async () => {
  // const { upcommingEventLength } = await Eventstatus();

  // console.log(upcommingEventLength);

 

  return (
    <div className="flex justify-between gap-5  max-md:flex-wrap">
      <div className="w-full pb-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          <Suspense>
            < UpcommingEventsLength/>
            <CancelledEventsLength/>
            <CompletedEventLength/>
          </Suspense>
        </div>
        <DashboardCharts />
      </div>
      <div>
        <Suspense
          fallback={Array.from({ length: 7 }).map((item, index) => (
            <Skeleton className="w-[300px] p-6 h-10 mt-2" key={index} />
          ))}
        >
          <UpcommingEvents />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
