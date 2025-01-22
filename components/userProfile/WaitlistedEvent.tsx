import React from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import DynamicTableHeaders from "../common/DynamicTableHeaders";
import { RegisteredEv } from "@/constants/tablesData";
import { EventData } from "@/constants/sampleData";
import { formatReadableDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

const WaitlistedEvent = () => {
  return (
    <div className="mt-5 overflow-x-auto">
      <Table className="w-full table-auto text-sm sm:text-base">
        <DynamicTableHeaders headers={RegisteredEv} />

        <TableBody>
          {EventData.map((item, index) => (
            <TableRow key={item._id} className="whitespace-nowrap">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>
              <Badge
                className={
                  item.status === "canceled"
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
              <TableCell>{formatReadableDate(item.schedule.start)}</TableCell>
              <TableCell>{formatReadableDate(item.schedule.end)}</TableCell>
              <TableCell>{item.registeredUsers.length}</TableCell>
              <TableCell>{formatReadableDate(item.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WaitlistedEvent;
