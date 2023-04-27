export interface IPropsButton {
    id?: string,
    type: "button" | "submit" | "reset",
    title?: string,
    disabled?: boolean,
    style?: React.CSSProperties,
    value?: string,
    theme?: "light" | "dark" | string,
    size: "xsmall" | "small" | "medium" | "large",
    variant?: "solid" | "outline" | "neutral" | "text",
    status?: "accent" | "success" | "fail" | "warning" | "info" | "neutral",
    surface?: "1" | "2",
    content?: "text" | "icon",
    onClick?: any,
    children?: React.ReactNode | string
}