import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import dbConnect from "../../../lib/dbConnect"
import { compare } from "bcrypt"
import User from "../../../models/user.model"

if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("Please provide process.env.NEXTAUTH_SECRET");
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "example@email.com"
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials, req) {
                await dbConnect();

                // Find user with the email
                const user = await User.findOne({
                    email: credentials?.email,
                });

                // Email Not found
                if (!user) {
                    throw new Error("Email is not registered");
                }

                // Check hased password with DB hashed password
                const isPasswordCorrect = await compare(
                    credentials!.password,
                    user.hashedPassword
                );

                // Incorrect password
                if (!isPasswordCorrect) {
                    throw new Error("Password is incorrect");
                }

                return user;
            }
        }),
        GoogleProvider({
            // @ts-ignore
            clientId: process.env.GOOGLE_CLIENT_ID,
            // @ts-ignore
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            // @ts-ignore
            clientId: process.env.GITHUB_ID,
            // @ts-ignore
            clientSecret: process.env.GITHUB_SECRET,
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (account?.accessToken) {
                token.accessToken = account.access_token
            }
            if (user?.role) {
                token.roles = user.role
            }
            return token;
        },
        async session({ session, token, user }:any) {
            // Send properties to the client, like an access_token from a provider.
            // session.user = token;
            if(token?.accessToken) {
                session.accessToken = token.accessToken
            }
            if (token?.role) {
                session.user.role = token.role
            }
            return session
        }
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET
};
  
export default NextAuth(authOptions);