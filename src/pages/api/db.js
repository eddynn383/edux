import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
    try {
        const db = await dbConnect(process.env.USERSDB_URI);
        console.log('Database connected successfully!');
        // Perform database operations here
    } catch (error) {
        console.error('Database connection error:', error);
        // Handle connection errors here
    }
}