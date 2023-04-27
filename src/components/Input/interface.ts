export interface IPropsInput {
    id?: string, 
    name: string,
    type: React.HTMLInputTypeAttribute,
    innerRef?: any,
    placeholder?: string,
    value?: string,
    autoComplete?: any,
    ariaInvalid?: any,
    ariaDescribedBy?: any,
    style?: React.CSSProperties,
    theme?: "light" | "dark" | string,
    variant?: "solid" | "outline" | "opposite" | "text",
    size?: "small" | "medium" | "large",
    status?: "default" | "success" | "fail" | "warning" | "info",
    iconBefore?: React.ReactElement,
    iconAfter?: React.ReactElement,
    focus?: boolean,
    onClick?: any
    onChange?: any
    onFocus?: any
    onBlur?: any
}