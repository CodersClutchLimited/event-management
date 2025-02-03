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
import AddEvent from "../event/AddEvent";
import EventTable from "../event/EventTable";
import TablePagination from "../common/TablePagination";
import { EventInterfaceType, IUser } from "@/lib/types";

interface EvenContainerProps {
  page: number;
  isPreviousPage: boolean | undefined;
  isNextPage: boolean | undefined;
  totalCount: number | undefined;
  search: string | undefined;
  users: IUser[];
}

const HostContainer: React.FC<EvenContainerProps> = ({
  page,
  isPreviousPage,
  isNextPage,
  totalCount,
  search,
  users,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Management</CardTitle>
        <CardDescription>
          Manage your events, create, update, and delete them.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div>
          <div className="  items-center  justify-between gap-5  flex mt-5  max-md:flex-wrap  ">
            <SearchComponent
              page={1}
              placeholder="Search Employee by date, status, checkIn and checkOut date"
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
              <AddEvent />
            </div>

            {/* <DatePickerWithRange
              datefrom={datefrom}
              dateto={dateto}
              page={page}
            /> */}
          </div>

          <EventTable events={users as unknown as EventInterfaceType[]} />
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

export default HostContainer;
