import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ProfileComponent from "../common/ProfileComponent";
// import { DeleteIcon } from "lucide-react";
import RevomeFromEvent from "./RevomeFromEvent";
import Link from "next/link";
import { formatReadableDate } from "@/lib/utils";

const RecentApplicant = ({ event }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle> Applicants</CardTitle>
        <CardDescription>
          View all applicants ({event?.registeredUsers?.length})
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {event?.registeredUsers?.map((item) => (
          <Link
            href={`/users/${item?._id}`}
            key={item?._id}
            className="flex items-center justify-between border rounded-md p-2  hover:border-red-700"
          >
            <ProfileComponent
              firstName="kebba"
              lastName="Waiga"
              email="kebbawaiga@gmail.com"
              middleName=""
            />
            <p>{formatReadableDate(item?.registeredAt)}</p>
            <RevomeFromEvent item={{}} />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentApplicant;
