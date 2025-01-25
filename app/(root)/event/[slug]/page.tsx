import EventDetails from "@/components/event/EventDetails";
import RecentApplicant from "@/components/event/RecentApplicant";
import WaitlistUsers from "@/components/event/WaitlistUsers";
import { GetSingleEvent } from "@/lib/actions/event/GetAllEvent";
import { EventInterfaceType } from "@/lib/types";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  // Find event based on event ID
  const { data } = await GetSingleEvent(slug);

  return (
    <div>
      {/* Event details */}
      <EventDetails event={data as unknown as EventInterfaceType} />
      <div className="grid grid-cols-2 gap-4">
        <RecentApplicant event={data} />
        <WaitlistUsers event={data} />
      </div>
    </div>
  );
};

export default page;
