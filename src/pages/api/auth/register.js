import { hash } from 'bcryptjs';
import dbConnect from '../../utils/mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Method not allowed'
        });
    }

    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(422).json({
            message: 'Invalid input'
        });
    }

    const hashedPassword = await hash(password, 10);

    const db = await dbConnect(process.env.USERSDB_URI);

    const existingUser = await db.collection('users').findOne({
        email
    });

    if (existingUser) {
        return res.status(422).json({
            message: 'User already exists'
        });
    }

    const result = await db.collection('users').insertOne({
        email,
        password: hashedPassword
    });

    return res.status(201).json({
        message: 'User created successfully'
    });
}