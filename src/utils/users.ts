import prisma from '../lib/prismadb'

export async function getUser() {
    try {
        const users = await prisma.user.findMany()
        return { users }
    } catch (error) {
        return { error }
    }
}

export async function createUser(newUserData: object) {
    try {
        const newUser = await prisma.user.create({data: newUserData})
        return { user: newUser }
    } catch (error) {
        return { error }
    }
}


export async function getUserById(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        })
        
        return { user }
    } catch (error) {
        return { error }
    }
}

export async function getUserByEmail(email: any) {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })
        
        return { user }
    } catch (error) {
        return { error }
    }
}


