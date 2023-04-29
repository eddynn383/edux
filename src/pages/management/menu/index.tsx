import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useSession } from "next-auth/react"
import { dateFormat } from '@/lib/dateFormat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from 'next/head';
import MainLayout from "@/layouts/MainLayout"
import Toolbar from "@/modules/PageToolbar";
import Content from '@/modules/PageContent';
import ManagementTable from "@/modules/ManagementTable"
import Button from "@/components/Button";
import Chip from "@/components/Chip";
import Loading from '@/components/Loading';
import Link from "next/link";
import { Switch } from "antd";
import ManagementDrawer from '@/modules/ManagementDrawer';

function isTheme(value: string | undefined): value is "light" | "dark" {
    return value === "light" || value === "dark";
}

const Menus = () => {
    const { resolvedTheme } = useTheme()
    const theme = isTheme(resolvedTheme) ? resolvedTheme : "light";
    const { data: session, status } = useSession()
    const [ tableBody, setTableBody ] = useState([])
    const [ drawerData, setDrawerData ] = useState({})
    const [ drawerState, setDrawerState ] = useState<"open" | "close">("close");
    const [ action, setAction ] = useState<"add" | "edit">("add");
    const [ selectedItemId, setSelectedItemId ] = useState<string>("") 
    const [ selectedRows, setSelectedRows ] = useState<string | React.Key[]>();

    const tableHeader = [
        {
            title: 'Name',
            dataIndex: 'label',
            key: 'label',
            className: 'label'
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: (value:any) => {
                return (
                    <Link href={value} target="_blank" >{value}</Link>
                )
            }
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            render: (value:any) => {
                return (
                    <span>
                        <FontAwesomeIcon icon={value} /> 
                        <span>  {value}</span>
                    </span>
                )
            }
        },
        {
            title: 'Publish',
            dataIndex: 'publish',
            key: 'publish',
            render: (value:any, data:any) => {
                return (
                    <Switch defaultChecked={data.isPublish} onChange={() => handlePublishClick(data.id, !data.isPublish)} />
                )
            }
        },
        {
            title: 'Created By',
            dataIndex: 'createdByEmail',
            key: 'createdByEmail',
            render: (value:any) => {
                return <Chip theme={theme} size="medium" status="default" >{value}</Chip>
            }
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value:any) => {
                const date = new Date(value);
                const formattedDate = date.toLocaleString('ro-RO', dateFormat).replace(',', '');
                return formattedDate
            }
        },
        {
            title: 'Updated By',
            dataIndex: 'updatedByEmail',
            key: 'updatedByEmail',
            render: (value:any) => {
                return <Chip theme={theme} size="medium" status="default" >{value}</Chip>
            }
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (value:any) => {
                const date = new Date(value);
                const formattedDate = date.toLocaleString('ro-RO', dateFormat).replace(',', '');
                return formattedDate
            }
        },
    ]

    const getNavigationItems = async () => {
        const response = await fetch('/api/navigation', { method: 'GET' });
        const data = await response.json();
        return data;
    };
    
    const getUserById = async (id:any) => {
        if (id) {            
            const response = await fetch(`/api/users?id=${id}`, { method: 'GET' });
            const user = await response.json();
            return user;
        }
    };

    const getNavigationData = () => {
        getNavigationItems().then((data) => {
            Promise.all(
                data.map((item:any) => 
                    Promise.all([
                        getUserById(item.createdById),
                        getUserById(item.updatedById)
                    ]).then(([createdByUser, updatedByUser]) => ({
                        ...item,
                        createdByEmail: createdByUser?.email,
                        updatedByEmail: updatedByUser?.email
                    }))
                )
            ).then((mergedData:any) => {
                const filteredData = mergedData.filter((item: any) => item.isPublish);
                console.log(filteredData)
                const parentOptions = filteredData.map((item: any) => ({
                    label: item.label,
                    value: item.id,
                }));
                console.log(mergedData)
                setTableBody(mergedData)
                // setParent(parentOptions)
            });
        });
    }

    const publishHandler = async (id: string | string[] | React.Key[] | undefined, value: boolean) => {

        const response = await fetch(`/api/navigation?id=${id}`, { 
            method: 'PUT',
            cache: "no-cache",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isPublish: value })
        }).then((data) => {
            console.log(data)
        }).catch((error) => {
            console.log(error);
        })
    }

    const handlePublishClick = (id: string, value: boolean) => {
        publishHandler(id, value)
    }

    const handleCreateNewItem = () => {
        setAction("add")
        setDrawerState("open")
        setDrawerData({})
    }

    const handleAddItemChild = async (id: string) => {

    }

    const handleEditItem = async (id: string) => {
        console.log(id)
        setSelectedRows(id)
        const item = tableBody.find((item: any) => item.id === id)

        if (item) {
            console.log("*** START TABLE ITEM ***")
            console.log(item)
            console.log("*** END TABLE ITEM ***")
            setDrawerData(item)
        } else {
            console.log("Item not found!")
        }
        setAction("edit")
        setDrawerState("open")
    }

    const handleDeleteItem = async (id: string | string[] | React.Key[] | undefined) => {
        console.log(id)
        const response = await fetch(`/api/navigation?ids=${id}`, { 
            method: 'DELETE'
        }).then((data) => {
            getNavigationData()
            console.log(`Navigation item deleted successfully ${id}`);
            console.log(data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const stateUpdate = (newState: any) => {
        setDrawerState(newState)
    }

    const toolbarLeft = (
        <div style={{"display": "flex", "gap": "10px"}}>
            {/* <Select id="001" placeholder="Select..." width="250px" options={fakeOptions} theme={theme} surface="2" onChange={(value: any) => console.log(value)} />
            <Select id="002" placeholder="Select..." width="250px" options={fakeOptions} theme={theme} surface="2" onChange={(value: any) => console.log(value)} />
            <Select id="003" placeholder="Select something..." width="250px" options={fakeOptions} isMulti={true} surface="2" theme={theme} onChange={(value: any) => console.log(value)} />
            <Select id="004" placeholder="Select something..." width="250px" options={fakeOptions} isMulti={true} surface="2" isSearchable={true} theme={theme} onChange={(value: any) => console.log(value)} /> */}
        </div>
    )

    const toolbarRight = (
        <>      
            <Button type="button" size="medium" variant="neutral" status="fail" surface="1" content="icon" theme={theme} onClick={() => handleDeleteItem(selectedRows)} disabled={!selectedRows?.length ? true : false}>
                <FontAwesomeIcon icon="trash" />
            </Button>          
            <Button type="button" size="medium" variant="solid" status="accent" content="icon" theme={theme} onClick={() => handleCreateNewItem()}>
                <FontAwesomeIcon icon="plus" />
            </Button>
        </>
    )

    useEffect(() => {
        getNavigationData()
        // console.log("*** START TABLE BODY ***")
        // console.log(tableBody)
        // console.log("*** END TABLE BODY ***")
        // console.log(action)
    }, [])

    return (
        <MainLayout>
            <Head>
                <title>Menu Manager</title>
            </Head>
            <Toolbar left={toolbarLeft} right={toolbarRight} />
            <Content>
                <ManagementTable theme={theme} header={tableHeader} body={tableBody} onAdd={handleAddItemChild} onEdit={handleEditItem} onDelete={handleDeleteItem} onSelectedRowKeysChange={(selectedRowKeys) => setSelectedRows(selectedRowKeys)} />
            </Content>
            <ManagementDrawer theme={theme} state={drawerState} session={session} action={action} data={drawerData} selectedItemId={selectedRows} onStateUpdate={stateUpdate} getNavigationData={getNavigationData} />
        </MainLayout>
    )
}

Menus.auth = {
    roles: ["ADMIN"],
    loading: <Loading />,
    unauthorized: "/unauthorized", // redirect to this url
}

export default Menus  
