// import { useSession } from 'next-auth/react';
// import dbConnect from '@/lib/dbConnect';
// import { ObjectId } from 'mongodb';

// async function getUserRoles(userId:any) {
//   const { db } = await dbConnect('UserDB');
//   const users = db.collection('users');
//   const user = await users.findOne({ _id: new ObjectId(userId) });
//   return user?.roles ?? [];
// }

// export default async function session(req:any, res:any) {
//   const session = await useSession({ req });

//   if (session?.user) {
//     const { userId } = session.user;
//     const roles = await getUserRoles(userId);
//     session.user.roles = roles;
//   }

//   res.send({ session });
// }
