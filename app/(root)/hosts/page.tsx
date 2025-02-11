import HostContainer from "@/components/hosts/HostContainer";
import UserContainer from "@/components/users/UserContainer";
import { getAllUsers } from "@/lib/actions/user/getAllUser";
import { IUser } from "@/lib/models/types";
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
  const { isNextPage, totalCount, isPreviousPage, data } = await getAllUsers({
    page: page,
    limit: limit,
    query: search,
    UserRole: "Hosts"
  });
 console.log(data);
  return (
    <div>
      <UserContainer
        page={page}
        isPreviousPage={isPreviousPage}
        isNextPage={isNextPage}
        totalCount={totalCount}
        search={search}
        users={data}
      />
    </div>
  );
};

export default page;
