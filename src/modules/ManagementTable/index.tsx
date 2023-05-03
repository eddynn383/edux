import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { ConfigProvider, Table, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Button from "@/components/Button";
import Chip from "@/components/Chip";
import Link from "next/link";
import Loading from "@/components/Loading"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { configTheme } from "@/theme/externalConfig";
import { dateFormat } from "@/lib/dateFormat";
import { DataType, IPropsTableManagement } from "./interface";
import sx from "../../styles/component.module.scss"
import Checkbox from "@/components/Checkbox";
import ItemList from "../ItemList";

function isTheme(value: string | undefined): value is "light" | "dark" {
    return value === "light" || value === "dark";
}

const ManagementTable = ({ theme="light", header, body, onAdd, onEdit, onDelete, onSelectedRowKeysChange }: IPropsTableManagement) => {
    // const [ selectedRows, setSelectedRows ] = useState<React.Key[]>();
    // const [ navigationItems, setNavigationItems ] = useState([]);
    const [ selectedItemId, setSelectedItemId ] = useState<string>("") 
    // const [ selectedParentId, setSelectedParentId ] = useState<string>("") 
    const [selectedItems, setSelectedItems] = useState<any>([]);

    const rowClassName = (record: DataType) => {
        if (!record.isPublish) {
          return sx['row-disabled'];
        }
        return '';
    };
    
    const columns: ColumnsType<DataType> = [
        ...header,
        {
            title: '',
            dataIndex: '',
            key: 'x',
            render: (data) => (
                <div style={{"display": "flex", "gap": "8px"}}>                
                    <Button type="button" title="Delete this navigation entry" size="small" variant="neutral" status="fail" surface="2" content="icon" theme={theme} onClick={() => onDelete(data.id)}>
                        <FontAwesomeIcon icon="trash" />
                    </Button>
                    <Button type="button" title="Edit this navigation entry" size="small" variant="neutral" status="info" surface="2" content="icon" theme={theme} onClick={() => onEdit(data.id)}>
                        <FontAwesomeIcon icon="edit" />
                    </Button>
                    <Button type="button" title="Add children for this navigation entry" size="small" variant="neutral" status="accent" surface="2" content="icon" theme={theme} onClick={() => onAdd(data.id)}>
                        <FontAwesomeIcon icon="person-circle-plus" />
                    </Button>
                </div>
            )
        }
    ];
    
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            console.log(selectedRows);
            // setSelectedRows(selectedRowKeys)

            if (onSelectedRowKeysChange) {
                onSelectedRowKeysChange(selectedRowKeys);
            }
        },
    };

    const editHandler = async (id: string) => {
        setSelectedItemId(id)
        try {
            const res = await fetch(`/api/navigation?id=${id}`, { method: 'GET'})
            const currentNavItem = await res.json()

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

        } catch (error) {
            console.error('Error deleting navigation item:', error);
        }
    }

    const deleteHandler = async (id: string | string[] | React.Key[] | undefined) => {
        console.log(id)
        const response = await fetch(`/api/navigation?ids=${id}`, { method: 'DELETE'}).then((data) => {
            // getNavigationData()
            console.log(`Navigation item deleted successfully ${id}`);
            console.log(data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const publishHandler = async (id: string | string[] | React.Key[] | undefined, value: boolean) => {
        console.log(selectedItemId)
        console.log(id)
        console.log(value)
        const response = await fetch(`/api/navigation?id=${id}`, { 
            method: 'PUT',
            cache: "no-cache",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isPublish: value })
        }).then((data) => {
            // getNavigationData()
            console.log(`Navigation item updated successfully ${id}`);
            console.log(data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleEditClick = (id: string) => {
        // setAction("edit")
        editHandler(id)
        // setDrawerState("open")
    }

    const handleDeleteClick = (id: any) => {
        // setModalState("open")
        setSelectedItemId(id)
    }

    const handleConfirmClick = () => {
        deleteHandler(selectedItemId)
        // setModalState("close")
    }

    const handlePublishClick = (id: string, value: boolean) => {
        publishHandler(id, value)
    }

    const renderChildItems = (parentId: any) => {
        const childItems = body.filter((item: any) => item.parentId === parentId);
        console.log(childItems)

        if (childItems.length === 0) return null;

        return (           
                <Table
                    columns={columns}
                    dataSource={childItems}
                    showHeader={false}
                    rowSelection={rowSelection}
                    // rowKey="id"
                    key={`child-table-${parentId}`}
                    expandable={{
                        expandedRowRender: (record) => renderChildItems(record.id)
                    }}
                    pagination={false}
                    rowClassName={sx["table-row-children"]}
                    className={sx["table-row-children"]}
                />
        );
    };

    
    const handleItemChange = (id: any) => {
        setSelectedItems((prevSelectedItems:any) => {
            if (prevSelectedItems.includes(id)) {
                return prevSelectedItems.filter((itemId: any) => itemId !== id);
            } else {
                return [...prevSelectedItems, id];
            }
        });
    };
    
    const parentItems = body.filter((item) => !item.parentId);

    return (
        <>
            <ConfigProvider theme={configTheme(theme)}>
                {
                    body ? (
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={parentItems}
                            rowClassName={rowClassName}
                            rowKey="id"
                            expandable={{
                                expandedRowRender: (record) => renderChildItems(record.id),
                                rowExpandable: (record): boolean => {
                                    const childItems = body.filter((item: any) => item.parentId === record.id);
                                    // console.log(record)
                                    // console.log(childItems)
                                    return childItems.length > 0;
                                },
                            }}
                        />
                    ) : (
                        <Loading />
                    )
                }
            </ConfigProvider>
            {/* <ItemList items={body as any} selectedItems={selectedItems} onItemChange={handleItemChange} /> */}
        </>
    )
}

export default ManagementTable
