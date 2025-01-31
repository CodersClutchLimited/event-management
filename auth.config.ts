import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { UserProvider, IUser } from "@/lib/types";
import { UserRole } from "@/lib/models/types";
import { SignInValidation } from "./lib/validation/auth";
import { fetchUserByEmail, signInWithOauth } from "@/lib/api-handler/user";
export default {
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  // pages: {
  //   signIn: "/signin", // app/signin
  //   error: "/error", // app/error
  // },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials): Promise<any> {
        const validatedFields = SignInValidation.safeParse(credentials);
        console.log(validatedFields);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const existingUser: IUser | null = await fetchUserByEmail(email);
          // console.log("User", { existingUser });
          if (!existingUser || !existingUser?.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            existingUser?.password
          );

          existingUser.password = "";
          // console.log({user})
          if (passwordsMatch) return existingUser;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // console.log({user})
      console.log({ account, profile });
      if (
        account &&
        account?.provider !== UserProvider.CREDENTIALS &&
        profile
      ) {
        return await signInWithOauth({ account, profile });
      }

      return true;
    },
    async jwt({ token }) {
      // console.log({token})
      if (!token.email) return token;

      // const existingUser = await fetchUserByEmail();
      const existingUser: IUser | null = await fetchUserByEmail(token.email);

      if (!existingUser) return token;

      // console.log({existingUser})
      token._id = existingUser._id;
      token.firstName = existingUser?.firstName;
      token.lastName = existingUser?.lastName;
      token.phoneNumber = existingUser?.phoneNumber;
      token.email = existingUser?.email;
      token.role = existingUser?.role;
      token.provider = existingUser?.provider;
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
    async session({ session, token }) {
      // console.log({session, token})
      if (token._id && session.user) {
        session.user._id = token._id as string;
        session.user.firstName = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as UserRole;
        session.user.provider = token.provider as string;
        // session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
