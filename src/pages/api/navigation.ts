import prisma from '../../lib/prismadb'
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getServerSession(req, res, authOptions)

    console.log("***** SEND SESSION ON NAVIGATION ROUTER *****")
    console.log(session)

    const { method } = req;
  
    switch (method) {
        case 'GET':
            try {
                const { id } = req.query;

                if (id) {
                    const navEntry = await prisma.navigationItem.findUnique({
                        where: {
                            id: String(id)
                        }
                    });
                    res.status(200).json(navEntry);
                } else {
                    const navEntries = await prisma.navigationItem.findMany({
                        where: {
                            allowedUsers: {
                                has: session?.user?.id
                            }
                        }
                    })
                    console.log(navEntries)
                    res.status(200).json(navEntries);
                }
            
            } catch (error:any) {
                res.status(500).json({ error: error.message });
            }
            break;
        case 'POST':
            try {
                const { title, url, icon, createdById, updatedById, allowedUsers, parentId, childItems } = req.body;

                let parentNavEntry = null;

                if (parentId) {
                    parentNavEntry = await prisma.navigationItem.findUnique({
                        where: {
                            id: parentId
                        }
                    });
                    console.log("***** NAV PARENT OBJECT *****")
                    console.log(parentNavEntry)
                }

                const newNavEntries = await prisma.navigationItem.create({ 
                    data: {
                        title, 
                        url, 
                        icon, 
                        createdById,
                        updatedById,
                        allowedUsers,
                        parentId: parentId
                    } 
                });

                if (parentNavEntry) {
                    console.log(parentNavEntry)
                    await prisma.navigationItem.update({
                        where: {
                            id: parentId
                        },
                        data: {
                            childItems: {
                                connect: {
                                    id: newNavEntries.id
                                }
                            }
                        }
                    });
                }
        
                // await newNavEntries.save();
                res.status(201).json(newNavEntries);
            } catch (error:any) {
                res.status(500).json({ error: error.message });
            }
            break;
        case 'PUT':
            try {
                const { id } = req.query;
                const { title, url, icon, isPublish, /*allowedUsers, updatedById, updatedDate*/ childItems } = req.body;
                const updatedNavEntries = await prisma.navigationItem.update({
                    where: {
                        id: String(id)
                    },
                    data: {
                        title, 
                        url, 
                        icon, 
                        isPublish
                        //To implement
                        //allowedUsers,
                        //updatedById,
                        //updatedDate
                    }
                })

                res.status(200).json(updatedNavEntries);
            } catch (err) {
                res.status(500).json({ message: 'Server error' });
            }
            break;
        case 'DELETE':
            try {
                const { ids }:any = req.query;

                console.log("***** ID TO DELETE *****")
                const newIds = ids.split(',');
                console.log(newIds)

                const deleteNavEntries = await prisma.navigationItem.deleteMany({
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