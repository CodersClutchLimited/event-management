import mongoose from "mongoose";

/**
 * Schema for representing a role within the organization.
 * This schema includes the role's name, description, and associated permissions.
 */
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      default: "Administrator",
    },
    description: {
      type: String,
    },
    permissions: {
      type: Map,
      of: {
        level: { type: String, enum: ["full", "view", "off"], default: "off" }, // Default value set to 'off'
      },
      default: {
        view_dashboard: { level: "full" },
        manage_customers: { level: "full" },
        manage_transactions: { level: "full" },
        manage_staffs: { level: "full" },
        manage_marketplace: { level: "full" },
        manage_orders: { level: "full" },
        track_orders: { level: "full" },
        manage_settings: { level: "full" },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);
export default Role;
