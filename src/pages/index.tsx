import Head from 'next/head'
import { useEffect } from 'react'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import type { GetServerSidePropsContext } from "next";
import { useRouter } from 'next/router'

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }
}

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        router.push('/dashboard')
    }, [router])

    return null
}

