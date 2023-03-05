import { useState, createContext } from "react";

const ThemeContext = createContext<any>(null);


export const ThemeProvider = ({ children }:any) => {
    const [theme, setTheme] = useState(null)
    const value = {
        theme
    }
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContext