"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { formatReadableDate } from "@/lib/utils";
import { Button } from "../ui/button";
import { EventInterfaceType } from "@/lib/types";
import CountDown from "../common/CountDown";
import EventImages from "./EventImages";
import AuthomaticalyCarasole from "./AuthomaticalyCarasole";
import {
  ArrowLeft,
  Bold,
  ListStart,
  MapPin,
  Timer,
  Underline,
} from "lucide-react";

const EventDetails = ({ event }: { event: EventInterfaceType }) => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Back Button */}
      <Button size={"sm"} className="mb-4 flex items-center">
        <ArrowLeft className="mr-2" /> Back
      </Button>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Images Section */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-muted-foreground mb-4">
            Images
          </h1>
          <div className="flex flex-wrap gap-4">
            <EventImages className="w-full lg:w-1/2" />
            <AuthomaticalyCarasole className="w-full lg:w-1/2" />
          </div>
        </div>

        {/* Event Details Section */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-muted-foreground mb-4">
            Event Details
          </h1>

          <h2 className="text-lg md:text-2xl font-bold">{event?.title}</h2>
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            {event?.description}
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 mt-3 text-sm">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Location:</span> {event?.location}
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 mt-3 text-sm">
            <Bold className="w-4 h-4 text-yellow-400" />
            <span className="font-medium">Status:</span>
            <Badge
              className={`text-white ${
                event?.status === "canceled"
                  ? "bg-red-600"
                  : event?.status === "upcoming"
                  ? "bg-yellow-600"
                  : event?.status === "ongoing"
                  ? "bg-lime-500"
                  : "bg-green-600"
              }`}
            >
              {event?.status}
            </Badge>
          </div>

          {/* Start & End Date */}
          <div className="flex  md:flex-row md:items-center gap-2 mt-3 text-sm">
            <ListStart className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Start Date:</span>
            {formatReadableDate(event?.schedule?.start)}
          </div>
          <div className="flex  md:flex-row md:items-center gap-2 mt-3 text-sm">
            <ListStart className="w-4 h-4 text-gray-500" />
            <span className="font-medium">End Date:</span>
            {formatReadableDate(event?.schedule?.end)}
          </div>

          {/* Maximum Participants */}
          <div className="flex  md:flex-row md:items-center gap-2 mt-3 text-sm">
            <Underline className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Max Participants:</span>
            {event?.maxParticipants}
          </div>

          {/* Registration Deadline */}
          <div className="flex  md:flex-row md:items-center gap-2 mt-3 text-sm">
            <Timer className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Registration Deadline:</span>
            {formatReadableDate(event?.registrationDeadline)}
          </div>

          {/* Countdown Timer */}
          <div className="mt-3">
            <CountDown
              registrationDeadline={event?.registrationDeadline}
              eventStart={event?.schedule?.start}
              status={event.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
