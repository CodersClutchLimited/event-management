"use server";

import { User } from "@/lib/models/user.model";
import { IUser } from "@/lib/types";
// import { UserInterfaceType } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function updateUserServerAction(
  userId: string,
  updateData: IUser
) {
  try {
    if (!userId || !updateData) {
      return { status: 400, message: "Invalid input data" };
    }

    const existingUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!existingUser) {
      return { status: 404, message: "User not found" };
    }

    revalidatePath("/users");

    return {
      status: 200,
      message: "User updated successfully",
      user: existingUser,
    };
  } catch (error) {
    return { status: 500, message: "Error updating user", error };
  }
}
