"use client";

import * as React from "react";
import { CalendarSync, LayoutGrid, Settings2, Users } from "lucide-react";
import { useSession } from "next-auth/react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Sample data
const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutGrid, permission: "view_dashboard" },
  { title: "Attendies", url: "/users", icon: Users, permission: "manage_users" },
  { title: "Host", url: "/hosts", icon: Users, permission: "manage_staffs" },
  { title: "Events", url: "/event", icon: CalendarSync, permission: "manage_events" },
  { title: "Staffs", url: "/staffs", icon: Users, permission: "manage_staffs" },
  { title: "Settings", url: "/settings", icon: Settings2, permission: "manage_settings" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const permissions = session?.user?.role?.permissions || {};

  // Filter navigation based on permissions
  const filteredNav = navItems.filter((item) => {
    return permissions[item.permission] === "full" || permissions[item.permission] === "view";
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={[{ name: "Acme Inc", plan: "Enterprise" }]} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user || { name: "Guest", email: "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
