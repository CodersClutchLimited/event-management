import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Timer } from "lucide-react";
import { EventData } from "@/constants/sampleData";
import { Label } from "../ui/label";
import CountDown from "../common/CountDown";

const UpcommingEvents = () => {
  const upcommingDeadline = EventData.filter(
    (event) => event.status === "upcoming"
  );

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
          {upcommingDeadline.map((item) => (
            <div
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
                <CountDown date={item.registrationDeadline} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default UpcommingEvents;
