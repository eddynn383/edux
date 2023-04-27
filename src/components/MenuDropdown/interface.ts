import { IMenuItem } from "../MenuItem/interface";

export interface IPropsMenuDropdown {
    items?: any, 
    parent: string, 
    show:any, 
    setShow: any, 
    theme?: "light" | "dark" | string,
    depthLevel: number
}