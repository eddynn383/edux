export interface IPropsBadge {
    id?: string,
    value: number,
    title?: string,
    max?: number,
    theme: "light" | "dark",
    size: "small" | "medium" | "large",
    status?: "accent" | "success" | "fail" | "warning" | "info" | "neutral",
    children?: React.ReactElement | string
}