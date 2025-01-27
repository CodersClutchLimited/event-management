"use server";

import { z } from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { routes } from "@/routes";
import { connectDB } from "@/lib/db";
import {
  User,
  // TwoFactorToken,
  // TwoFactorConfirmation,
} from "@/lib/models/auth.model";
import { SignInValidation } from "@/lib/validation/auth";
// import { generateToken, generateCode } from "@/lib/jwt-token";
// import { generateVerificationToken, generateTwoFactorToken } from "@/lib/token"
// import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
// import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail"

type SignInInput = z.infer<typeof SignInValidation>;

export const signInWithCredentials = async (
  values: SignInInput,
  callbackUrl?: string | null
) => {
  // console.log({callbackUrl})
  const validatedFields = SignInValidation.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  await connectDB();

  const existingUser = await User.findOne({ email });
  // console.log({existingUser})

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  try {
    console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
    console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
    console.log("DATABASE_URL:", process.env.DATABASE_URL);

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { url: callbackUrl || routes.defaultLoginRedirect };
  } catch (error) {
    console.log("Error signing in with credentials:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
