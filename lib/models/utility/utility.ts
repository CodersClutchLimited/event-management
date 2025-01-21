import ActivityLog from "../activityLog";

/**
 * Logs user activity to the ActivityLog.
 *
 * @param userId - The ID of the user performing the action.
 * @param actionType - The type of action performed by the user.
 * @param resource - The resource associated with the action.
 * @param resourceId - The ID of the resource associated with the action.
 * @param description - A description of the action performed.
 * @param changes - Any changes made during the action.
 * @returns A promise that resolves when the activity is logged.
 * @throws Will log an error message if the activity logging fails.
 */
export const logUserActivity = async (
  userId: string,
  actionType: string,
  resource: unknown,
  resourceId: string,
  description: string,
  changes: unknown
) => {
  try {
    await ActivityLog.create({
      userId,
      actionType,
      resource,
      resourceId,
      description,
      changes,
    });
  } catch (error) {
    console.error("Failed to log user activity:", error);
  }
};
