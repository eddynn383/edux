export interface IPropsInput {
    cn?: string,
    id?: string, 
    name: string,
    type: React.HTMLInputTypeAttribute,
    innerRef?: string,
    theme?: "light" | "dark" | string,
    variant?: "solid" | "outline" | "opposite" | "text",
    status?: "default" | "success" | "fail" | "warning" | "info",
    size?: "small" | "medium" | "large",
    placeholder?: string,
    value?: string,
    iconBefore?: React.ReactElement,
    iconAfter?: React.ReactElement,
    autoComplete?: any,
    ariaInvalid?: any,
    ariaDescribedBy?: any,
    focus?: boolean,
    style?: React.CSSProperties,
    onClick?: any
    onChange?: any
    onFocus?: any
    onBlur?: any
}