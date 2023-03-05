import { ReactElement } from "react";

export interface IPropsText {
    cn?: string,
    id?: string,
    theme?: "light" | "dark",
    size?: "small" | "medium" | "large"
    status?: "default" | "success" | "fail" | "warning" | "info"
    children: React.ReactElement | string
}