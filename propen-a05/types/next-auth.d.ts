import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: number
    username: string
    email: string
    role: string
  }
  interface Session {
    user: User & {
        username: string
        role: string
        }
        token: {
            username: string
            role: string
        }
    }
}