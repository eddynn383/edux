import React from "react";
import { useSession } from "next-auth/react"
import { authOptions } from "../api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import type { GetServerSidePropsContext } from "next";
import MainLayout from "@/layouts/MainLayout";

const Dashboard = ({data}:any) => {
    const { data: session, status } = useSession()

    // console.log(session)
    // console.log(status)
    return (
        <MainLayout data={data}>
            <div className="container">
                <div className="grid place-content-center min-h-screen">
                    <div style={{maxWidth: "700px"}}>
                        <div style={{display: "flex", flexDirection: "column", gap: '20px'}}>Dashboard</div>
                        <p>{session?.user?.email}</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

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

export default Dashboard;
