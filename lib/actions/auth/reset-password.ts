"use server";

import { z } from "zod";

import connectDB from "@/lib/db";
import { User } from "@/lib/models/user.model";
import { ResetPasswordValidation } from "@/lib/validation/auth";
import { generateToken } from "@/lib/jwt-token";
import { sendPasswordResetEmail } from "@/lib/mail";

// import { generatePasswordResetToken } from "@/lib/token"
// import { sendPasswordResetEmail } from "@/lib/mail"

type ResetPasswordInput = z.infer<typeof ResetPasswordValidation>;

export const resetPassword = async (values: ResetPasswordInput) => {
  const validatedFields = ResetPasswordValidation.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  await connectDB();

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  // if (existingUser.provider !== UserProvider.CREDENTIALS) {
  //   return { error: "Email has already been used for third-party login" }
  // }

  const passwordResetToken = await generateToken({ email });
  // console.log({passwordResetToken})

  // console.log("generate token", passwordResetToken);

  await sendPasswordResetEmail(email, passwordResetToken);

  // const passwordResetToken = await generatePasswordResetToken(email)

  // await sendPasswordResetEmail(
  //   passwordResetToken.email,
  //   passwordResetToken.token
  // )

  return { success: "Reset email sent!" };
};
