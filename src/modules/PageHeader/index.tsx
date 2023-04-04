import Profile from "@/components/Profile"
import { useRouter } from "next/router"

const PageHeader = () => {
    const router = useRouter()
    const currentPageName = router.pathname.replace("/", "")
    return (
        <div className="page-header">
            <div className="page-inner">
                <h1>{currentPageName}</h1>
                <Profile />
            </div>
        </div>
    )
}

export default PageHeader