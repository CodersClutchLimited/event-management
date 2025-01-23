import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // ID of the user performing the action
    actionType: { type: String, required: true }, // E.g., "Create", "Update", "Delete", "Login"
    resource: { type: String, required: true }, // The type of resource affected, e.g., "Transaction", "Account"
    resourceId: { type: mongoose.Schema.Types.ObjectId, required: false }, // ID of the resource, if applicable
    description: { type: String, required: true }, // Description of the action, e.g., "Deleted a transaction"
    changes: { type: Object, required: false }, // Stores details of changes, useful for updates
  },
  { timestamps: true }
);

const ActivityLog =
  mongoose.models.ActivityLog ||
  mongoose.model("ActivityLogs", activityLogSchema);

export default ActivityLog;
