import { UserRole } from "@/lib/models/types"
import NextAuth, {type DefaultSession, type User as NextAuthUser } from "next-auth"

export interface ExtendedUser extends NextAuthUser {
  _id: string,
  role: UserRole,
  firstName: string,
    initial: string,
  lastName: string,
  provider: string,
  isTwoFactorEnabled: boolean
}

declare module "next-auth" {
  interface User extends Partial<ExtendedUser> {}
   interface Session {
    user: ExtendedUser & DefaultSession["user"]
  } 
}