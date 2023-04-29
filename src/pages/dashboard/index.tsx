import React from "react";
import { useSession } from "next-auth/react"
import { authOptions } from "../api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import type { GetServerSidePropsContext } from "next";
import MainLayout from "@/layouts/MainLayout";
import Loading from "@/components/Loading";
import Content from "@/modules/PageContent";
import Head from "next/head";

const Dashboard = ({data, deviceType}:any) => {
    const { data: session, status } = useSession()
    return (
        <MainLayout data={data}>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Content>
                <div className="container">
                    <div className="grid place-content-center min-h-screen">
                        <div style={{maxWidth: "700px"}}>
                            <div style={{display: "flex", flexDirection: "column", gap: '20px'}}>Dashboard</div>
                            <p>{session?.user?.email}</p>
                            <p>You are using a {deviceType} device.</p>
                        </div>
                    </div>
                </div>
            </Content>
        </MainLayout>
    );
};

Dashboard.auth = {
    roles: ["LEARNER"],
    loading: <Loading />,
    unauthorized: "/unauthorized", // redirect to this url
}


export default Dashboard;
