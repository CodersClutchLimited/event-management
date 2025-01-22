import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const RecentApplicant = ({ event }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle> Applicants</CardTitle>
        <CardDescription>
          View all applicants ({event?.registeredUsers.length})
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {event?.registeredUsers?.map((item) => (
          <div key={item?._id} className="flex items-center justify-between">
            <ProfileComponent
              firstName="kebba"
              lastName="Waiga"
              email="kebbawaiga@gmail.com"
              middleName=""
            />
            <p>2 munit ago</p>
            <RevomeFromEvent item={{}} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentApplicant;
