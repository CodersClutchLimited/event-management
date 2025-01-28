import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import DynamicTableHeaders from "../common/DynamicTableHeaders";
import { RegisteredEv } from "@/constants/tablesData";
import { formatReadableDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

const RegisteredEvents = ({ userId }: { userId: string }) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`/api/user/${userId}`);  // Adjust the API endpoint to fetch user data
      const data = await response.json();
      if (data.status === 200) {
        setUserData(data.data);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5 overflow-x-auto">
      <Table className="w-full table-auto text-sm sm:text-base">
        <DynamicTableHeaders
          headers={RegisteredEv}
        />

        <TableBody>
          {userData.registeredEvents.map((item: any, index: number) => (
            <TableRow key={item._id} className="whitespace-nowrap">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.eventId.title}</TableCell>  {/* Assuming the event has a `title` field */}
              <TableCell>
                <Badge
                  className={
                    item.eventId.status === "canceled"
                      ? "bg-red-600"
                      : item.eventId.status === "upcoming"
                      ? "bg-yellow-600"
                      : item.eventId.status === "ongoing"
                      ? "bg-lime-500"
                      : "bg-green-600"
                  }
                >
                  {item.eventId.status}
                </Badge>
              </TableCell>
              <TableCell>
                {item.eventId.schedule?.start == null ||
                item.eventId.schedule?.start === undefined
                  ? "no date"
                  : formatReadableDate(item.eventId.schedule.start)}
              </TableCell>
              <TableCell>{formatReadableDate(item.eventId.schedule.end)}</TableCell>
              <TableCell>{formatReadableDate(item.eventId.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RegisteredEvents;
