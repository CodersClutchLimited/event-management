import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileComponent = ({
  email,
  firstName,
  lastName,
  middleName,
}: {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  middleName: string | undefined;
}) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className=" h-10 w-10 sm:flex">
        <AvatarImage src="/logo.png" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">
          {firstName + " " + middleName + " " + lastName}
        </p>
        <p className=" text-sm text-muted-foreground md:inline">{email}</p>
      </div>
    </div>
  );
};


export default ProfileComponent;


