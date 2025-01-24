"use server"
import User from "@/lib/models/user.model"

import { revalidatePath } from "next/cache"

export const deleteUserServerAction = async (userId: string) => {
    try {
        if(!userId) {
            return{status:400, message: "User Id is required"}
        }
        const deleteUser = await User.findOneAndDelete({_id: userId})


        if (!deleteUser) {
            return { status: 404, message: "User not found" };
          }
      
          revalidatePath("/users");
          return {
            status: 200,
            message: "User deleted successfully",
          };
      

    } catch {
    return {
      status: 500,
      message: "User deleting event",
    };

    }
}