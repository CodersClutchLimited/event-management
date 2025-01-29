"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "./ui/avatar";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    // logo: React.ElementType;
    plan: string;
  }[];
}) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  const handleTeamChange = (team: {
    name: string;
    // logo: React.ElementType;
    plan: string;
  }) => {
    setActiveTeam(team);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          onClick={() => handleTeamChange(activeTeam)}
        >
          <div className="">
            <Avatar className="w-[130px] h-[50px] ">
              <AvatarImage src="/4kiddos-LOGO.png" />
            </Avatar>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
