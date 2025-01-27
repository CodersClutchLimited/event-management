import { Document } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  STAFF = "staff",
}

export enum UserProvider {
  GOOGLE = "google",
  CREDENTIALS = "credentials",
}

export interface IUser extends Document {
  _id: string;
  firstName: string;
  initial?: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  avatar?: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
  role: UserRole;
  status: "active" | "suspended" | "blocked";
  isVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  registeredEvents: {
    eventId: string; // ObjectId reference
    registeredAt: Date;
  }[];
  waitlistedEvents: {
    eventId: string; // ObjectId reference
    joinedAt: Date;
  }[];
  loginHistory: {
    ipAddress?: string;
    device?: string;
    timestamp: Date;
  }[];
  lastLogin?: Date;
  updatedAt: Date;
  provider: UserProvider;
  attendedEvents: {
    eventId: string; // ObjectId reference
    attendedAt?: Date;
  }[];
  createdAt: Date;
}
