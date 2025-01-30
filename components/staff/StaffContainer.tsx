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
import InviteStaff from "./InviteStaff";
import StaffTable from "./StaffTable";
import { IUser } from "@/lib/types";

interface StaffContainerProps {
  page: number;
  isPreviousPage: boolean | undefined;
  isNextPage: boolean | undefined;
  totalCount: number | undefined;
  search: string | undefined;
  staff: IUser[];
}

const StaffContainer: React.FC<StaffContainerProps> = ({
  page,
  isPreviousPage,
  isNextPage,
  totalCount,
  search,
  staff,
}) => {
  console.log("staff data", staff);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Staff</CardTitle>
        <CardDescription>
          Manage staff, View, Invite or Block staff members
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div>
          <div className="items-center justify-between gap-5 flex mt-5 max-md:flex-wrap">
            <SearchComponent
              page={1}
              placeholder="Search staff by name, email, or role"
            />
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
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
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export CSV
                </span>
                <CloudUpload className="h-5 w-5 ml-3" />
              </Button>
              <InviteStaff />
            </div>
          </div>
          <StaffTable staff={staff} /> 
        </div>
      </CardContent>

      <CardFooter>
        <TablePagination
          limit={10}
          page={page}
          isPreviousPage={isPreviousPage}
          isNextPage={isNextPage}
          totalCount={totalCount}
          search={search}
        />
      </CardFooter>
    </Card>
  );
};

export default StaffContainer;
