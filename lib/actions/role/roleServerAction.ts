"use server";
import Role from "@/lib/models/role.model";
import { deepConvertToPlainObject } from "@/lib/utils";
import { revalidatePath } from "next/cache";

interface RoleData {
  name: string;
  description?: string;
  permissions: string[];
}

export const addRoleServerAction = async (roleData: RoleData) => {
  try {
    // Ensure name and permissions are provided
    if (!roleData.name || !roleData.permissions) {
      return {
        status: 400,
        message: "Role name and permissions are required.",
      };
    }

    // Check if role already exists
    const existingRole = await Role.findOne({ name: roleData.name });
    if (existingRole) {
      return {
        status: 400,
        message: "Role with this name already exists.",
      };
    }

    // Create and save the new role
    const newRole = new Role({
      name: roleData.name,
      description: roleData.description || "",
      permissions: roleData.permissions,
    });

    await newRole.save();

    return {
      status: 200,
      message: "Role added successfully",
    };
  } catch (error) {
    console.error("Error adding role:", error);
    return {
      status: 500,
      message: "Failed to add role",
    };
  }
};

export const fetchRolesServerAction = async () => {
  try {
    const roles = await Role.find({});
    return {
      status: 200,
      message: "Roles fetched successfully",
      data: roles,
    };
  } catch (error) {
    console.error("Error fetching roles:", error);
    return {
      status: 500,
      message: "Failed to fetch roles",
    };
  }
};

export const getRoleByNameServerAction = async (roleName: string) => {
  try {
    if (!roleName) {
      return {
        status: 400,
        message: "Role name is required",
      };
    }

    const role = await Role.findOne({ name: roleName });

    if (!role) {
      return {
        status: 404,
        message: "Role not found",
      };
    }

    return {
      status: 200,
      message: "Role fetched successfully",
      data: deepConvertToPlainObject(role),
    };
  } catch (error) {
    console.error("Error fetching role by name:", error);
    return {
      status: 500,
      message: "Failed to fetch role",
    };
  }
};

export const UpdatePermissionLevel = async (
  roleName: string,
  permissionKey: string,
  newLevel: string
) => {
  try {
    // Retrieve the role
    const role = await Role.findOne({ name: roleName });

    if (!role) {
      console.log("Role not found");
      return { status: 404, message: "Role not found" };
    }

    console.log("Existing permissions:", role.permissions);
    console.log("Permission key:", permissionKey);

    // Ensure permissions is an object and not undefined
    if (!role.permissions || typeof role.permissions !== "object") {
      return { status: 400, message: "Invalid permissions format" };
    }

    // Use object notation instead of `.get()`
    const permission = role.permissions[permissionKey];

    if (!permission) {
      console.log(
        `Permission "${permissionKey}" not found in`,
        role.permissions
      );
      return { status: 404, message: "Permission not found" };
    }

    // Update the permission level
    permission.level = newLevel;

    // Save the updated role
    await role.save();

    // Revalidate the paths
    revalidatePath(
      `/settings/roles-permissions/${roleName}/edit-permission-${roleName}`,
      "page"
    );
    revalidatePath(`/settings/roles-permissions/${roleName}`, "page");
    revalidatePath("/settings/roles-permissions", "page");

    return { status: 200, message: "Permission level updated successfully" };
  } catch (error) {
    console.error("Error updating permission level:", error);
    return { status: 500, message: "Internal server error" };
  }
};
