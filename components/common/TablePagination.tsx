"use client";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { usePathname, useSearchParams } from "next/navigation";

const TablePagination = ({
  isPreviousPage,
  totalCount,
  page,
  isNextPage,
  search,
  limit,
}: {
  isPreviousPage: boolean | undefined;
  totalCount: number | undefined;
  page: number | undefined;
  isNextPage: boolean | undefined;
  search: string | undefined;
  limit: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);
  // Get the date parameter from the query string or handle it if it's null
  const searchParamsDateFrom = searchParams.get("dateFrom");
  const searchParamsDateTo = searchParams.get("dateTo");

  return (
    <Pagination className="flex items-center justify-between px-2">
      <p className="text-sm text-muted-foreground"> row({totalCount})</p>
      <PaginationContent>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {page} of {totalPages}
          </div>
          <PaginationItem className="flex items-center space-x-2">
            {/* Previous Page */}
            <PaginationPrevious
              href={`${pathname}?search=${
                search || ""
              }&dateFrom=${searchParamsDateFrom}&dateTo=${searchParamsDateTo}&page=${Math.max(
                1,
                (page || 1) - 1
              )}`}
            />

            {/* Next Page */}
            <PaginationNext
              href={`${pathname}?search=${
                search || ""
              }&dateFrom=${searchParamsDateFrom}&dateTo=${searchParamsDateTo}&page=${Math.min(
                totalPages,
                (page || 1) + 1
              )}`}
            />
          </PaginationItem>{" "}
        </div>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
