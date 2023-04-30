import NextAuth from "next-auth"
import type { NextAuthOptions, User as NextAuthUser } from "next-auth"
import type { User } from "@prisma/client";

import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt"

import prisma from "../../../lib/prismadb"

if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("Please provide process.env.NEXTAUTH_SECRET");
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubClientId = process.env.GITHUB_ID;
const githubClientSecret = process.env.GITHUB_SECRET;

if (!googleClientId || !googleClientSecret || !githubClientId || !githubClientSecret) {
    console.log(googleClientId)
    console.log(googleClientSecret)
    console.log(githubClientId)
    console.log(githubClientSecret)
    throw new Error("Required environment variables are missing");
}

interface Credentials {
    email?: string;
    password?: string;
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
            //@ts-ignore
            async authorize(credentials: any, req): Promise<User | null> {
                const { email, password } = credentials;
                const user = await prisma.user.findUnique({ where: { email } });

                if (!user) {
                    throw new Error("No user found");
                }
                //@ts-ignore
                const passwordValid = await compare(password, user.password);

                if (!passwordValid) {
                    throw new Error("Invalid password");
                }

                return user;
            }
        }),
        GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
        }),
        GithubProvider({
            clientId: githubClientId,
            clientSecret: githubClientSecret
        })
    ],
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token }:any) {
            const userData = await prisma.user.findUnique({ where: { email: token.email } });

            if (token) {
                console.log('***** jwt callback *****')
                token.id = userData?.id
                token.roles = userData?.roles
            }   

            return token;
        },
        async session({ session, token }:any) {
            // Send properties to the client, like an access_token from a provider.
            if(session) {
                console.log('***** session callback *****')
                session.user.id = token.id;
                session.user.roles = token.roles;
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