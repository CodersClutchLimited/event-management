"use client";

import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import UserRoleHooks from "@/hooks/user-role";

const PermissionCollaps = ({ permission, permissionKey, roleName }) => {
  const [selectedPermission, setSelectedPermission] = useState(
    permission[permissionKey]?.level || "off"
  );
  const { handleUpdatePermission } = UserRoleHooks();

  // Handler for updating the selected permission
  const handlePermissionChange = async (value) => {
    setSelectedPermission(value); // Updates the state asynchronously
    console.log("New Selected Permission:", value); // Logs correct value

    await handleUpdatePermission(roleName, permissionKey, value); // Use `value` directly

    console.log("Updated Permission:", value);
  };

  return (
    <div className="mb-5">
      <RadioGroup
        value={selectedPermission}
        onValueChange={handlePermissionChange}
        className="flex items-center justify-between gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="off" id="off" />
          <Label htmlFor="off">No Access</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="view" id="view" />
          <Label htmlFor="view">View Access</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="full" id="full" />
          <Label htmlFor="full">Full Access</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PermissionCollaps;
