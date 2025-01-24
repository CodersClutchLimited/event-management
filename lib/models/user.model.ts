import mongoose from "mongoose";
import { UserProvider, UserRole } from "./types";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    initial: { type: String, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    phoneNumber: { type: String, unique: true, sparse: true },
    avatar: { type: String, default: "default-avatar.png" }, // URL to profile picture
    address: {
      street: { type: String },
      city: { type: String },
      country: { type: String },
    },

    role: {
      type: String,
      enum: [UserRole.USER, UserRole.ADMIN],
      default: UserRole.USER,
    },
    status: {
      type: String,
      enum: ["active", "suspended", "blocked"],
      default: "active",
    },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },
    registeredEvents: [
      {
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        registeredAt: { type: Date, default: Date.now },
      },
    ],

    waitlistedEvents: [
      {
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        joinedAt: { type: Date, default: Date.now },
      },
    ],

    loginHistory: [
      {
        ipAddress: { type: String },
        device: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    lastLogin: { type: Date },
    updatedAt: { type: Date, default: Date.now },

    provider: {
      type: String,
      enum: [UserProvider.CREDENTIALS, UserProvider.GOOGLE],
      default: UserProvider.CREDENTIALS,
    },

    attendedEvents: [
      {
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        attendedAt: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const passwordResetTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    unique: true,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

const verificationTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    unique: true,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

const VerificationToken =
  mongoose.models?.VerificationToken ||
  mongoose.model("VerificationToken", verificationTokenSchema);

const PasswordResetToken =
  mongoose.models?.PasswordResetToken ||
  mongoose.model("PasswordResetToken", passwordResetTokenSchema);

const twoFactorTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    unique: true,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

const TwoFactorToken =
  mongoose.models?.TwoFactorToken ||
  mongoose.model("TwoFactorToken", twoFactorTokenSchema);

export const twoFactorConfirmationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
});

const TwoFactorConfirmation =
  mongoose.models?.TwoFactorConfirmation ||
  mongoose.model("TwoFactorConfirmation", twoFactorConfirmationSchema);

export {
  User,
  VerificationToken,
  PasswordResetToken,
  TwoFactorToken,
  TwoFactorConfirmation,
};