import { useEffect, useState } from "react";
import axios from 'axios'
import imageUrl from '../assets/images/login.jpg'
import LightLogo from '../assets/images/logo-light.svg'
import DarkLogo from '../assets/images/logo-dark.svg'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import sx from '../styles/layout.module.scss'
import Menu from "../components/Menu"
import { useSession } from "next-auth/react"

const MainLayout = ({ children }:any) => {
    const { resolvedTheme } = useTheme()
    const { data: session, status } = useSession()

    const [data, setData] = useState(null);

    let logo = resolvedTheme === 'dark' ? DarkLogo : LightLogo

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/navigation?");
            const data = await response.json();
            setData(data);
            console.log(data)
        };
        fetchData();
        console.log(session)
    }, [])
    

    return (
        <> 
            <div className={sx.main}>
                <div className={sx.left}>
                    <div className={sx.inner}>
                        <div className={sx.logo}>
                            <Image className={sx.volvo} src={logo} alt="Volvo"/>
                        </div>
                        <div className={sx.navigation}>
                            <Menu data={data}/>
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