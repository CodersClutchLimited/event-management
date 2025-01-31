import React from 'react'

const RegisterEvents = () => {
  return (
    <TabsContent value="events">
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">
          Registered Event
        </CardTitle>
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
                  <DropdownMenuCheckboxItem>
                    Present
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Absent
                  </DropdownMenuCheckboxItem>
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
          {user?.registeredEvents?.length > 0 ? (
            <RegisteredEvents user={user} />
          ) : (
            <p className="text-center text-gray-500">
              No registered events.
            </p>
          )}{" "}
        </div>
      </CardContent>
      <CardFooter>
        <TablePagination
          limit={10}
          page={1}
          // isPreviousPage={false}
          isNextPage={false}
          totalCount={10}
          search={"search"}
        />
      </CardFooter>
    </Card>
  </TabsContent>
  )
}

export default RegisterEvents
