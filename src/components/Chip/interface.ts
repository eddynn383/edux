export interface IPropsChip {
    id?: string,
    title?: string,
    style?: React.CSSProperties,
    theme?: "light" | "dark" | string,
    size: "small" | "medium" | "large",
    status?: "default" | "success" | "fail" | "warning" | "info" | "neutral",
    onClose?: (e:any) => void
    children?: React.ReactElement | string
}