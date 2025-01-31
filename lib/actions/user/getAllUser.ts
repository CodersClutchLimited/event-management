"use server";

import Event from "@/lib/models/event.model";
import { User } from "@/lib/models/user.model";
import { IUser, UserRole } from "@/lib/types";

import { deepConvertToPlainObject } from "@/lib/utils";
// import { startOfDay } from "date-fns";

export const getAllUsers = async ({
  query,
  page = 1,
  limit = 10,
}: {
  query?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    // skip number of rows
    const skip = (page - 1) * limit;

    const pipeline = [
      ...(query
        ? [
            {
              $search: {
                index: "user",
                text: {
                  query,
                  path: {
                    wildcard: "*",
                  },
                  fuzzy: { maxEdits: 1, prefixLength: 2 },
                },
              },
            },
          ]
        : []),
      { $skip: skip },
      { $limit: limit },
      { $sort: { createdAt: -1 as -1 } },
      { $match: { role: UserRole.USER } },
      { 
        $project: {
          firstName: 1,
          initial: 1,
          lastName: 1,
          email: 1,
          phoneNumber: 1,
          avatar: 1,
          address: 1,
          role: 1,
          status: 1,
          isVerified: 1,
          lastLogin: 1,
          createdAt: 1,
          registeredUsers: 1,
          registeredEvents: 1,
        },
      },
    ];

    // user aggrigatio pipline to fetch user info

    const users = await User.aggregate(pipeline);
    const totalCount = query
      ? // if query then search
        (
          await User.aggregate([
            {
              $search: {
                index: "user",
                text: {
                  query,
                  path: {
                    wildcard: "*",
                  },
                  fuzzy: { maxEdits: 1, prefixLength: 2 },
                },
              },
            },
            { $count: "count" },
          ])
        )[0]?.count || 0
      : // else start counting document
        await User.countDocuments();

    return {
      status: 200,
      data: users,
      isPreviousPage: page > 1,
      isNextPage: totalCount > skip + users.length,
      totalCount,
    };
  } catch (error) {
    return { status: 500, message: "Failed to get users", error };
  }
};

export const GetSingleUser = async (userId: string) => {
  console.log(userId);
  try {
    const user = await User.findById(userId).populate({
      path: "role",
      select: "name",
    });
    if (!user) {
      return { status: 404, message: "User not found" };
    }
    console.log(user);

    return {
      status: 200,
      data: deepConvertToPlainObject(user as unknown as IUser),
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { status: 500, message: "Error getting user", error };
  }
};

// get the events that a particular user is registered forimport User from "../models/User"; // Ensure correct import

// get  all user whose role is staff
export const getAllStaff = async ({
  query,
  page = 1,
  limit = 10,
}: {
  query?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const skip = (page - 1) * limit;

    const pipeline = [
      // Match only users with role "staff"
      { $match: { role: UserRole.STAFF } },

      ...(query
        ? [
            {
              $search: {
                index: "user",
                text: {
                  query,
                  path: {
                    wildcard: "*",
                  },
                  fuzzy: { maxEdits: 1, prefixLength: 2 },
                },
              },
            },
          ]
        : []),
      { $skip: skip },
      { $limit: limit },
      { $sort: { createdAt: -1 as -1 } },
      {
        $project: {
          firstName: 1,
          initial: 1,
          lastName: 1,
          email: 1,
          phoneNumber: 1,
          avatar: 1,
          address: 1,
          role: 1,
          status: 1,
          isVerified: 1,
          lastLogin: 1,
          createdAt: 1,
          registeredUsers: 1,
          registeredEvents: 1,
        },
      },
    ];

    // Aggregate to get staff users
    const staffUsers = await User.aggregate(pipeline);

    // Count total number of staff matching the query
    const totalCount = query
      ? (
          await User.aggregate([
            { $match: { role: UserRole.STAFF } },
            {
              $search: {
                index: "user",
                text: {
                  query,
                  path: {
                    wildcard: "*",
                  },
                  fuzzy: { maxEdits: 1, prefixLength: 2 },
                },
              },
            },
            { $count: "count" },
          ])
        )[0]?.count || 0
      : await User.countDocuments({ role: UserRole.STAFF });

    return {
      status: 200,
      data: staffUsers,
      isPreviousPage: page > 1,
      isNextPage: totalCount > skip + staffUsers.length,
      totalCount,
    };
  } catch (error) {
    return { status: 500, message: "Failed to get staff", error };
  }
};

// Get a single staff for the profile page purpose
export const GetStaffById = async (userId: string) => {
  try {
    const staff = await User.findOne({ _id: userId, role: UserRole.STAFF });
    return staff;
  } catch (error) {
    console.error("Error fetching staff by ID:", error);
    throw error;
  }
};

export const GetUserRegisteredEvents = async (userId: string) => {
  try {
    console.log("Fetching registered events for User ID:", userId);

    // Populate the eventId inside the registeredEvents array
    const user = await User.findById(userId).populate(
      "registeredEvents.eventId"
    );

    if (!user) {
      return { status: 404, message: "User not found" };
    }
    // console.log(user);

    // Ensure registeredEvents is populated properly
    const registeredEvents = user.registeredEvents.map((event) => {
      console.log("Mapped event:", event);
      console.log("EventId Object:", event.eventId);
      console.log("Event Status:", event.eventId?.status);
      console.log("User Registration Status:", event.status);

      return {
        id: event.eventId?._id || null,
        title: event.eventId?.title || "Unknown",
        schedule: event.eventId?.schedule || null,
        location: event.eventId?.location || "Not specified",
        registeredAt: event.registeredAt,
        eventId: event.eventId?.eventId || null,
        status: event.eventId?.status || "unknown",
        registrationStatus: event.status || "unknown", // Expecting "active" or "canceled"
      };
    });

    console.log("user", registeredEvents);

    // console.log(registeredEvents);

    return {
      status: 200,
      data: registeredEvents,
    };
  } catch (error) {
    console.error("Error fetching user events:", error);
    return { status: 500, message: "Error getting user events", error };
  }
};

export const GetUserWaitlistedEvents = async (userId: string) => {
  try {
    console.log("Fetching waitlisted events for User ID:", userId);

    // Fetch the user, populating the eventId in waitlistedEvents
    const user = await User.findById(userId)
      .populate("waitlistedEvents.eventId");

    if (!user) {
      return { status: 404, message: "User not found" };
    }

    // Process waitlistedEvents
    const waitlistedEvents = user.waitlistedEvents.map((event) => {
      console.log("Mapped waitlisted event:", event);
      return {
        id: event.eventId?._id || null,
        title: event.eventId?.title || "Unknown",
        schedule: event.eventId?.schedule || null,
        location: event.eventId?.location || "Not specified",
        joinedAt: event.joinedAt,
        eventId: event.eventId?.eventId || null,
        status: event.eventId?.status || "unknown",
        registrationStatus: "waitlisted", // Explicitly setting registration status as "waitlisted"
      };
    });

    console.log("Waitlisted Events:", waitlistedEvents);

    return {
      status: 200,
      data: waitlistedEvents,
    };
  } catch (error) {
    console.error("Error fetching waitlisted events:", error);
    return { status: 500, message: "Error getting waitlisted events", error };
  }
};
