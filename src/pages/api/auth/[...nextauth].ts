import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { userService } from "../../../services/UserService";
import type { NextAuthOptions } from "next-auth"

if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("Please provide process.env.NEXTAUTH_SECRET");
}

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        // ...add more providers here
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            id: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    throw new Error("No credentials.");
                }
                const { email, password } = credentials as any;
                // const res = await fetch("http://localhost:8000/auth/login", {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify({
                //         username,
                //         password,
                //     }),
                // });

                // const user = await res.json();

                // console.log({ user });

                // if (res.ok && user) {
                //     return user;
                // } else return null;

                return userService.signInCredentials(email, password);
            }
        }),
        GoogleProvider({
            // @ts-ignore
            clientId: process.env.GOOGLE_CLIENT_ID,
            // @ts-ignore
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            // return { ...token, ...user };
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            // session.user = token;
            if (token && session.user) {
                session.user.role = token.role;
            }

            return session;
        }
    }
};
  
export default NextAuth(authOptions);