import { useState, createContext, useEffect } from "react";

const MenuContext = createContext<any>(null);

export const MenuProvider = ({ children }:any) => {
    const [menuItems, setMenuItems] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/menu-items')
            const data = await response.json()
            setMenuItems(data);
            setLoading(false)
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log(menuItems)
        fetchData();
    }, []);

    const value = {
        menuItems, 
        setMenuItems,
        loading, 
        error
    }
    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export default MenuContext