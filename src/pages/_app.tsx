import type { AppProps } from 'next/app'
import type { NextComponentType } from 'next' //Import Component type
import { SessionProvider, useSession } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '../services/store'
import useTheme from '@/hooks/useTheme'
import useLocalStorage from 'use-local-storage'
import '@/styles/globals.scss'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ThemeProvider } from 'next-themes'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { useApi } from '../hooks/useApi'
import { getNavigation } from '@/lib/fetchApi'
import router from 'next/router'
import { useEffect } from 'react'

config.autoAddCss = false;

interface AuthProps {
    children: any;
    roles?: string[];
    loading?: React.ReactElement;
    unauthorized?: any;
}

type CustomAppProps = AppProps & {
    Component: NextComponentType & {
        auth?: any
    }
    navigation: any
}

export async function getStaticProps() {
    // const {data} = useApi('/api/navigation')
    const navigation = getNavigation()
    // const navigation = await useApi();
    console.log(navigation)
    return {
        props: {
            navigation,
        },
    };
}

export default function App({ Component, pageProps: { session, ...pageProps }, navigation }: CustomAppProps) {
    const userAuth = Component?.auth
    const roles = userAuth?.roles
    const loading = userAuth?.loading
    const unauthorized = userAuth?.unauthorized

    useEffect(() => {
        console.log("***** NAVIGATION DATA FROM _APP *****")
        console.log(navigation)
    }, [navigation])

    library.add(fas)

    return (
        <ThemeProvider>
            <SessionProvider session={session}>
                {
                    Component.auth ? (
                        <Auth roles={roles} loading={loading} unauthorized={unauthorized}>
                            <Provider store={store}>
                                <Component {...pageProps} navigation={ navigation } />
                            </Provider>
                        </Auth>
                    ) : (
                        <Component {...pageProps} />
                    )
                }
            </SessionProvider>
        </ThemeProvider>
    )
}

function Auth({ children, roles, loading, unauthorized }: AuthProps) {
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const { data: session, status } = useSession({ required: true })

    console.log("***** THIS IS FROM AUTH FUNCTION *****")
    console.log(session)
    console.log("***** PAGE ACCESS ROLES *****")
    console.log(roles)
    console.log("***** PAGE STATUS *****")
    console.log(status)
    const userRole: any = session?.user?.roles

    // getNavigation();

    if (status === "loading") {
        return loading
    }

    if (!roles?.some((role: string) => userRole.includes(role))) {
        router.push(unauthorized)
        return
    }

    return children
}