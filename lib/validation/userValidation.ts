
import { z } from "zod"

export const userSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  initial: z.string().min(1).optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format" }).optional(),
  role: z.string().min(1, { message: "Role is required" }),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1)
  }).optional()
});

export const deleteUserSchemaMessage = z.object({
  reason: z.string().min(10, "Reason must be at least 10 characters long"),
});
