import { ColumnsType } from "antd/es/table";

export interface DataType {
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

export interface IPropsTableManagement {
    theme: "light" | "dark";
    header: ColumnsType<DataType>;
    body: DataType[];
    onAdd: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onSelectedRowKeysChange: (selectedRowKeys: React.Key[]) => void;
}