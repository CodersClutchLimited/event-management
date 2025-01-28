import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, LucideView } from "lucide-react";
import DeleteUser from "./deleteUsers";
import Link from "next/link";
import { IUser } from "@/lib/types";
import EditUser from "./EditUser";

const userAction = ({ user }: { user: IUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant="outline">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>User Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <EditUser user={user} />
          <Link href={`/users/${user._id}`}>
            <Button
              variant={"outline"}
              className="w-full flex items-center justify-between mt-1 mb-1"
            >
              View <LucideView />
            </Button>
          </Link>
          <DeleteUser user={user} />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default userAction;
