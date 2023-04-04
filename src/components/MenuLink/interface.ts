export interface IPropsMenuLink {
    cn?: string,
    id?: string,
    to: string,
    title: string,
    iconBefore?: React.ReactElement,
    text?: string
    iconAfter?: React.ReactElement
    theme?: "light" | "dark",
    children?: any
}