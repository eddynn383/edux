export interface IPropsMenuNoLink {
    id?: string,
    title?: string,
    style?: React.CSSProperties,
    iconBefore?: React.ReactElement,
    text?: string
    iconAfter?: React.ReactElement
    theme?: "light" | "dark" | string,
    onClick: (e: any) => void,
    children?: React.ReactNode
}