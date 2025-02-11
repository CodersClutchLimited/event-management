import { UserRole } from "@/lib/models/types"
import { RoleTypes } from "@/lib/types"
import NextAuth, {type DefaultSession, type User as NextAuthUser } from "next-auth"

export interface ExtendedUser extends NextAuthUser {
  _id: string,
  role: RoleTypes,
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