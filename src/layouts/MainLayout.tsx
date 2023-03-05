import imageUrl from '../assets/images/login.jpg'
import LightLogo from '../assets/images/logo-light.svg'
import DarkLogo from '../assets/images/logo-dark.svg'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import sx from '../styles/layout.module.scss'

const MainLayout = ({ children }:any) => {
    const { resolvedTheme } = useTheme()
    console.log(resolvedTheme )
    let logo = resolvedTheme === 'dark' ? DarkLogo : LightLogo

    return (
        <> 
            <div className={sx.main}>
                <div className={sx.left}>
                    <div className={sx.inner}>
                        <div className={sx.logo}>
                            <Image className={sx.volvo} src={logo} alt="Volvo"/>
                        </div>
                        <div className={sx.navigation}>
                            
                        </div>
                    </div>
                </div>
                <div className={sx.right}>
                    <div className={sx.inner}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainLayout