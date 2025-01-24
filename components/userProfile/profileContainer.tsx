import React from 'react';
// import { useParams } from 'next/navigation';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

  import { User, Mail, Phone, Globe, MapPin, Home, BadgeRussianRuble, Key, CloudUpload, ListFilter } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import TablePagination from '../common/TablePagination';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import SearchComponent from "../common/SearchComponent";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import RegisteredEvents from './RegisteredEvents';
import WaitlistedEvent from './WaitlistedEvent';
import { IUser } from '@/lib/types';


const ProfileContainer = ({user}: {user: IUser}) => {
  
  
  return (
    <Tabs defaultValue="details" className="">
    <TabsList className="grid w-full grid-cols-3 bg-">
      <TabsTrigger value="details" className='uppercase font-bold'>employee details</TabsTrigger>
          {
      user.role === 'user' ? (
        <>
          <TabsTrigger value="events" className="uppercase font-bold">Registered events</TabsTrigger>
          <TabsTrigger value="waitlists" className="uppercase font-bold">Waitlisted events</TabsTrigger>
        </>
      ) : (
          <TabsTrigger value="audit" className="uppercase font-bold">Audit Log</TabsTrigger>
      )
    }
    </TabsList>

    <TabsContent value='audit'>
    <Card>
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
            </div>

          </div>
          {/* SOMETHING IS GOING HERE */}
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

    </TabsContent>


    <TabsContent value="details">
      <Card className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-all">
        {[
          {label: "First Name", value: user.firstName ?? "N/A", Icon: User },
          {label: "Last Name", value: user.lastName ?? "N/A", Icon: User },
          {label: "Email Address", value: user.email ?? "No email", Icon: Mail },
          {label: "Phone Number", value: user.phoneNumber ?? "No phone", Icon: Phone },
          {label: "Country", value: user.address?.country ?? "Unknown", Icon: Globe },
          {label: "City", value: user.address?.city ?? "Unknown", Icon: MapPin },
          {label: "Street", value: user.address?.street ?? "Unknown", Icon: Home },
          {label: "Status", value: user.status ?? "Not specified", Icon: BadgeRussianRuble },
        ].map(({ label, value, Icon }) => (
          <div key={label} className="flex flex-col items-start">
            <span className="flex items-center text-gray-500 dark:text-gray-400 font-medium text-lg">
              <Icon className="mr-2 h-5 w-5" />
              {label}
            </span>
            <span className="text-base font-semibold">{value}</span>
          </div>
        ))}

{/* <div className="flex flex-col items-start border-t pt-4 col-span-full">
  <span className="flex items-center text-gray-500 dark:text-gray-400 font-medium text-lg">
    <Key className="mr-2 h-5 w-5" />
    Authentication Method(s):
  </span>
  {user.authMethod ? (
    Object.entries(user.authMethod)
      .filter(([_, value]) => value)
      .map(([key]) => (
        <span key={key} className="text-base font-semibold capitalize">
          {key.replace(/([A-Z])/g, " $1")}
        </span>
      ))
  ) : (
    <span className="text-base font-semibold">No authentication method available</span>
  )}
</div> */}

        <div className="flex flex-col items-start pt-4">
          <span className="flex items-center text-gray-500 dark:text-gray-400 font-medium text-lg">
            <User className="mr-2 h-5 w-5" />
            Last Logged In
          </span>
          <span className="text-base font-semibold">{formatDate(user.lastLogin?? 'No Date')}</span>
        </div>
      </Card>
    </TabsContent>

    <TabsContent value="events">
    <Card>
      <CardHeader>
        <CardTitle className='text-lg font-semibold text-center'>Registered Event</CardTitle>
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
            </div>

          </div>
              <RegisteredEvents/>
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

    </TabsContent>

    <TabsContent value='waitlists'>
    <Card>
      <CardHeader>
        <CardTitle className='text-lg font-semibold text-center'>Waitlisted Event</CardTitle>
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
            </div>

          </div>
              <WaitlistedEvent/>
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

    </TabsContent>
  </Tabs> 
  
   )
};

export default ProfileContainer;
