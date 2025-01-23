"use client";
import { addEventServerAction } from "@/lib/actions/event/addEventServerAction";
import { deleteEventServerAction } from "@/lib/actions/event/deleteEvent";
import { updateEventServerAction } from "@/lib/actions/event/updateEventServerAction";
import { EventInterfaceType } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";
// updateEventServerAction
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

  // handle deleting event

  const handleDeleteEvent = async (eventId: string) => {
    setIsLoading(true);
    // const loadingToastId = toast.loading("🧍🧍🧍🧍🧍 Deleting event...");

    try {
      const { status, message } = await deleteEventServerAction(eventId);
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
      toast.error("An error occurred while deleting the event.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      // toast.dismiss(loadingToastId);
    }
  };

  // update event
  const handleUpdateEvent = async (
    eventId: string,
    formData: EventInterfaceType
  ) => {
    setIsLoading(true);
    // const loadingToastId = toast.loading("🧍🧍🧍🧍🧍 Updating event...");

    try {
      const { status, message } = await updateEventServerAction(
        eventId,
        formData
      );
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
      toast.error("An error occurred while updating the event.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      // toast.dismiss(loadingToastId);
    }
  };

  return {
    handleUpdateEvent,
    handleDeleteEvent,
    HandleAddEvent,
    isLoading,
  };
};
