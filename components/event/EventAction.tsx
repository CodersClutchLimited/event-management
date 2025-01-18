import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Ellipsis, LucideView } from "lucide-react";
import DeleteEvent from "./DeleteEvent";
import Link from "next/link";
const EventAction = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant="outline">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Events Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Button
            variant={"outline"}
            className="w-full flex items-center justify-between mt-1"
          >
            Edit <Edit />
          </Button>
          <Button
            variant={"outline"}
            className="w-full flex items-center justify-between mt-1 mb-1"
          >
            <Link href={"#"}>View</Link> <LucideView />
          </Button>
          <DeleteEvent event={{}} />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EventAction;
