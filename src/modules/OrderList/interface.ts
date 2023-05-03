import { ColumnsType } from "antd/es/table";

export interface DataType {
    parentId: (key: any) => import("react").ReactNode;
    key(key: any): import("react").ReactNode;
    id: React.Key;
    label: string;
    link: string;
    icon: string;
    createdByEmail: string;
    updatedByEmail: string;
    createdAt: Date;
    isPublish: boolean;
    updatedBy: Date;
}

export interface IPropsOrderList {
    theme: "light" | "dark";
    header: ColumnsType<DataType>;
    body: DataType[];
    loading: boolean;
    onAdd: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onSelectedRowKeysChange: (selectedRowKeys: React.Key[]) => void;
}