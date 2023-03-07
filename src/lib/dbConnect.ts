import mongoose from "mongoose";

if (!process.env.USERSDB_URI) {
    throw new Error("Please add your USERSDB_URI to env.local");
}

const MONGODB_URI: string = process.env.USERSDB_URI

let globalWithMongoose = global as typeof globalThis & {
    mongoose: any
}

let cached = globalWithMongoose.mongoose

if (!cached) {
    cached = globalWithMongoose.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
    
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        });
    }
    cached.conn = await cached.promise

    return cached.conn
}

export default dbConnect