import { z } from "zod";

// export const SignInValidation = z.object({
//   email: z.string().min(1, "Email is required").email("Invalid email"),
//   password: z
//     .string()
//     .min(1, "Password is required")
//     .min(8, "Password must be 8+ characters"),
//   code: z.optional(z.string()),

export const ResetPasswordValidation = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),

});

export const setUpAccount = z.object({
  firstName: z.string().min(1, "Email is required").email("Invalid email"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be 8+ characters"),
  confirmPassword: z.string().min(1, "Password confirmation is required"),

})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Password do not match",
});



export const NewPasswordValidation = z
  .object({
    newPassword: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be 8+ characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export const SignInValidation = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be 8+ characters"),
  // code: z.optional(z.string()),
});

export const SignUpValidation = z
  .object({
    firstName: z
      .string()
      .min(1, "Username is required")
      .max(50, "Username must be less than 50 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be 8+ characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });
