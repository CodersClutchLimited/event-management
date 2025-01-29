"use server";

import { connectDB } from "@/lib/db";
import SystemSetting from "@/lib/models/systemsetting.model";
import { deepConvertToPlainObject } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const systemSettingsData = {
  general: {
    systemName: "My Event Management System",
    logo: "logo-url.png",
    contactEmail: "support@example.com",
    contactPhone: "+1234567890",
  },
  userManagement: {
    allowUserRegistration: true,
    maxFailedLogins: 5,
  },
  eventManagement: {
    allowWaitlist: true,
  },
  notifications: {
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    enableAppNotifications: true,
    eventReminderSchedule: 24,
  },
  paymentSettings: {
    enablePaidEvents: false,
    supportedCurrencies: ["USD"],
    paymentGateway: {
      provider: "None",
      apiKey: "",
    },
  },
};

export const addSystemSettingsServerAction = async () => {
  try {
    // Create and save the system settings
    const newSystemSettings = new SystemSetting(systemSettingsData);
    await newSystemSettings.save();

    return {
      status: 200,
      message: "System settings added successfully",
      // systemSetting: newSystemSettings,
    };
  } catch (error) {
    console.error("Error adding system settings:", error);
    return {
      status: 500,
      message: "Failed to add system settings",
    };
  }
};

export const updateSystemSettings = async (updatedSettings: any) => {
  try {
    if (!updatedSettings || Object.keys(updatedSettings).length === 0) {
      return {
        status: 400,
        message: "No settings provided for update",
      };
    }

    console.log("Settings before update:", updatedSettings);

    const settings = await SystemSetting.findOneAndUpdate(
      { _id: updatedSettings.id },
      { $set: updatedSettings }, // Ensures only specified fields are updated
      { new: true } // Returns the updated document
    );

    if (!settings) {
      return {
        status: 404,
        message: "Failed to update system settings",
      };
    }

    console.log("Settings after update:", settings);

    revalidatePath("./settings");
    return {
      status: 200,
      message: "System settings updated successfully",
      // data: settings, // Return the updated settings if needed
    };
  } catch (error) {
    console.error("Error updating system settings:", error);
    return {
      status: 500,
      message: "Failed to update system settings",
    };
  }
};

export const getSystemSettings = async () => {
  try {
    await connectDB();

    // Retrieve the first system settings document
    const systemSettings = await SystemSetting.findOne();

    if (!systemSettings) {
      return {
        status: 404,
        message: "System settings not found",
      };
    }
    const data = deepConvertToPlainObject(systemSettings);
    return {
      status: 200,
      message: "System settings retrieved successfully",
      data,
    };
  } catch (error) {
    console.error("Error fetching system settings:", error);
    return {
      status: 500,
      message: "Failed to fetch system settings",
    };
  }
};
