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
import { formatReadableDate } from "@/lib/utils";
import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  console.log(slug);
  // find event base on event id
  const event = EventData.find((event) => event._id === slug);
  if (!event) return <div>Event not found</div>;
  console.log(event);

  return (
    <div>
      {/* event details */}
      <EventDetails event={event} />
      <div className="grid grid-cols-2 gap-4">
        <RecentApplicant event={event} />
        <WaitlistUsers />
      </div>
    </div>
  );
};

export default page;
