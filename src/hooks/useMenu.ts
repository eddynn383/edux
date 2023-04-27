import { useContext } from "react";
import MenuContext from "@/context/menuContext";

const useMenu = () => {
    return useContext(MenuContext)
}

export default useMenu;