import NextAuth from "next-auth"
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import { encode, decode } from "next-auth/jwt";
import clientPromise from "../../../lib/mongodb"
import dbConnect from "../../../lib/dbConnect"
import User from "../../../models/user.model"
import { compare } from "bcrypt"
import { randomUUID } from "crypto";
// import Cookies from "cookies";

if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("Please provide process.env.NEXTAUTH_SECRET");
}

const getAdapter = (req:NextApiRequest, res:NextApiResponse)=> ({
    ...MongoDBAdapter(clientPromise),
    async getSessionAndUser(sessionToken: string) {
        let db = (await clientPromise).db('UsersDB');
        const userAndSession = await db.collection('sessions').findOne({
            sessionToken : sessionToken
        })
        console.log("SESSION USER :", sessionToken, userAndSession)
        if (!userAndSession) return null
        
        //insert session data whatever you like 
        const { user, ...session } = userAndSession
        console.log("USER", user)
        return { user: user, session : session } as {
            user: any,
            session: any
        }
    },
})

const session = {
    // strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
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

                // console.log(credentials)

                const db = await dbConnect('UsersDB');
                console.log(db)

                // Find user with the email
                const user:any = await User.findOne({
                    email: credentials?.email
                });

                console.log(user)

                // Email Not found
                if (!user) {
                    throw new Error("Email is not registered");
                }

                // Check hased password with DB hashed password
                const isPasswordCorrect = await compare(
                    credentials!.password,
                    user.password
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
            // profile(profile) {
            //     console.log(profile)
            //     return {
            //         id: profile.id,
            //         name: profile.name,
            //         email: profile.email,
            //         image: profile.image,
            //         roles: ["Learner"]
            //     }
            // }
        }),
        GithubProvider({
            // @ts-ignore
            clientId: process.env.GITHUB_ID,
            // @ts-ignore
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
    // database: process.env.MONGODB_URI,
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) {
        //     if (user) {
        //         return true
        //     }
        //     return false
        // },
        async jwt({ token, user, account, profile }) {
            // console.log(profile)
            if (token) {
                // token.accessToken = account.access_token
                // token.id = profile._id
                token.roles = "Learner"
            }   
            // console.log(user)
            return token;
        },
        async session({ session, token, user }:any) {
            // Send properties to the client, like an access_token from a provider.
            if(token?.accessToken) {
                // session.accessToken = token.accessToken
                // session.user.id = token.id
                session.roles = token.roles
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

// export const authOptions = (req:NextApiRequest, res:NextApiResponse) => {
//     const adapter:any = getAdapter(req, res)
//     return {
//         providers: [
//             CredentialsProvider({
//                 id: "credentials",
//                 name: "Credentials",
//                 credentials: {
//                     email: {
//                         label: "Email",
//                         type: "text",
//                         placeholder: "example@email.com"
//                     },
//                     password: {
//                         label: "Password",
//                         type: "password",
//                     },
//                 },
//                 async authorize(credentials:any, req) {
//                     try {
//                         let client = (await clientPromise).db('UsersDB');
//                         const user = await client.collection('users').findOne({email: credentials?.email})
//                         console.log("Authorize User Credentials: ", user);
//                         if (user !== null) {
//                             const res = await compare(credentials!.password, user.password)
//                             if (res === true) {
//                                 let userAccount = {
//                                     id: user._id.toString(),
//                                     name : user.username,  //name & email properties are required (strange)
//                                     email: user.email,
//                                 };
//                                 console.log("UserAccount created: ", userAccount);
//                                 return userAccount;
//                             } else {
//                                 console.log("Wrong password");
//                                 return null;
//                             }
//                         } else {
//                             return null;
//                         }
//                     } catch (error) {
//                         console.log("authorize error :", error);
//                     }
//                     // return user;
//                 }
//             }),
//             // GoogleProvider({
//             //     // @ts-ignore
//             //     clientId: process.env.GOOGLE_CLIENT_ID,
//             //     // @ts-ignore
//             //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             //     // profile(profile) {
//             //     //     console.log(profile)
//             //     //     return {
//             //     //         id: profile.id,
//             //     //         name: profile.name,
//             //     //         email: profile.email,
//             //     //         image: profile.image,
//             //     //         roles: ["Learner"]
//             //     //     }
//             //     // }
//             // }),
//             // GithubProvider({
//             //     // @ts-ignore
//             //     clientId: process.env.GITHUB_ID,
//             //     // @ts-ignore
//             //     clientSecret: process.env.GITHUB_SECRET
//             // })
//         ],
//         callbacks: {
//             session({ session, user }) {
//                 console.log("SESSION callback", session, user)
//                 if (session.user) {
//                     session.user.id = user.id
//                 }
//                 return session
//             },
//             async signIn({ user }) {
//                 if (
//                     req.query.nextauth?.includes("callback") &&
//                     req.query.nextauth?.includes("credentials") &&
//                     req.method === "POST"
//                 ) {
//                     if (user && "id" in user) {
//                         const sessionToken = randomUUID()
//                         const sessionExpiry = new Date(Date.now() + session.maxAge * 1000)
//                         await adapter.createSession({
//                             sessionToken: sessionToken,
//                             userId: user.id,
//                             user: {
//                                 name: user.name,
//                                 email: user.email
//                             },
//                             expires: sessionExpiry,
//                             // userAgent: req.headers["user-agent"] ?? null,
//                         })
//                         const cookies = new Cookies(req, res)
//                         cookies.set("next-auth.session-token", sessionToken, {
//                             expires: sessionExpiry,
//                         })
//                     }
//                 }
//                 return true
//             },
//         },


//         //needs to override default jwt behavior when using Credentials 
//         jwt: {
//             encode(params:any) {
//                 if (
//                     req.query.nextauth?.includes("callback") &&
//                     req.query.nextauth?.includes("credentials") &&
//                     req.method === "POST"
//                 ) {
//                     const cookies = new Cookies(req, res)
//                     const cookie = cookies.get("next-auth.session-token")
//                     if (cookie) return cookie
//                     else return ""
//                 }
//                 // Revert to default behaviour when not in the credentials provider callback flow
//                 return encode(params)
//             },
//             async decode(params:any) {
//                 if (
//                     req.query.nextauth?.includes("callback") &&
//                     req.query.nextauth?.includes("credentials") &&
//                     req.method === "POST"
//                 ) {
//                     return null
//                 }
//                 // Revert to default behaviour when not in the credentials provider callback flow
//                 return decode(params)
//             },
//         },
//         adapter,
//         session,
//     }
// }

// export default async function auth(req:NextApiRequest, res:NextApiResponse) {
//     // Do whatever you want here, before the request is passed down to `NextAuth`
//     return await NextAuth(req, res, authOptions(req, res))
// }