export interface Option {
    value: string;
    label: string;
}

export interface IPropsSelect {
    id: string;
    placeholder: string;
    style?: React.CSSProperties;
    width?: string;
    options: Option[];
    isMulti?: boolean;
    isSearchable?: boolean;
    theme?: "light" | "dark";
    state?: "open" | "close";
    surface?: "1" | "2";
    onChange: (value: any) => void;
    onClick?: () => void;
}