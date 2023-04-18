import prisma from '../../lib/prismadb'
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getServerSession(req, res, authOptions)

    console.log("***** SEND SESSION ON USER ROUTER *****")
    console.log(session)

    const { method } = req;
  
    switch (method) {
        case 'GET':
            try {
                const { id } = req.query;

                if (id) {
                    const users = await prisma.user.findUnique({
                        where: {
                            id: String(id)
                        }
                    });
                    res.status(200).json(users);
                } else {
                    const users = await prisma.user.findMany()
                    res.status(200).json(users);
                }

                // Else statement -- To be implemented
            
            } catch (error:any) {
                res.status(500).json({ error: error.message });
            }
            break;  
        case 'POST':
            try {
                const { name, email, image, roles } = req.body;
                const newUser = await prisma.user.create({ 
                    data: {
                        name, 
                        email, 
                        image, 
                        roles
                    } 
                });
        
                // await newNavEntries.save();
                res.status(201).json(newUser);
            } catch (error:any) {
                res.status(500).json({ error: error.message });
            }
            break;
        case 'PUT':
            try {
                const { id } = req.query;
                const { name, email, image, roles /* allow change the user roles only by users with rights */ } = req.body;
                const updateUser = await prisma.user.update({
                    where: {
                        id: String(id)
                    },
                    data: {
                        name, 
                        email, 
                        image, 
                        roles

                        //To implement
                        //allowedUsers,
                        //updatedById,
                        //updatedDate
                    }
                })

                res.status(200).json(updateUser);
            } catch (err) {
                res.status(500).json({ message: 'Server error' });
            }
            break;
        case 'DELETE':
            try {
                const { ids }:any = req.query;

                console.log("***** USERs ID TO DELETE *****")
                const newIds = ids.split(',');
                console.log(newIds)

                const deleteNavEntries = await prisma.user.deleteMany({
                    where: {
                        id: { in: newIds}
                    }
                })
                res.status(200).json(deleteNavEntries);
            } catch (err) {
                res.status(500).json({ message: 'Server error' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
  
export default handler;