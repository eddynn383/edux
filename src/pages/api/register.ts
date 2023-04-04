import type { NextApiRequest, NextApiResponse } from "next";
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

    const emailUser = await prisma.user.findUnique({
        where: { email: email }
    })

    if (emailUser) {
        return { error: "Email already exists" };
    }

    if (password.length < 8) {
        return { error: "Password must have 8 or more characters" };
    }

    return null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        try {
            const { name, email, password, roles } = req.body;

            console.log(req.body)
            const errorMessage = await validateForm(email, password);
            if (errorMessage) {
                return res.status(400).json(errorMessage as ResponseData);
            }
            // encrypt the password
            const hashedPassword = await bcrypt.hash(password, 12);
            
            // insert the new user into database
            const user:any = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    roles
                }
            })
        
            return res.status(200).json(user)
        } catch (error:any) {
            return res.status(500).json({error: error.message})
        }
    }

    res.setHeader('Allow', ['GET', 'POST'])
    res.status(425).end(`Method ${req.method} is not allowed.`)
}