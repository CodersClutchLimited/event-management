import HostContainer from "@/components/hosts/HostContainer";
import { GetAllEvent } from "@/lib/actions/event/GetAllEvent";
import { EventInterfaceType } from "@/lib/types";
const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string; search: string }>;
}) => {
  const searchParamsData = await searchParams;
  console.log(searchParamsData);

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

  // get the events
  const { isNextPage, totalCount, isPreviousPage, data } = await GetAllEvent({
    page: page,
    limit: limit,
    query: search,
  });
  return (
    <div>
      <HostContainer
        page={page}
        isPreviousPage={isPreviousPage}
        isNextPage={isNextPage}
        totalCount={totalCount}
        search={search}
        events={data as unknown as EventInterfaceType[]}
      />
    </div>
  );
};

export default page;
