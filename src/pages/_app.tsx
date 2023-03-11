import { createContext, useState } from 'react'
import type { AppProps } from 'next/app'
import type { NextComponentType  } from 'next' //Import Component type
import { SessionProvider, useSession } from 'next-auth/react'
import useTheme from '@/hooks/useTheme'
import useLocalStorage from 'use-local-storage'
import '@/styles/globals.scss'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
import { ThemeProvider } from 'next-themes'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false;


//Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
    Component: NextComponentType & {auth?: boolean} // add auth type
}

export default function App({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) {
    // const [theme, setTheme] = useLocalStorage<string>('theme' ? 'dark' : 'light') 
    // const [theme, setTheme] = useState<string>('light')
    // const toggleTheme:any = () => {
    //     setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
    // }

    // const { theme } = useTheme()

    library.add(fas)
    
    return (   
        <ThemeProvider>
            <SessionProvider session={session}>
                {
                    Component.auth ? (
                        <Auth>
                            <Component {...pageProps} />
                        </Auth>
                    ) : (
                        <Component {...pageProps} />
                    )
                }
            </SessionProvider>
        </ThemeProvider>     
    )
}


function Auth({ children }:any) {
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const { status } = useSession({ required: true })

    // console.log(status)
  
    if (status === "loading") {
        return <div>Loading...</div>
    }
  
    return children
}