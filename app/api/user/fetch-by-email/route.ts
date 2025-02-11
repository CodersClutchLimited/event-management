import { NextResponse } from "next/server";
import { User } from "@/lib/models/auth.model";
import { connectDB } from "@/lib/db";
import { IUser } from "@/lib/types";

export async function POST(req: Request) {
  await connectDB();

  const { email } = await req.json();

  const pipeline = [
    // match the user by email
    { $match: { email } },
    // populate the role with a lookup
    {
      $lookup: {
        from: "roles", // Collection name
        localField: "role", // Field in User to join with Role
        foreignField: "_id", // Matching field in Role
        as: "role", // The output field
      },
    },
    { $unwind: { path: "$role", preserveNullAndEmptyArrays: true } },

    // Project necessary fields, including role data
    {
      $project: {
        firstName: 1,
        initial: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
        password: 1,
        avatar: 1,
        address: 1,
        role: 1,
        status: 1,
        isVerified: 1,
        lastLogin: 1,
        createdAt: 1,
        registeredUsers: 1,
        registeredEvents: 1,
        waitlistedEvents: 1,
      },
    },
  ];

  const Result = await User.aggregate(pipeline);

  if (Result[0]) {
    const roleWithPermissions = {
      ...Result[0].role,
      // Safely reveal the permission values by converting each permission object
      permissions: Object.keys(Result[0].role.permissions || {}).reduce(
        (acc: Record<string, string>, key: string) => {
          // Extract only the relevant permission name, customize as needed
          acc[key] = Result[0].role.permissions[key].level || "unknown"; // or any other field like 'level'
          return acc;
        },
        {}
      ),
    };

    const userObject: IUser = {
      ...Result[0],
      _id: Result[0]._id.toString(),
      role: roleWithPermissions, // Attach the role with transformed permissions
    };

    return NextResponse.json(userObject);
  } else {
    return NextResponse.json(null);
  }
}