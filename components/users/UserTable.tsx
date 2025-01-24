import React from 'react'
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import DynamicTableHeaders from "../common/DynamicTableHeaders";
import { UserTableHeaderData } from "@/constants/tablesData";
import { Badge } from "../ui/badge";
import { formatReadableDate } from "@/lib/utils";
import UserAction from './UserActions'
import ProfileComponent from "@/components/common/ProfileComponent"
import { IUser } from '@/lib/types';
const UserTable = ({users}: {users: IUser}) => {
  return (
    <div>
          <Table className="mt-5">
      <DynamicTableHeaders headers={UserTableHeaderData} />

      <TableBody>
        {users?.map((item: IUser, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
            <ProfileComponent firstName={item.firstName} lastName= {item.lastName} middleName={item.initial} email= {item.email} />
            </TableCell>
            <TableCell>
            <Badge
                className={ 
                  item.status === "blocked"
                    ? "bg-red-600"
                    : item.status === "suspended"
                    ? "bg-yellow-600"
                    :  "bg-green-600"   
                }
              >
                {item.status}
              </Badge>

            </TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell>{item?.lastLogin === null || item?.lastLogin === undefined ? "No date" : formatReadableDate(item?.lastLogin)}</TableCell>
              <TableCell>{formatReadableDate(item.createdAt)}</TableCell>
              <TableCell>{<UserAction item={item}/>}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    </div>
  )
}

export default UserTable
