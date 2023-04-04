export interface IPropsMenuNoLink {
    cn?: string,
    id?: string,
    title: string,
    iconBefore?: React.ReactElement,
    text?: string
    iconAfter?: React.ReactElement
    theme?: "light" | "dark",
    onClick: (e: any) => void,
    children?: any
}