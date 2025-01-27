import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Timer } from "lucide-react";
import { Label } from "../ui/label";
import CountDown from "../common/CountDown";
import { GetLatestUpcomingEvent } from "@/lib/actions/event/GetAllEvent";
import { EventInterfaceType } from "@/lib/types";
import Link from "next/link";

const UpcommingEvents = async () => {
  const response = await GetLatestUpcomingEvent();
  if (response.status !== 200 || !Array.isArray(response.data)) {
    console.error("Failed to fetch events", response);
    return null;
  }
  const data: EventInterfaceType[] = response.data;
  console.log("data", data);

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Timer className="w-3=5 h-5 text-yellow-600" />
          <CardTitle>Upcomming Deadline</CardTitle>
          <Button variant={"link"}>View all</Button>
        </CardHeader>
        <Separator />

        <CardContent>
          {data?.map((item: EventInterfaceType) => (
            <Link
              href={`/event/${item._id}`}
              key={item._id}
              className="-mx-1 flex justify-between items-start space-x-4 rounded-md p-3 transition-all hover:bg-accent bg-accent/50 hover:text-accent-foreground mt-3"
            >
              <div>
                <p className="font-semibold text-sm">{item?.title}</p>
                <p className="font-semibold text-sm text-muted-foreground">
                  Attendies : {item?.registeredUsers?.length}
                </p>
              </div>
              <div>
                <Label className="text-sm font-thin mr-2">Time Left</Label>
                <CountDown
                  registrationDeadline={item.registrationDeadline}
                  status={
                    item.status as
                      | "upcoming"
                      | "ongoing"
                      | "completed"
                      | "cancelled"
                  }
                  eventStart={item.schedule.start}
                />
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default UpcommingEvents;
