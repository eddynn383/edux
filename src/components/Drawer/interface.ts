export interface IPropsDrawer {
    id?: string,
    style?: React.CSSProperties,
    theme?: "light" | "dark" | string,
    width: string,
    state: "open" | "close"
    onClickOutside?: () => void,
    children: React.ReactElement | string,
}