import { useEffect, useState } from "react";
import imageUrl from '../assets/images/login.jpg'
import LightLogo from '../assets/images/logo-light.svg'
import DarkLogo from '../assets/images/logo-dark.svg'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import sx from '../styles/layout.module.scss'
import Menu from "../components/Menu"
import { useSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next";
import { getUserByEmail } from "@/utils/users";
import useSWR from "swr"
import PageHeader from "@/modules/PageHeader";

const MainLayout = ({ children }:any) => {
    const { resolvedTheme } = useTheme()
    const { data: session, status } = useSession()
    const [ menuData, setMenuData ] = useState(null);
    const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());
    const { data: navigationData } = useSWR('/api/navigation', fetcher);

    let logo = resolvedTheme === 'dark' ? DarkLogo : LightLogo

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
                            <Menu data={menuData} theme={resolvedTheme} />
                        </div>
                    </div>
                </div>
                <div className={sx.right}>
                    <div className={sx.inner}>
                        <PageHeader />
                        <div className="page-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainLayout