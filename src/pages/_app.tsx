import { createContext, useState } from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import useTheme from '@/hooks/useTheme'
import useLocalStorage from 'use-local-storage'
import '@/styles/globals.scss'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
import { ThemeProvider } from 'next-themes'

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
    // const [theme, setTheme] = useLocalStorage<string>('theme' ? 'dark' : 'light') 
    // const [theme, setTheme] = useState<string>('light')
    // const toggleTheme:any = () => {
    //     setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
    // }

    // const { theme } = useTheme()
    
    return (   
        <ThemeProvider>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ThemeProvider>     
    )
}
