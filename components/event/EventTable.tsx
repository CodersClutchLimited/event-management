import React from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import DynamicTableHeaders from "../common/DynamicTableHeaders";
import { EventTableHeaderData } from "@/constants/tablesData";
// import { EventData } from "@/constants/sampleData";
import { formatReadableDate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import EventAction from "./EventAction";
import { EventInterfaceType } from "@/lib/types";

const EventTable = ({ events }: { events: EventInterfaceType[] }) => {
  return (
    <Table className="mt-5">
      <DynamicTableHeaders headers={EventTableHeaderData} />

      <TableBody>
        {events?.map((item: EventInterfaceType) => (
          <TableRow key={item._id}>
            <TableCell>{item.eventId}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{formatReadableDate(item.schedule.start)}</TableCell>
            <TableCell>{formatReadableDate(item.schedule.end)}</TableCell>
            <TableCell>
              <Badge
                className={
                  item.status === "cancelled"
                    ? "bg-red-600"
                    : item.status === "upcoming"
                    ? "bg-yellow-600"
                    : item.status === "ongoing"
                    ? "bg-lime-500"
                    : "bg-green-600"
                }
              >
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>{item.registeredUsers.length}</TableCell>
            <TableCell>{item.maxParticipants}</TableCell>

            <TableCell>{formatReadableDate(item.createdAt)}</TableCell>
            <TableCell>{<EventAction event={item} />}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EventTable;
