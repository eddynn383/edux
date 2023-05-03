import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IPropsMenuItem {
    id?: string,
    style?: React.CSSProperties,
    item: IMenuItem;
    depthLevel: number,
    theme?: "light" | "dark" | string,
}

export interface IMenuItem {
    allowedUsers: string[],
    icon: IconProp,
    isPublish: boolean,
    title: string,
    url: string,
    parentId: string,
    children: string[]
}

