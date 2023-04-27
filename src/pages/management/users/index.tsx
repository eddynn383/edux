import Loading from "@/components/Loading"
import MainLayout from "@/layouts/MainLayout"

const Users = () => {
    return (
        <MainLayout>
            <div>This is user page</div>
        </MainLayout>
    )
}

Users.auth = {
    roles: ["ADMIN"],
    loading: <Loading />,
    unauthorized: "/unauthorized", // redirect to this url
}

export default Users