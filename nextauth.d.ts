import { DefaultSession, DefaultUser } from "next-auth";
// Define a role enum
export enum Roles {
    learner = "LEARNER",
    manager = "MANAGER",
    admin = "ADMIN",
}

// common interface for JWT and Session
interface IUser extends DefaultUser {
    roles?: Roles;
}

declare module "next-auth" {
    interface User extends IUser {}
    interface Session {
        user?: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends IUser {}
}