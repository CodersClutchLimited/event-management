import StaffContainer from "@/components/staff/StaffContainer";
import { getAllStaff } from "@/lib/actions/user/getAllUser"; // Ensure correct import
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string; search: string }>;
}) => {
  const searchParamsData = await searchParams;

  const page =
    typeof searchParamsData.page === "string"
      ? Number(searchParamsData.page)
      : 1;
  const limit =
    typeof searchParamsData.limit === "string"
      ? Number(searchParamsData.limit)
      : 10;

  // Extract search term
  const search =
    typeof searchParamsData.search === "string"
      ? searchParamsData.search
      : undefined;

  // Fetch staff data
  const {
    isNextPage,
    totalCount,
    isPreviousPage,
    data = [],
  } = await getAllStaff({
    page: page,
    limit: limit,
    query: search,
  });

  return (
    <div>
      <StaffContainer
        page={page}
        isPreviousPage={isPreviousPage}
        isNextPage={isNextPage}
        totalCount={totalCount}
        search={search}
        staff={data} // Assuming StaffContainer expects "staff" instead of "users"
      />
    </div>
  );
};

export default page;
