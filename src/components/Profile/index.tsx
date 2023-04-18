import { useSession } from "next-auth/react"
import ProfileAvatar from '../../assets/images/profile-avatar.png'
import Avatar from "../Avatar"
import sx from '../../styles/component.module.scss'

const Profile = ({data, id, theme, size}:any) => {
    const { data: session, status } = useSession()
    // console.log('PROFILE')
    // console.log(session)
    // console.log(ProfileAvatar)
    if (status === "loading") {
        return <div>Loading...</div>
    }
    
    if (!session) {
        return <div>You are not logged in</div>
    }
    
    const user = session?.user
    const {image, name, email, roles}:any = user
    const role = roles[roles.length - 1]
    
    // console.log(image)
    return (
        <div className={sx.profile} id={id} data-theme={theme} data-size={size}>
            <div className={sx["profile-left"]}>
                <Avatar src={image ? image : ProfileAvatar} alt={email} theme={theme} size={size} type="square"/>
            </div>
            <div className={sx["profile-right"]}>
                <span className={sx["profile-name"]}>{name ? name : email}</span>
                {size !== "small" && <span className={sx["profile-role"]}>{role}</span>}
            </div>
        </div>
    )
}

export default Profile