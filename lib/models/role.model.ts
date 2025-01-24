import mongoose, { Schema, Document } from "mongoose";

interface Permission {
  level: "full" | "edit" | "view"; // Permission levels
}

interface Role extends Document {
  name: string;
  description: string;
  permissions: {
    view_dashboard?: Permission;
    manage_users?: Permission;
    manage_staffs?: Permission;
    manage_events?: Permission;
    manage_settings?: Permission;
  };
}

const RoleSchema = new Schema<Role>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  permissions: {
    view_dashboard: {
      level: { type: String, enum: ["full", "off", "view"], default: "view" },
    },
    manage_users: {
      level: { type: String, enum: ["full", "off", "view"], default: "view" },
    },
    manage_staffs: {
      level: { type: String, enum: ["full", "off", "view"], default: "view" },
    },
    manage_events: {
      level: { type: String, enum: ["full", "off", "view"], default: "view" },
    },
    manage_settings: {
      level: { type: String, enum: ["full", "off", "view"], default: "view" },
    },
  },
});
const Role = mongoose.models.Role || mongoose.model<Role>("Role", RoleSchema);
export default Role;
