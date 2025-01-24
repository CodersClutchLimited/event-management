import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ProfileComponent from "../common/ProfileComponent";
// import { formatReadableDate } from "@/lib/utils";
import Link from "next/link";

const WaitlistUsers = ({ event }) => {
  return (
    <Card>
      <CardHeader>
        <CardHeader>
          <CardTitle>Waitlist users</CardTitle>
          <CardDescription>
            View all users currently on the waitlist {event?.waitlist?.length}
          </CardDescription>
        </CardHeader>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {/* indicate if ther is no user register to an event  */}
        {event?.waitlist?.length === 0 && (
          <p className="text-center">Waitlist is empty </p>
        )}
        {event?.waitlist?.map((item) => (
          <Link
            href={`/users/${item?._id}`}
            key={item?._id}
            className="flex items-center justify-between border rounded-md p-2  hover:border-red-700"
          >
            <ProfileComponent
              firstName="kebba"
              lastName="Waiga"
              email="kebbawaiga@gmail.com"
              middleName=""
            />
            {/* <p>{formatReadableDate(item?.registeredAt)}</p> */}
            {/* <RevomeFromEvent item={{}} /> */}
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default WaitlistUsers;
