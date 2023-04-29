import imageUrl from '../assets/images/login.jpg'
import LightLogo from '../assets/images/logo-light.svg'
import DarkLogo from '../assets/images/logo-dark.svg'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import sx from '../styles/layout.module.scss'

const AuthLayout = ({ children, device }:any) => {
    const { resolvedTheme  } = useTheme()
    // console.log(resolvedTheme )
    let logo = resolvedTheme  === 'dark' ? DarkLogo : LightLogo

    const desktopLayout = (
        <div className={sx.auth}>
            <div className={sx.left}>
                <div className={sx.inner}>
                    <div className={sx.logo}>
                        <Image className={sx.volvo} src={logo} alt="Volvo"/>
                    </div>
                    <div className={sx.form}>
                        {children}
                    </div>
                </div>
            </div>
            <div className={sx.right}>
                <div className={sx.inner}>
                    <div className={sx.wallpaper}>
                        <Image className={sx.image} src={imageUrl} alt="Auth Wallpaper" />
                    </div>
                </div>
            </div>
        </div>
    )

    const mobileLayout = (
        <div className={sx.auth}>
            <div className={sx.top}>
                <div className={sx.inner}>
                    <div className={sx.wallpaper}>
                        <Image className={sx.image} src={imageUrl} alt="Auth Wallpaper" />
                    </div>
                </div>
            </div>
            <div className={sx.bottom}>
                <div className={sx.inner}>
                    <div className={sx.logo}>
                        <Image className={sx.volvo} src={logo} alt="Volvo"/>
                    </div>
                    <div className={sx.form}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )

    return device === "mobile" ? mobileLayout : desktopLayout
}

export default AuthLayout