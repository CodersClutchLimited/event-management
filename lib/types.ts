export interface RoleTypes {
  name: string;
}

import { Document } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  SUBAdmin = "sub-admin",
}

export enum UserProvider {
  GOOGLE = "google",
  CREDENTIALS = "credentials",
}

export interface IUser extends Document {
  fullName: string;
  email: string;
  password?: string;
  image?: string;
  role: UserRole;
  provider: UserProvider;
  emailVerified: Date;
  isTwoFactorEnabled: boolean;
  emailPendingVerification?: string;
  createdAt: Date;
  updatedAt: Date;
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
    arg0: (item: any, index: any) => import("react").JSX.Element
  ): import("react").ReactNode;
  _id: string;
  title: string;
  description: string;
  location: string;
  schedule: EventSchedule;
  registrationDeadline: string; // ISO date string
  maxParticipants: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  isPublished: boolean;
  notifications: EventNotifications;
  registeredUsers: any[]; // Define a specific type if available
  waitlist: any[]; // Define a specific type if available
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
