export interface RoleTypes {
  name: string;
}

import { Document } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  SUBAdmin = "staff",
}

export enum UserProvider {
  GOOGLE = "google",
  CREDENTIALS = "credentials",
}

export interface IUser extends Document {
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
  lastLogin?: string;
  updatedAt: Date;
  provider: UserProvider;
  attendedEvents: {
    eventId: string; // ObjectId reference
    attendedAt?: Date;
  }[];
  createdAt: string;
}

interface EventSchedule {
  start: string; // ISO date string
  end: string; // ISO date string
}

interface EventNotifications {
  sendReminders: boolean;
  reminderTimes: string[]; // Array of ISO date strings
}

export interface EventInterfaceType {
  map(
    arg0: (item: IUser, index: number) => import("react").JSX.Element
  ): import("react").ReactNode;
  _id: string;
  title: string;
  description: string;
  location: string;
  schedule: EventSchedule;
  registrationDeadline: string; // ISO date string
  maxParticipants: number;
  status: "upcoming" | "ongoing" | "completed" | "canceled";
  isPublished: boolean;
  notifications: EventNotifications;
  registeredUsers: IUser[]; // Array of IUser references
  waitlist: IUser[]; // Array of IUser references
  createdAt: string; // ISO date string
  eventId: string;
}

export interface SystemSettingsTypes {
  general: {
    systemName: string;
    logo: string;
    contactEmail: string;
    contactPhone: string;
  };
  userManagement: {
    allowUserRegistration: boolean;
    maxFailedLogins: number;
  };
  eventManagement: {
    allowWaitlist: boolean;
  };
  notifications: {
    enableEmailNotifications: boolean;
    enableSMSNotifications: boolean;
    enableAppNotifications: boolean;
    eventReminderSchedule: number; // Hours before event
  };
  paymentSettings: {
    enablePaidEvents: boolean;
    supportedCurrencies: string[];
    paymentGateway: {
      provider: "Stripe" | "PayPal" | "None";
      apiKey: string;
    };
  };
  _id: string;
  updatedAt: string;
  __v: number;
}
