import React from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import DynamicTableHeaders from "../common/DynamicTableHeaders";
import { EventTableHeaderData, HostTableData } from "@/constants/tablesData";
// import { EventData } from "@/constants/sampleData";
import { formatReadableDate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import EventAction from "./EventAction";
import { EventInterfaceType, IUser } from "@/lib/types";
import ProfileComponent from "../common/ProfileComponent";

const EventTable = ({ users }: { users: IUser[] }) => {
  return (
    <Table className="mt-5">
      <DynamicTableHeaders headers={HostTableData} />

      <TableBody>
        {users?.map((item: IUser, index) => (
          <TableRow key={item._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {
                <ProfileComponent
                  firstName={item?.firstName}
                  lastName={item?.lastName}
                  middleName={item.initial}
                  email={item.email}
                />
              }
            </TableCell>
            <TableCell>{item?.phoneNumber}</TableCell>
            {/* <TableCell>{formatReadableDate(item.schedule.end)}</TableCell> */}
            <TableCell>
              <Badge
                className={
                  item.status === "blocked"
                    ? "bg-red-600"
                    : item.status === "suspended"
                    ? "bg-yellow-600"
                    : "bg-green-600"
                }
              >
                {item.status}
              </Badge>
            </TableCell>
            {/* <TableCell>{item.registeredUsers.length}</TableCell> */}
            {/* <TableCell>{item.maxParticipants}</TableCell> */}

            {/* <TableCell>{formatReadableDate(item.createdAt)}</TableCell> */}
            {/* <TableCell>{<EventAction event={item} />}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EventTable;
