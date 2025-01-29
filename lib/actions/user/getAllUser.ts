"use server";

import { User } from "@/lib/models/user.model";
import { IUser, UserDataInterfaceProps } from "@/lib/types";

import { deepConvertToPlainObject } from "@/lib/utils";
import { PipelineStage } from "mongoose";

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
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { status: 404, message: "User not found" };
    }
    return { status: 200, data: deepConvertToPlainObject(user) };
  } catch {
    return { status: 500, message: "Error getting user" };
  }
};

// export const GetAllUSersData = async ({
//   query,
//   page = 1,
//   limit = 10,
//   userType,
// }: {
//   query?: string;
//   page?: number;
//   limit?: number;
//   userType: string;
// }) => {
//   try {
//     // skip  number fo pages nase on the page params
//     const skip = (page - 1) * limit;

//     //  using pipeline to fetch user information

//     const pipeline: PipelineStage = [
//       // skip
//       { $skip: skip },
//       { $limit: limit },
//       { $sort: { createdAt: -1 } },

//       // then project the user information
//       {
//         $project: {
//           firstName: 1,
//           lastName: 1,
//           initial: 1,
//           email: 1,
//           phoneNumber: 1,
//           avatar: 1,
//           address: 1,
//           password: 2,
//           role: 1,
//           registeredEvents: 1,
//           waitlistedEvents: 1,
//           lastLogin: 1,
//           attendedEvents: 1,
//           status: 1,
//         },
//       },
//     ];

//     // if search query is available then do the searching
//     if (query) {
//       pipeline.unshift({
//         $search: {
//           index: "users",
//           text: {
//             query,
//             fuzzy: { maxEdits: 1, prefixLength: 3, maxExpansions: 50 },
//             path: { wildcard: "*" },
//           },
//         },
//       });
//     }
//     const USerData = await User.aggregate(pipeline);
//     const USers = deepConvertToPlainObject(USerData);
//     const totalCount = await User.countDocuments();

//     return {
//       status: 200,
//       data: USers as unknown as IUser,
//       isPreviousPage: page > 1,
//       isNextPage: totalCount > skip + USerData.length,
//       totalCount,
//     };
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     return {
//       status: 500,
//       message: "Failed to fetch user data",
//     };
//   }
// };
