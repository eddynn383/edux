import prisma from '../../lib/prismadb'
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getServerSession(req, res, authOptions)

    console.log("***** SEND SESSION ON NAVIGATION ROUTER *****")
    console.log(session)
  
    try {
        const navEntries = await prisma.navigationItem.findMany({
            where: {
                isPublish: true,
                allowedUsers: {
                    has: session?.user?.id
                },
            },
            // include: {
            //     children: true,
            // }
        })
        console.log(navEntries)
        res.status(200).json(navEntries);
    
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};
  
export default handler;