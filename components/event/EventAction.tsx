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
import DeleteEvent from "./DeleteEvent";
import Link from "next/link";
import { EventInterfaceType } from "@/lib/types";
import EditEvent from "./EditEvent";
const EventAction = ({ event }: { event: EventInterfaceType }) => {
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
          <EditEvent event={event} />

          <Link href={`/event/${event._id}`}>
            <Button
              variant={"outline"}
              className="w-full flex items-center justify-between mt-1 mb-1"
            >
              View <LucideView />
            </Button>
          </Link>
          <DeleteEvent event={event} />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EventAction;
