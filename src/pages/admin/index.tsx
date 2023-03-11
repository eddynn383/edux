// pages/admin.tsx
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Button from '@/components/Button'
import Alert from '@/components/Alert';
import MainLayout from "@/layouts/MainLayout";

const AdminDashboard = () => {
    const { data: session } = useSession()
    console.log(session)
    return (
        <MainLayout>
            <div className="container">
                <div className="grid place-content-center min-h-screen">
                    <div style={{maxWidth: "700px"}}>
                        <div style={{display: "flex", flexDirection: "column", gap: '20px'}}>
                            <Alert status="success" variant="solid" action={<Button size="small" variant="text" status="success">Close</Button>}>
                                <Alert.Title>Error</Alert.Title>
                                <Alert.Description>This is an error text</Alert.Description>
                            </Alert>
                            <Alert status="success" variant="outline" action={<Button size="small" variant="text" status="success">Close</Button>}>
                                <Alert.Title>Error</Alert.Title>
                                <Alert.Description>This is an error text</Alert.Description>
                            </Alert>
                            <Alert status="success" variant="standard" action={<Button size="small" variant="text" status="success">Close</Button>}>
                                <Alert.Title>Error</Alert.Title>
                                <Alert.Description>This is an error text</Alert.Description>
                            </Alert>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

AdminDashboard.auth = {
    roles: ["Admin"],
    loading: <p>LOading...</p>,
    unauthorized: "/login-with-different-user", // redirect to this url
}

export default AdminDashboard;
