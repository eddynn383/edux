import { NextApiRequest, NextApiResponse } from 'next';
import Navigation from '@/models/navigation.model';
import dbConnect from '@/lib/dbConnect';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { db } = await dbConnect('NavDB')


    const { method } = req;
  
    switch (method) {
        case 'GET':
            try {
                const { roles } = req.query;
                const filter = roles ? { 
                    roles: { $in: roles } 
                } : {}
                const navItems = await Navigation.find(filter);
                res.status(200).json(navItems);
            } catch (err) {
                res.status(500).json({ message: 'Server error' });
            }
            break;
        case 'POST':
            try {
                const { label, link, icon, roles, children } = req.body;
                const newNavItem = new Navigation({
                    label,
                    link,
                    icon,
                    roles,
                    children,
                });
                await newNavItem.save();
                res.status(201).json(newNavItem);
            } catch (err) {
                res.status(500).json({ message: 'Server error' });
            }
            break;
        case 'PUT':
            try {
                const { id } = req.query;
                const { label, link, icon, roles, children } = req.body;
                const updatedNavItem = await Navigation.findByIdAndUpdate(id, { label, link, icon, roles, children }, { new: true });
                res.status(200).json(updatedNavItem);
            } catch (err) {
                res.status(500).json({ message: 'Server error' });
            }
            break;
        case 'DELETE':
            try {
                const { id } = req.query;
                await Navigation.findByIdAndRemove(id);
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