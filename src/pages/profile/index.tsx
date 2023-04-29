import MainLayout from '@/layouts/MainLayout'
import Loading from '@/components/Loading'

const Profile = () => {
    return (
        <MainLayout>
            <div className="container">
                <div className="grid place-content-center min-h-screen">
                    <div style={{ maxWidth: "700px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: '20px' }}>Profile</div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

Profile.auth = {
    roles: ["ADMIN"],
    loading: <Loading />,
    unauthorized: "/unauthorized", // redirect to this url
}


export default Profile