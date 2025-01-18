import React from 'react'







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
import UserTable from './UserTable';

const UserContainer = () => {
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
            </div>

            {/* <DatePickerWithRange
              datefrom={datefrom}
              dateto={dateto}
              page={page}
            /> */}

          
              
          </div>
              <UserTable/>
        </div>
      </CardContent>
      <CardFooter>
        <TablePagination
          limit={10}
          page={1}
          isPreviousPage={false}
          isNextPage={false}
          totalCount={10}
          search={"search"}
        />
      </CardFooter>
    </Card>
  );
};

export default UserContainer;

