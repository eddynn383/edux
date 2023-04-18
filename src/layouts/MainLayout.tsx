import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { useTheme } from 'next-themes'
import Image from 'next/image'
import useSWR from "swr"
import Menu from "../components/Menu"
import PageHead from "@/modules/PageHead";
import PageBody from "@/modules/PageBody";
import LightLogo from '../assets/images/logo-light.svg'
import DarkLogo from '../assets/images/logo-dark.svg'
import sx from '../styles/layout.module.scss'

const MainLayout = ({ children }:any) => {
    const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());
    const { resolvedTheme:theme } = useTheme()
    const { data: session, status } = useSession()
    const [ menuData, setMenuData ] = useState(null);
    const { data: navigationData } = useSWR('/api/navigation', fetcher);

    let logo = theme === 'dark' ? DarkLogo : LightLogo

    useEffect(() => {
        setMenuData(navigationData)
        console.log(session)
    }, [navigationData, session])
    
    return (
        <> 
            <div className={sx.main}>
                <div className={sx.left}>
                    <div className={sx.inner}>
                        <div className={sx.logo}>
                            <Image className={sx.volvo} src={logo} alt="Volvo" />
                        </div>
                        <div className={sx.menu}>
                            <Menu data={menuData} theme={theme} />
                        </div>
                    </div>
                </div>
                <div className={sx.right}>
                    <div className={sx.inner}>
                        <PageHead theme={theme} />
                        <PageBody theme={theme} >
                            {children}
                        </PageBody>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainLayout