import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./prisma";
import { compare } from "bcrypt";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        
    },
    pages: {
        signIn: "/sign-in",
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "johndoe@email.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            // Add logic here to look up the user from the credentials supplied
            if (!credentials?.email || !credentials?.password) {
              return null;
            }

            const existingUser = await db.user.findUnique({
              where: { email: credentials?.email }
            });
            if (!existingUser) {
              return null;
            }

            const passwordMatch = await compare(credentials.password, existingUser.password);

            if (!passwordMatch) {
              return null;
            }
            return {
              id: existingUser.id,
              username: existingUser.username,
              email: existingUser.email,
              role: existingUser.role
            }
            
          }
        })
      ],
      callbacks: { 
        async jwt({ token, user }) {
          if (user) {
            return {
              ...token,
              username: user.username,
              role: user.role
            }
          }
          return token;
        },
        async session({ session, token }) {
          return {
            ...session,
            user: {
              ...session.user,
              username: token.username,
              role: token.role
            }
        }
      }
    },
  };
   

