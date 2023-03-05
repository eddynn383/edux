export interface IPropsAlert {
    cn?: string,
    id?: string,
    theme?: "light" | "dark",
    variant?: "solid" | "outline" | "standard",
    status: "success" | "fail" | "warning" | "info",
    action?: any,
    children?: any
}