"use server";
import { IUser } from "@/lib/models/types";
import { User } from "@/lib/models/user.model";

export const addUserServerAction = async (userData: IUser) => {
  try {
    if (!userData.firstName) {
      return {
        status: 403,
        message: "First Name cannot be empty",
      };
    }

    if (!userData.lastName) {
      return {
        status: 403,
        message: "Last Name cannot be empty",
      };
    }

    if (!userData.email) {
      return {
        status: 404,
        message: "Email cannot be empty",
      };
    }

    if (!userData.password) {
      return {
        status: 403,
        message: "Password cannot be empty",
      };
    }

    if (!userData.phoneNumber || !/^\+?\d{10,15}$/.test(userData.phoneNumber)) {
      return {
        status: 400, // Bad request for validation errors
        message: "Phone number must be a valid number with a country code",
      };
    }

    const newUser = new User(userData);
    await newUser.save();

    return {
      status: 200,
      message: "User created successfully",
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      status: 500,
      message: "Failed to create user",
    };
  }
};
