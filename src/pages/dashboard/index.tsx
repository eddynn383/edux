import React from "react";
import { useSession } from "next-auth/react"
import { authOptions } from "../api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import type { GetServerSidePropsContext } from "next";
import MainLayout from "@/layouts/MainLayout";
import Loading from "@/components/Loading";

const Dashboard = ({data}:any) => {
    const { data: session, status } = useSession()
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

Dashboard.auth = {
    roles: ["LEARNER"],
    loading: <Loading />,
    unauthorized: "/unauthorized", // redirect to this url
}


export default Dashboard;
