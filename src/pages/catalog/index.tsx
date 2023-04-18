import Loading from '@/components/Loading'
import MainLayout from '@/layouts/MainLayout'

const Catalog = () => {
    return (
        <MainLayout>
            <div className="container">
                <div className="grid place-content-center min-h-screen">
                    <div style={{ maxWidth: "700px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: '20px' }}>Catalog</div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

Catalog.auth = {
    roles: ["LEARNER", "MANAGER", "ADMIN"],
    loading: <Loading />,
    unauthorized: "/unauthorized", // redirect to this url
}

export default Catalog