import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import type { NextComponentType } from 'next' //Import Component type
import { SessionProvider, useSession } from 'next-auth/react'
// import { Provider } from 'react-redux'
// import { store } from '../services/store'
// import useTheme from '@/hooks/useTheme'
// import useLocalStorage from 'use-local-storage'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { config } from "@fortawesome/fontawesome-svg-core";
import { library } from '@fortawesome/fontawesome-svg-core'
import { ThemeProvider } from 'next-themes'
import { MenuProvider } from '@/context/menuContext'
import { getNavigation } from '@/lib/fetchApi'
import { useDeviceType } from '@/hooks/useDeviceType'
import router from 'next/router'
import "@fortawesome/fontawesome-svg-core/styles.css";
import '@/styles/globals.scss'

config.autoAddCss = false;

interface AuthProps {
    children: any;
    roles?: string[];
    loading?: React.ReactElement;
    unauthorized?: any;
}

type CustomAppProps = AppProps & {
    Component: NextComponentType & {
        auth?: any;
    },
    serverUserAgent: string;
}

export default function App({ Component, pageProps: { session, ...pageProps }, serverUserAgent }: CustomAppProps) {
    const userAuth = Component?.auth
    const roles = userAuth?.roles
    const loading = userAuth?.loading
    const unauthorized = userAuth?.unauthorized
    const deviceType = useDeviceType(serverUserAgent);

    library.add(fas)

    return (
        <ThemeProvider>
            <SessionProvider session={session}>
                {
                    Component.auth ? (
                        <Auth roles={roles} loading={loading} unauthorized={unauthorized}>
                            <MenuProvider>
                                <Component {...pageProps} deviceType={deviceType} />
                            </MenuProvider>
                        </Auth>
                    ) : (
                        <Component {...pageProps} deviceType={deviceType} />
                    )
                }
            </SessionProvider>
        </ThemeProvider>
    )
}

// Function to determine device type based on user agent
function isMobileDevice(userAgent: string): boolean {
    const regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(userAgent);
}

// Fetch user agent on server-side and pass it as a prop to the app
export async function getServerSideProps({ req }: { req: { headers: { 'user-agent': string } } }) {
    const userAgent = req.headers['user-agent'] || '';

    return {
        props: {
            serverUserAgent: userAgent,
        },
    };
}

function Auth({ children, roles, loading, unauthorized }: AuthProps) {
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const { data: session, status } = useSession({ required: true })
    const userRole: any = session?.user?.roles

    if (status === "loading") {
        return loading
    }

    if (!roles?.some((role: string) => userRole.includes(role))) {
        router.push(unauthorized)
        return
    }

    return children
}