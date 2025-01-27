import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import SearchComponent from "../common/SearchComponent";
import { Button } from "../ui/button";
import { CloudUpload, ListFilter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import TablePagination from "../common/TablePagination";
import UserTable from "./UserTable";
import AddUser from "./AddUser";
import { IUser } from "@/lib/types";

interface UserContanerProps {
  page: number;
  isPreviousPage: boolean | undefined;
  isNextPage: boolean | undefined;
  totalCount: number | undefined;
  search: string | undefined;
  users: IUser[];
}

const UserContainer: React.FC<UserContanerProps> = ({
  page,
  isPreviousPage,
  isNextPage,
  totalCount,
  search,
  users,
}) => {
  // console.log(users);
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Manage Users View, Create or Block users
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div>
          <div className="  items-center  justify-between gap-5  flex mt-5  max-md:flex-wrap  ">
            <SearchComponent
              page={1}
              placeholder="Search Users by name, email or phone number"
            />
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className=" gap-1">
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Status
                    </span>
                    <ListFilter className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem>Present</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Absent</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Late</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm">
                {" "}
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export csv
                </span>
                <CloudUpload className="h-5 w-5 ml-3 " />
              </Button>
              <AddUser />
            </div>
          </div>
          <UserTable users={users} />
        </div>
      </CardContent>
      <CardFooter>
        <TablePagination
          limit={10}
          page={page}
          // isPreviousPage={isPreviousPage}
          isNextPage={isNextPage}
          totalCount={totalCount}
          search={search}
        />
      </CardFooter>
    </Card>
  );
};

export default UserContainer;
