import EventDetails from "@/components/event/EventDetails";
import RecentApplicant from "@/components/event/RecentApplicant";
import WaitlistUsers from "@/components/event/WaitlistUsers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventData } from "@/constants/sampleData";
import { GetSingleEvent } from "@/lib/actions/event/GetAllEvent";
import { EventInterfaceType } from "@/lib/types";
import { formatReadableDate } from "@/lib/utils";
import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  console.log(slug);
  // find event base on event id
  const { data } = await GetSingleEvent(slug);
  console.log("event", Event);

  return (
    <div>
      {/* event details */}
      <EventDetails event={data as unknown as EventInterfaceType} />
      <div className="grid grid-cols-2 gap-4">
        <RecentApplicant event={data} />
        <WaitlistUsers />
      </div>
    </div>
  );
};

export default page;
