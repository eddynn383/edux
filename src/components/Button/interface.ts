export interface IPropsButton {
    cn?: string,
    id?: string,
    type: "button" | "submit" | "reset",
    title?: string,
    disabled?: boolean,
    style?: React.CSSProperties,
    value?: string,
    size: "small" | "medium" | "large",
    theme?: "light" | "dark" | string,
    variant?: "solid" | "outline" | "neutral" | "text",
    status?: "accent" | "success" | "fail" | "warning" | "info" | "neutral",
    surface?: "1" | "2",
    content?: "text" | "icon",
    onClick?: any,
    children?: React.ReactElement | string
}