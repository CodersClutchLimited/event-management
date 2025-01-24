import { updateSystemSettings } from "@/lib/actions/systemSetting/SystemSettingServerAction";
import { useState } from "react";
import { toast } from "sonner";

export const SystemSettingHook = () => {
  const [isPending, setIsPending] = useState(false);

  // Handle system settings update
  const handleUpdateSystemSettings = async (updatedSettings) => {
    setIsPending(true);
    const loadingToaster = toast.loading("Updating system settings...");

    try {
      const { status, message } = await updateSystemSettings(updatedSettings);

      if (status !== 200) {
        toast.error(message);
        toast.dismiss(loadingToaster);
        return;
      }

      toast.success(message);
    } catch (error) {
      console.error("Error updating system settings:", error);
      toast.error("An error occurred while updating system settings");
    } finally {
      setIsPending(false);
      toast.dismiss(loadingToaster);
    }
  };

  return {
    handleUpdateSystemSettings,
    isPending,
  };
};
