"use server";

import { User } from "@/lib/models/user.model";
import { IUser } from "@/lib/types";

import { deepConvertToPlainObject } from "@/lib/utils";
import { PipelineStage } from "mongoose";
// import { startOfDay } from "date-fns";
export const getAllUsers = async ({
  query,
  page = 1,
  limit = 10,
  UserRole
}: {
  query?: string;
  page?: number;
  limit?: number;
  UserRole: string;
}) => {
  try {
    const skip = (page - 1) * limit;

    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      { $unwind: "$role" },
      { $match: { "role.name": UserRole } },

      // Full-text search (if query exists)
      ...(query
        ? [
            {
              $search: {
                index: "user",
                text: {
                  query,
                  path: { wildcard: "*" },
                  fuzzy: { maxEdits: 1, prefixLength: 2 },
                },
              },
            },
          ]
        : []),

      {
        $facet: {
          users: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                firstName: 1,
                lastName: 1,
                email: 1,
                phoneNumber: 1,
                avatar: 1,
                address: 1,
                role: 1,
                status: 1,
                isVerified: 1,
                registeredAt: 1,
                registeredEvents: 1,
                waitlistedEvents: 1,
                loginHistory: 1,
                lastLogin: 1,
                createdAt: 1,
              },
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await User.aggregate(pipeline);
    const users = result[0]?.users || [];
    const totalCount = result[0]?.totalCount[0]?.count || 0;

    return {
      status: 200,
      data: users,
      isPreviousPage: page > 1,
      isNextPage: totalCount > skip + users.length,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
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

export const GetUserRegisteredEvents = async (userId: string) => {
  try {

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
    const user = await User.findById(userId).populate(
      "waitlistedEvents.eventId"
    );

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


// get single user for updaet
  // check if the user exist



export const GetSingleUserData = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    return {
      status: 200,
      data: deepConvertToPlainObject(user as unknown as IUser),
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { status: 500, message: "Error getting user", error };
  }
};
