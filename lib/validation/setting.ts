import { z } from "zod";

export const SettingGeneral = z.object({
  systemName: z.string().min(2, "Brand name must be at least 2 characters."),
  logo: z.instanceof(File).optional(),
  // .refine(
  //   (file) => !file || file.type.startsWith("image/"),
  //   "Only image files are allowed."
  // ),
  //  contact email
  contactEmail: z.string().email("Invalid email address").default(""),
  contactPhone: z.string().min(7, "Invalid phone number").default(""),
});
