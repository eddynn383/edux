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