import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {  fetchRolesServerAction } from "@/lib/actions/role/roleServerAction";
import { RoleTypes } from "@/lib/types";
// import { roles } from "@/constansts";
import { User } from "lucide-react";
import Link from "next/link";

// const sone = {
//   name: "Host",
//   description: "Has full access to managing events, can view the dashboard, but cannot manage users, staffs, or settings.",
//   permissions: {
//     view_dashboard: { level: "view" },
//     manage_users: { level: "off" },
//     manage_staffs: { level: "off" },
//     manage_events: { level: "full" },
//     manage_settings: { level: "off" },
//   },
// };

const RoleAndPermissions = async () => {
  const { data } = await fetchRolesServerAction();
  // await addRoleServerAction(sone);
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
        {data?.map((role:RoleTypes, index:number) => (
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
