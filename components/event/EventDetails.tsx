"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { formatReadableDate } from "@/lib/utils";
import { Separator } from "../ui/separator";
import AuthomaticalyCarasole from "./AuthomaticalyCarasole";
import EventImages from "./EventImages";
import {
  ArrowLeft,
  Bold,
  Italic,
  ListStart,
  MapPin,
  Timer,
  Underline,
} from "lucide-react";
import { Button } from "../ui/button";

const EventDetails = ({ event }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!event.registrationDeadline) return;

    const updateCountdown = () => {
      const now = new Date();
      const deadline = new Date(event?.registrationDeadline);
      const timeLeft = deadline - now;

      if (timeLeft <= 0) {
        setCountdown("Registration closed");
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [event.registrationDeadline]);

  return (
    // <Card>
    //   <CardHeader>
    //     <div className="flex items-center justify-between">
    //       <CardTitle>Event Details</CardTitle>
    //       <div className="flex items-center flex-col gap-3">
    //         <div className="flex items-center gap-3">
    //           <div className="flex items-center gap-2 px-4">
    //             <Label>Event Ststus</Label>
    //             <Separator orientation="vertical" className="mr-2 h-4" />
    //           </div>

    //           <Badge
    //             className={`
    //          ${
    //            event.status === "canceled"
    //              ? "bg-red-600"
    //              : event.status === "upcoming"
    //              ? "bg-yellow-600"
    //              : event.status === "ongoing"
    //              ? "bg-lime-500"
    //              : "bg-green-600"
    //          } `}
    //           >
    //             {event.status}
    //           </Badge>
    //         </div>

    //         <div className="flex items-center gap-3">
    //           <div className="flex items-center gap-2 px-4">
    //             <Label> Closes In</Label>
    //             <Separator orientation="vertical" className="mr-2 h-4" />
    //           </div>

    //           <Badge>{countdown}</Badge>
    //         </div>
    //       </div>
    //     </div>
    //   </CardHeader>

    //   <CardContent>
    //     <Label className="text-muted-foreground">Event Name :</Label>
    //     <p>{event.title}</p>
    //     <Label className="text-muted-foreground">Event Description</Label>
    //     <p>{event.description}</p>
    //   </CardContent>
    // </Card>
    <div>
      <Button size={"sm"}>
        {" "}
        <ArrowLeft /> Back
      </Button>
      <div className="flex gap-2">
        <div>
          <div className="flex">
            <EventImages />
            <AuthomaticalyCarasole />
          </div>
        </div>
        {/* event details */}
        <div className="flex ">
          <div>
            <h2 className="text-2xl font-bold">{event?.title}</h2>
            <p className="text-muted-foreground">{event?.description}</p>

            {/* Location */}
            <div className="flex items-center gap-3 mt-3">
              <MapPin className="w-3 h-3" />
              <p className="text-sm">Location:</p>
              <p className="text-sm">{event?.location}</p>
            </div>

            {/* Category */}
            <div className="flex items-center gap-3 mt-2">
              <Bold className="w-3 h-3 text-yellow-400" />
              <p className="text-sm">Status:</p>
              <p className="text-sm">
                <Badge
                  className={
                    event?.status === "canceled"
                      ? "bg-red-600"
                      : event?.status === "upcoming"
                      ? "bg-yellow-600"
                      : event?.status === "ongoing"
                      ? "bg-lime-500"
                      : "bg-green-600"
                  }
                >
                  {event?.status}
                </Badge>
              </p>
            </div>

            {/* Services */}
            <div className="flex items-center gap-3 mt-2">
              <ListStart className="w-3 h-3 text-gray-500" />
              <p className="text-sm">Start Date:</p>
              <p className="text-sm">
                {formatReadableDate(event?.schedule?.start)}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <ListStart className="w-3 h-3 text-gray-500" />
              <p className="text-sm">End Date:</p>
              <p className="text-sm">
                {formatReadableDate(event?.schedule?.end)}
              </p>
            </div>

            {/* Condition */}
            <div className="flex items-center gap-3 mt-2">
              <Underline className="w-3 h-3 text-gray-500" />
              <p className="text-sm">Maximum Participants :</p>
              <p className="text-sm">{event?.maxParticipants}</p>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Timer className="w-3 h-3 text-gray-500" />
              <p className="text-sm">Registration Deadline :</p>
              <p className="text-sm">
                {formatReadableDate(event?.registrationDeadline)}
              </p>
              {event?.status === "completed" ||
              event?.status === "canceled" ? null : (
                <Badge>{countdown}</Badge>
              )}
            </div>

            {/* Available Sizes */}
          </div>
          <div>{/* Admin Actions */}</div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
