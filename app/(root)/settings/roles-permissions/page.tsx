import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchRolesServerAction } from "@/lib/actions/role/roleServerAction";
// import { roles } from "@/constansts";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { addRoleServerAction } from "@/lib/actions/role/roleServerAction";

const roleData = {
  name: "Attendees",
  description:
    "Users with this role can fully manage events, including creating, updating, and deleting them. However, they do not have access to dashboard insights, user management, staff controls, settings, or host management.",
  permissions: {
    view_dashboard: { level: "off" },
    manage_users: { level: "off" },
    manage_staffs: { level: "off" },
    manage_events: { level: "full" },
    manage_settings: { level: "off" },
    manage_host: { level: "off" },
  },
};

const RoleAndPermissions = async () => {
  await addRoleServerAction(roleData);
  const { data: rolesData } = await fetchRolesServerAction();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Role & Permission</CardTitle>
        <CardDescription>
          Manage user roles and permissions to grant access to different
          features and functionalities within the application.
        </CardDescription>
      </CardHeader>
      {/* Card content */}
      <CardContent>
        {rolesData?.map((role, index) => (
          <Link
            href={`/settings/roles-permissions/${encodeURIComponent(
              role.name
            )}`}
            key={index}
            className="-mx-2 flex items-start space-x-4 rounded-md p-2 gap-5 transition-all hover:bg-accent bg-accent/50 hover:text-accent-foreground mt-1"
          >
            <User className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{role.name}</p>
              <p className="text-sm text-muted-foreground">
                {role.description}
              </p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default RoleAndPermissions;
