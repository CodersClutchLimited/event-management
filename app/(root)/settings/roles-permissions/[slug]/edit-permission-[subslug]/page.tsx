import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { getRoleByNameServerAction } from "@/lib/actions/role/roleServerAction";
import PermissionCollaps from "@/components/setting/PermissionCollaps";

const Page = async ({ params }: { params: Promise<{ subslug: string }> }) => {
  const { subslug } = await params; // Decode role name directly

  const roleName = decodeURIComponent(subslug.replace("edit-permission-", "")); // Decode the slug for readability

  // Fetch role by name
  const { data } = await getRoleByNameServerAction(roleName);
  const permissions = (data?.permissions as Record<string, any>) || {};

  if (!data || Object.keys(data).length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Role Not Found</CardTitle>
          <CardDescription>
            The role {roleName} does not exist. Please check the name and try
            again.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href={`/settings/roles-permissions`}>
            <Button variant="link">Go Back</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{roleName.toUpperCase()}</CardTitle>
        <CardDescription>
          Click on a permission to edit access levels.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {Object.entries(data.permissions as Record<string, any>).map(
          ([permissionKey, permissionValue]) => (
            <Collapsible key={permissionKey} className="w-full border">
              <div className="flex items-center justify-between px-4">
                <p className="text-sm text-muted-foreground">
                  {permissionKey.replace(/_/g, " ")}
                </p>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="px-6 mb-5">
                <PermissionCollaps
                  roleName={roleName}
                  permissionKey={permissionKey}
                  permission={permissionValue} // Pass the specific permission value here
                />
              </CollapsibleContent>
            </Collapsible>
          )
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <Link href={`/settings/roles-permissions`}>
          <Button variant="link">Go Back</Button>
        </Link>
        <Link
          href={`/settings/roles-permissions/${roleName}/edit-permission-${roleName}`}
        >
          <Button variant="link">Edit Permissions</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Page;
