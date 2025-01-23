"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
// import { settingSidebarData } from "@/constansts/SidebarData";
export const settingSidebarData = [
  {
    id: 1,
    title: "General Settings",
    href: "/settings",
  },

  {
    id: 5,
    title: "Role & Permissions",
    href: "/settings/roles-permissions",
  },

  {
    id: 7,
    title: "Notification Settings",
    href: "/settings/notifications",
  },
  {
    id: 8,
    title: "Security Setting",
    href: "settings/security",
  },
  {
    id: 9,
    title: "Account Management",
    href: "settings/account-management",
  },
];
const SettingLink = () => {
  const pathname = usePathname(); // Get the current pathname

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
      {settingSidebarData.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-500 ${"hover:text-primary"} ${
              isActive ? "bg-gray-500" : "text-muted-foreground"
            }`}
          >
            {/* {item.icon} */}
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default SettingLink;
