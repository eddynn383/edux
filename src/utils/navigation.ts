// import prisma from '../lib/prismadb'

// export async function getNavigationItems() {
//     try {
//         const navigationItem = await prisma.navigationItem.findMany()
//         return { navigationItem }
//     } catch (error) {
//         return { error }
//     } 
// }

// export async function createNavigationItem(navigationItem: object) {
//     try {
//         const newNavigationItem = await prisma.navigationItem.create({data: navigationItem})
//         return { navigationItem: newNavigationItem }
//     } catch (error) {
//         return { error }
//     }
// }


// export async function getNavigationItemById(id: string) {
//     try {
//         const navigationItem = await prisma.navigationItem.findUnique({
//             where: { id }
//         })
        
//         return { navigationItem }
//     } catch (error) {
//         return { error }
//     }
// }

// export async function updatedNavigationItem(navigationItem: any, id: string) {
//     try {
//         const user = await prisma.navigationItem.update({
//             data: { data: navigationItem },
//             where: { id }
//         })
        
//         return { navigationItem }
//     } catch (error) {
//         return { error }
//     }
// }

// export async function deleteNavigationItem(id: string) {
//     try {
//         const navigationItem = await prisma.navigationItem.delete({
//             where: { id }
//         })
        
//         return { navigationItem }
//     } catch (error) {
//         return { error }
//     }
// }


