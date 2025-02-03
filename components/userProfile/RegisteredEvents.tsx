import React from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import DynamicTableHeaders from "../common/DynamicTableHeaders";
import { RegisteredEv } from "@/constants/tablesData";
import { formatReadableDate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { GetUserRegisteredEvents } from "@/lib/actions/user/getAllUser";


const RegisteredEvents = async ({userId}:{userId: string}) => {

  const { data, status } = await GetUserRegisteredEvents(userId);
  
  return (
    <div className="mt-5 overflow-x-auto">
      <Table className="w-full table-auto text-sm sm:text-base">
        <DynamicTableHeaders headers={RegisteredEv} />
        <TableBody>
          {data?.map((item: { _id:string ,eventId: string; registeredAt: Date; title?: string; status?: string; schedule?: { start?: Date; end?: Date } }) => (
            <TableRow key={item.eventId} className="whitespace-nowrap">
              <TableCell>{item.eventId}</TableCell>
              <TableCell>{item?.title || "Unknown Event"}</TableCell>
              <TableCell>
                <Badge
                  className={
                    item?.status === "cancelled"
                      ? "bg-red-600"
                      : item?.status === "upcoming"
                      ? "bg-yellow-600"
                      : item?.status === "ongoing"
                      ? "bg-lime-500"
                      : "bg-green-600"
                  }
                >
                  {item?.status || "N/A"}
                </Badge>
              </TableCell>
              <TableCell>
                {item?.schedule?.start
                  ? formatReadableDate(item.schedule.start)
                  : "No date"}
              </TableCell>
              {/* <TableCell>
                <Badge
                  className={
                    item?.registeredEvents?.state === "cancelled"
                      ? "bg-red-600"
                    
                      : "bg-green-700"
                  }
                >
                  {item?.status || "N/A"}
                </Badge>
              </TableCell> */}

              <TableCell>
                {item?.schedule?.end
                  ? formatReadableDate(item.schedule.end)
                  : "No date"}
              </TableCell>
              <TableCell>
                {item?.registeredAt
                  ? formatReadableDate(item.registeredAt.toString())
                  : "No date"}
              </TableCell>
              <TableCell>
              {/* <RevomeFromEvent/> */}
              </TableCell>
              {/* <TableCell>{formatReadableDate(item.schedule.start?? "No Date")}</TableCell>
              <TableCell>{formatReadableDate(item.schedule.end?? "No Date")}</TableCell>
              <TableCell>{formatReadableDate(item.createdAt?? "No Date")}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RegisteredEvents;
