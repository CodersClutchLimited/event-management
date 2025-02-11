import React from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { RegisteredEv } from "@/constants/tablesData";
import DynamicTableHeaders from "../common/DynamicTableHeaders";
import { formatReadableDate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import {
  GetUserWaitlistedEvents,
  IWaitlistedEvent,
} from "@/lib/actions/user/getAllUser";

const WaitlistedEvent = async ({ userId }: { userId: string }) => {
  const { data, status } = await GetUserWaitlistedEvents(userId);

  return (
    <div className="mt-5 overflow-x-auto">
      <Table className="w-full table-auto text-sm sm:text-base">
        <DynamicTableHeaders headers={RegisteredEv} />

        <TableBody>
          {data?.map((item: IWaitlistedEvent) => (
            <TableRow key={item.eventId} className="whitespace-nowrap">
              <TableCell>{item.eventId}</TableCell>
              <TableCell>{item?.title}</TableCell>
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
              <TableCell>
                {item?.schedule?.end
                  ? formatReadableDate(item.schedule.end)
                  : "No date"}
              </TableCell>
              <TableCell>
                {item?.joinedAt
                  ? formatReadableDate(item.joinedAt.toString())
                  : "No date"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WaitlistedEvent;
