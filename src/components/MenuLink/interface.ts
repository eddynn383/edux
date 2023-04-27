export interface IPropsMenuLink {
    id?: string,
    to: string,
    title: string,
    iconBefore?: React.ReactElement,
    text?: string
    iconAfter?: React.ReactElement,
    style?: React.CSSProperties,
    theme?: "light" | "dark" | string,
    children?: React.ReactNode
}