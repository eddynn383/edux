import { NextApiRequest, NextApiResponse } from 'next';
import { useSession } from 'next-auth/react';
import { getNavigationItems, createNavigationItem, updatedNavigationItem, deleteNavigationItem } from '@/utils/navigation';
// import Navigation from '@/models/navigation.model';
// import dbConnect from '@/lib/dbConnect';
import prisma from '../../lib/prismadb'
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getServerSession(req, res, authOptions)

    console.log("***** SEND SESSION ON NAVIGATION ROUTER *****")
    console.log(session)

    // const { db } = await dbConnect('NavDB')
    // await prisma.connect()

    const { method } = req;
  
    switch (method) {
        case 'GET':
            try {

                // const { navigationItem } = await getNavigationItems()

                const navigationItems = await prisma.navigationItem.findMany({
                    where: {
                        allowedUsers: {
                            has: session?.user?.id
                        }
                    }
                })
            
                res.status(200).json(navigationItems);
            } catch (error:any) {
                res.status(500).json({ error: error.message });
            }
            break;
        case 'POST':
            try {
                const { label, link, icon, createdById, allowedUsers, children } = req.body;
                const newNavItem = await prisma.navigationItem.create({ 
                    data: {
                        label, 
                        link, 
                        icon, 
                        createdById,
                        allowedUsers,
                        children
                    } 
                });
        
                // await newNavItem.save();
                res.status(201).json(newNavItem);
            } catch (error:any) {
                res.status(500).json({ error: error.message });
            }
            break;
        case 'PUT':
            try {
                const { id } = req.query;
                const { label, link, icon, roles, children } = req.body;
                const updatedNavItem = 'none'
                
                // = await Navigation.findByIdAndUpdate(id, { label, link, icon, roles, children }, { new: true });
                res.status(200).json(updatedNavItem);
            } catch (err) {
                res.status(500).json({ message: 'Server error' });
            }
            break;
        case 'DELETE':
            try {
                const { id } = req.query;
                // await Navigation.findByIdAndRemove(id);
                res.status(200).json({ message: 'Navigation item deleted successfully' });
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