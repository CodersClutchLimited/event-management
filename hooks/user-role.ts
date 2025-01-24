import { UpdatePermissionLevel } from "@/lib/actions/role/roleServerAction";
import { useState } from "react";
import { toast } from "sonner";

const UserRoleHooks = () => {
  const [isPending, setIsPending] = useState(false);

  //   handle role permission update
  const handleUpdatePermission = async (
    roleName: string,
    permissionKey: string,
    newLevel: string
  ) => {
    setIsPending(true);
    const loadingToaster = toast.loading(
      "Hold tight while we are updating permissions"
    );

    try {
      const { status, message } = await UpdatePermissionLevel(
        roleName,
        permissionKey,
        newLevel
      );

      if (status !== 200) {
        toast.error(message);
        toast.dismiss(loadingToaster);

        return;
      }
      toast.success(message);
      toast.dismiss(loadingToaster);
    } catch (error) {
      console.error("Error updating permission level:", error);
      toast.error("An error occurred while updating the permission level");
    } finally {
      setIsPending(false);
      toast.dismiss(loadingToaster);
    }
  };

  return {
    handleUpdatePermission,
    isPending,
  };
};

export default UserRoleHooks;
