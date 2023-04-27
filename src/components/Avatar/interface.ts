export interface IPropsAvatar {
    src: string,
    alt: string,
    id?: string,
    style?: React.CSSProperties,
    theme: "light" | "dark",
    size: "small" | "medium" | "large",
    type: "square" | "circle"
    onClick?: any
}