import { useSession } from "next-auth/react"
import Image from 'next/image'
import ProfileAvatar from '../../assets/images/profile-avatar.png'

const Profile = () => {
    const { data: session, status } = useSession()
    console.log('PROFILE')
    console.log(session)
    // console.log(ProfileAvatar)
    if (status === "loading") {
        return <div>Loading...</div>
    }
    
    if (!session) {
        return <div>You are not logged in</div>
    }
    
    const user = session?.user
    const {image, email, roles}:any = user
    const role = roles[roles.length - 1]
    
    console.log(image)
    return (
        <div className="profile">
            <Image className="profile" width="36" height="36" src={image ? image : ProfileAvatar} alt={email} /> 
            <p>{role}</p>
        </div>
    )
}

export default Profile