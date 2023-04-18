import Loading from "@/components/Loading"
import MainLayout from "@/layouts/MainLayout"

const Courses = ({data}:any) => {
    return (
        <MainLayout data={data}>
            <div>Courses</div>
        </MainLayout>
    )
}

Courses.auth = {
    roles: ["LEARNER", "MANAGER", "ADMIN"],
    loading: <Loading />,
    unauthorized: "/unauthorized", // redirect to this url
}

export default Courses