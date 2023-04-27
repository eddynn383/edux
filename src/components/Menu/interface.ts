import { IMenuItem } from "../MenuItem/interface";

export interface IPropsMenu {
    id?: string,
    style?: React.CSSProperties,
    data: IMenuItem[] | null,
    theme?: "light" | "dark" | string
}