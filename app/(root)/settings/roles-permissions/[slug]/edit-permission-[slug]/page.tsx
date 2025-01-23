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
import PermissionCollaps from "@/components/setting/PermissionCollaps";
import { roles } from "@/constansts"; // Ensure this contains the role data

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params; // Extracting the role name part from the URL
  const passedData = decodeURIComponent(slug.split("-")[2]); // Decode the role name

  // Filter role by name
  const data = roles.filter((r) => r.name === passedData); // Ensure `roles` is properly defined and contains role data

  if (data.length === 0) {
    // Handle case where no role is found
    return (
      <Card>
        <CardTitle>Role Not Found</CardTitle>
        <CardDescription>
          The role you are looking for does not exist. Please make sure to spell
          the role correctly and try again.
        </CardDescription>
        <CardFooter>
          <Link href={`/settings/roles-permissions`}>
            <Button variant="link">Go Back to Role</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  const role = data[0]; // Get the first matched role

  return (
    <Card>
      <CardHeader>
        <CardTitle>{passedData.toUpperCase()}</CardTitle>
        <CardDescription>
          Below are the available permissions. To edit, click on the permission
          to either give full access, view-only access, or no access at all.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {Object.entries(role.permissions).map(
          ([permissionKey, permissionValue]) => (
            <Collapsible
              key={permissionKey}
              className="w-full space-y-2 transition-all border "
            >
              <div className="flex items-center justify-between space-x-4 px-4">
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

              <CollapsibleContent className="transition-all px-6 mb-5">
                <PermissionCollaps
                  roleName={passedData}
                  permissionKey={permissionKey}
                  permission={permissionValue} // Pass the specific permission value here
                />
              </CollapsibleContent>
            </Collapsible>
          )
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-5">
        <div>
          <Link href={`/settings/roles-permissions`}>
            <Button variant="link">Go Back to Role</Button>
          </Link>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href={`/settings/roles-permissions/${passedData}/edit-permission-${passedData}`}
          >
            <Button variant="link">Edit Permissions</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Page;
