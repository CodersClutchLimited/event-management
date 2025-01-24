import mongoose from "mongoose";

const SystemSettingsSchema = new mongoose.Schema({
  general: {
    systemName: { type: String, default: "Event Management System" },
    logo: { type: String, default: "default-logo.png" }, // URL to logo
    contactEmail: { type: String, default: "support@example.com" },
    contactPhone: { type: String, default: "+1234567890" },
  },

  userManagement: {
    allowUserRegistration: { type: Boolean, default: true }, // Can users sign up?
    maxFailedLogins: { type: Number, default: 5 }, // Lock user after X failed logins
  },

  eventManagement: {
    allowWaitlist: { type: Boolean, default: true }, // Enable waitlisting
  },

  notifications: {
    enableEmailNotifications: { type: Boolean, default: true },
    enableSMSNotifications: { type: Boolean, default: false },
    enableAppNotifications: { type: Boolean, default: true },
    eventReminderSchedule: { type: Number, default: 24 }, // Hours before event to send reminders
  },

  paymentSettings: {
    enablePaidEvents: { type: Boolean, default: false },
    supportedCurrencies: { type: [String], default: ["USD"] },
    paymentGateway: {
      provider: {
        type: String,
        enum: ["Stripe", "PayPal", "None"],
        default: "None",
      },
      apiKey: { type: String, default: "" }, // API key for payment processing
    },
  },

  updatedAt: { type: Date, default: Date.now },
});
const SystemSetting =
  mongoose.models?.SystemSettings ||
  mongoose.model("SystemSettings", SystemSettingsSchema);

export default SystemSetting;
