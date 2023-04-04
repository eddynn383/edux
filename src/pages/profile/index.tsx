import MainLayout from '@/layouts/MainLayout'

const Profile = () => {
  return (
    <MainLayout>
        <div className="container">
            <div className="grid place-content-center min-h-screen">
                <div style={{maxWidth: "700px"}}>
                    <div style={{display: "flex", flexDirection: "column", gap: '20px'}}>Profile</div>
                </div>
            </div>
        </div>
    </MainLayout>
  )
}

export default Profile