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
import { roles } from "@/constansts";
import Link from "next/link";
import React, { Suspense } from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  // Filter role by sl
  const passedData = slug;
  const data = roles.filter((r) => r.name === passedData);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{decodeURI(passedData)} Permissions</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <p>This is the permission page for {decodeURI(passedData)}</p>
            <Link
              href={`/settings/roles-permissions/${passedData}/edit-permission-${passedData}`}
            >
              <Button variant="link">Edit Permissions</Button>
            </Link>
          </CardDescription>
        </CardHeader>
        <Suspense
          fallback={
            <div>
              <div className="mt-10 flex items-center gap-4">
                {Array.from({ length: 7 }, (_, index) => (
                  <Skeleton key={index} className="h-15 w-20" />
                ))}
              </div>
            </div>
          }
        >
          <CardContent className="mt-5">
            <div className="mb-5">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-1 mr-5">
                  <Button
                    variant="destructive"
                    className="rounded-full w-5 h-5"
                  ></Button>
                  <small className="text-muted-foreground">No Permission</small>
                </div>
                <div className="flex items-center gap-1 mr-5">
                  <Button
                    variant="secondary"
                    className="rounded-full w-5 h-5"
                  ></Button>
                  <small className="text-muted-foreground">
                    View Permission
                  </small>
                </div>
                <div className="flex items-center gap-1 mr-5">
                  <Button className="rounded-full w-5 h-5"></Button>
                  <small className="text-muted-foreground">Full Access</small>
                </div>
              </div>
            </div>
            {/* Render permissions */}
            <div className="flex items-center gap-3 flex-wrap">
              {data[0]?.permissions &&
                Object.entries(data[0].permissions).map(
                  ([permissionKey, permissionValue]) => (
                    <div
                      key={permissionKey}
                      className="flex items-center gap-2"
                    >
                      <Button
                        variant={
                          permissionValue.level === "full"
                            ? "default"
                            : permissionValue.level === "view"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {permissionKey.replace(/_/g, " ")}{" "}
                        {/* Format permission key */}
                      </Button>
                    </div>
                  )
                )}
            </div>
          </CardContent>
        </Suspense>
        <CardFooter className="flex items-center justify-between flex-wrap">
          <Link href={`/settings/roles-permissions`}>
            <Button variant="link">Go Back</Button>
          </Link>
          <Link
            href={`/settings/roles-permissions/${passedData}/edit-permission-${passedData}`}
          >
            <Button variant="link">Edit Permissions</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
