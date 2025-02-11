import React from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import DynamicTableHeaders from "../common/DynamicTableHeaders";
import { UserTableHeaderData } from "@/constants/tablesData";
import { Badge } from "../ui/badge";
import { formatReadableDate } from "@/lib/utils";
import ProfileComponent from "@/components/common/ProfileComponent";
import StaffAction from "./StaffAction";
import { IUser } from "@/lib/types";

const StaffTable = ({ staffs }: { staffs: IUser[] }) => {
  return (
    <div>
      <Table className="mt-5">
        <DynamicTableHeaders headers={UserTableHeaderData} />

        <TableBody>
          {staffs?.map((item: IUser, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <ProfileComponent
                  firstName={item.firstName || ""}
                  lastName={item.lastName || ""}
                  middleName={item.initial || ""}
                  email={item.email || ""}
                />
              </TableCell>
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
              <TableCell>{item.phoneNumber || "N/A"}</TableCell>
              <TableCell>
                {item.lastLogin ? formatReadableDate(item.lastLogin) : "No date"}
              </TableCell>
              <TableCell>
                {item.createdAt ? formatReadableDate(item.createdAt) : "No date"}
              </TableCell>
              <TableCell>{<StaffAction item={item as unknown as IUser} />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StaffTable;
