export interface IPropsAlert {
    id?: string,
    style?: React.CSSProperties,
    theme?: "light" | "dark",
    variant?: "solid" | "outline" | "standard",
    status: "success" | "fail" | "warning" | "info",
    action?: any,
    children?: any
}