"use client";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const SearchComponent = ({
  placeholder,
  page,
}: {
  placeholder?: string;
  search?: string;
  page?: number;
}) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const searchparamsValue = search?.split("&")[0] || "";
  const [searchQuery, setSearchQuery] = useState(searchparamsValue);
  const [query] = useDebounce(searchQuery, 500);
  const router = useRouter();
  const pathname = usePathname();

  const searchParamsDateFrom = searchParams.get("dateFrom");
  const searchParamsDateTo = searchParams.get("dateTo");

  const pagenumber = searchParams.get("page") || page;

  // console.log("search params", searchParamsDateTo, searchParamsDateFrom, page);

  useEffect(() => {
    // Only navigate when there is a query or when clearing the query
    if (!query && search) {
      router.push(
        `${pathname}?dateFrom=${searchParamsDateFrom}&dateTo=${searchParamsDateTo}&page=${pagenumber}`
      );
    } else if (query) {
      router.push(
        `${pathname}?search=${query}&dateFrom=${searchParamsDateFrom}&dateTo=${searchParamsDateTo}&page=${pagenumber}`
      );
    }
  }, [
    pathname,
    query,
    router,
    searchParamsDateTo,
    pagenumber,
    searchParamsDateFrom,
  ]);

  return (
    <div className="w-full ">
      <form className="">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            type="search"
            placeholder={placeholder}
            className="w-full appearance-none bg-background pl-8 shadow-none"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchComponent;
