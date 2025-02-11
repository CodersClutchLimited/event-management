"use client";
import { useState } from "react";
import { addUserServerAction } from "@/lib/actions/user/addUserServerAction";
import { deleteUserServerAction } from "@/lib/actions/user/DeleteUser";
import { updateUserServerAction } from "@/lib/actions/user/updateUserAction";
import { toast } from "sonner";
import { IUser } from "@/lib/types";
import { SendInvitation } from "@/lib/actions/staff/staffServerAction";

export const UserHook = () => {
  const [isLoading, setIsLoading] = useState(false);

  const HandleAddUser = async (userData: any) => {
    setIsLoading(true);
    // const loadingToastId = toast.loading("🧍🧍🧍🧍🧍 Adding new event...");

    try {
      const { status, message } = await addUserServerAction(userData);
      if (status !== 200) {
        toast.error(message);
        return { status };
      }
      setIsLoading(false);
      toast.success(message);
      return { status };
    } catch {
      toast.error("An error occurred while adding the event.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const HandleDeleteUser = async (userId: string) => {
    setIsLoading(true);
    // const loadingToastId = toast.loading("🧍🧍🧍🧍🧍 Deleting event...");

    try {
      const { status, message } = await deleteUserServerAction(userId);
      if (status !== 200) {
        toast.error(message);
        return { status };
      }
      setIsLoading(false);
      toast.success(message);
      return { status };
    } catch {
      toast.error("An error occurred while adding the event.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (userId: string, userData: IUser) => {
    setIsLoading(true);
    // const loadingToastId = toast.loading("🧍🧍🧍🧍🧍 Updating event...");

    try {
      const { status, message } = await updateUserServerAction(
        userId,
        userData
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
    }
  };
  // Send staff invitation email
  const sendStaffInviteEmail = async (userData: any) => {
    setIsLoading(true);
    // const loadingToastId = toast.loading("��������������� Sending staff invite email...");
    try {
      const { status, message } = await SendInvitation(userData);
      if (status!== 200) {
        toast.error(message);
        return { status };
      }
      setIsLoading(false);
      toast.success(message);
      return { status };
    } catch {
      toast.error("An error occurred while sending staff invite email.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleUpdateUser,
    HandleAddUser,
    HandleDeleteUser,
    sendStaffInviteEmail,
    isLoading,
  };
};
