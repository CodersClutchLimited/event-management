"use client";
import { addEventServerAction } from "@/lib/actions/event/addEventServerAction";
import { useState } from "react";
import { toast } from "sonner";

export const EventHook = () => {
  const [isLoading, setIsLoading] = useState(false);

  // handle add event
  //   addingnew account
  const HandleAddEvent = async (formData) => {
    setIsLoading(true);
    // const loadingToastId = toast.loading("🧍🧍🧍🧍🧍 Adding new event...");

    try {
      const { status, message } = await addEventServerAction(formData);
      if (status !== 200) {
        toast.error(message);
        return { status };
      }
      setIsLoading(false);
      // toast.dismiss(loadingToastId);

      toast.success(message);
      return { status };
    } catch {
      // toast.dismiss(loadingToastId);
      toast.error("An error occurred while adding the event.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      // toast.dismiss(loadingToastId);
    }
  };

  return {
    HandleAddEvent,
    isLoading,
  };
};
