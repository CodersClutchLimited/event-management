import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getRoleByNameServerAction } from "@/lib/actions/role/roleServerAction";
import Link from "next/link";
import React, { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await await params; // No need to use `await` with params
  const roleName = decodeURI(slug); // Decode the slug for readability

  // Fetch role by name
  const { data, status } = await getRoleByNameServerAction(roleName);

  if (status !== 200 || !data) {
    return <p className="text-red-500">Role not found</p>;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{roleName} Permissions</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <p>This is the permission page for {roleName}</p>
            <Link
              href={`/settings/roles-permissions/${roleName}/edit-permission-${roleName}`}
            >
              <Button variant="link">Edit Permissions</Button>
            </Link>
          </CardDescription>
        </CardHeader>

        <Suspense fallback={<LoadingSkeleton />}>
          <CardContent className="mt-5">
            <PermissionLegend />

            {/* Render Permissions */}
            <div className="flex items-center gap-3 flex-wrap">
              {Object.entries(
                data?.permissions as { [key: string]: { level: string } }
              ).map(([permissionKey, permissionValue]) => (
                <div key={permissionKey} className="flex items-center gap-2">
                  <Button
                    variant={
                      permissionValue.level === "full"
                        ? "default"
                        : permissionValue.level === "view"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {permissionKey.replace(/_/g, " ")}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Suspense>

        <CardFooter className="flex items-center justify-between flex-wrap">
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
    </div>
  );
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="mt-10 flex items-center gap-4">
    {Array.from({ length: 7 }).map((_, index) => (
      <Skeleton key={index} className="h-15 w-20" />
    ))}
  </div>
);

// Permission Legend Component
const PermissionLegend = () => (
  <div className="mb-5">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-1 mr-5">
        <Button variant="destructive" className="rounded-full w-5 h-5"></Button>
        <small className="text-muted-foreground">No Permission</small>
      </div>
      <div className="flex items-center gap-1 mr-5">
        <Button variant="secondary" className="rounded-full w-5 h-5"></Button>
        <small className="text-muted-foreground">View Permission</small>
      </div>
      <div className="flex items-center gap-1 mr-5">
        <Button className="rounded-full w-5 h-5"></Button>
        <small className="text-muted-foreground">Full Access</small>
      </div>
    </div>
  </div>
);

export default page;
