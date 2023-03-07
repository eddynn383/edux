import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/user.model";
import bcrypt from "bcrypt"

interface ResponseData {
    error?: string;
    msg?: string;
}

const validateEmail = (email: string): boolean => {
    const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regEx.test(email);
};

const validateForm = async (email: string, password: string) => {

    if (!validateEmail(email)) {
        return { error: "Email is invalid" };
    }

    await dbConnect();

    const emailUser = await User.findOne({ email: email });

    if (emailUser) {
        return { error: "Email already exists" };
    }

    if (password.length < 8) {
        return { error: "Password must have 8 or more characters" };
    }

    return null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Method not allowed'
        });
    }

    const { name, email, password, roles } = req.body;
    const errorMessage = await validateForm(email, password);

    if (errorMessage) {
        return res.status(400).json(errorMessage as ResponseData);
    }

    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // insert the new user into database
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        roles
    });

    newUser.save().then(() => {
        res.status(200).json({ msg: "Successfuly created new User: " + newUser })
    }).catch((err: String) => {
        res.status(400).json({ error: "Error on '/api/register': " + err })
    })
}