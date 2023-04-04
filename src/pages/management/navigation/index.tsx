import Loading from "@/components/Loading"
import MainLayout from "@/layouts/MainLayout"
import { useSession } from "next-auth/react"

const Navigation = ({data}:any) => {
    const { data: session, status } = useSession()
    
    return (
        <MainLayout data={data}>
            <div className="container">
                <div className="grid place-content-center min-h-screen">
                    <div style={{ maxWidth: "700px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: '20px' }}>Navigation</div>
                        <p>{session?.user?.email}</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

Navigation.auth = {
    roles: ["ADMIN"],
    loading: <Loading />,
    unauthorized: "/unauthorized", // redirect to this url
}

export default Navigation