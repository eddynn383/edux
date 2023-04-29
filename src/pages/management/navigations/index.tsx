import { useEffect, useState } from "react";
import Head from "next/head";
import { ConfigProvider, Table } from 'antd';
import { useSession } from "next-auth/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from 'next-themes'
import useMenu from "@/hooks/useMenu";
import MainLayout from "@/layouts/MainLayout"
import Toolbar from "@/modules/PageToolbar";
import Content from "@/modules/PageContent";
import Drawer from "@/components/Drawer";
import Form from "@/components/Form";
import Input from "@/components/Input";
import InputGroup from "@/components/InputGroup";
import Label from "@/components/Label";
import Alert from "@/components/Alert";
import Chip from "@/components/Chip";
import Loading from "@/components/Loading"
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import Link from "next/link";
import { Switch } from "antd";
import { Option } from "@/components/Select/interface";
import { DataType } from "../../../modules/ManagementTable/interface";
import { configTheme } from "@/theme/externalConfig";
import { dateFormat } from "@/lib/dateFormat";
import type { ColumnsType } from 'antd/es/table';
import sx from "../../../styles/component.module.scss"

function isTheme(value: string | undefined): value is "light" | "dark" {
    return value === "light" || value === "dark";
}

const Navigation = () => {
    const { data: session, status } = useSession()
    const [ selectedRows, setSelectedRows ] = useState<React.Key[]>();
    const [ drawerState, setDrawerState ] = useState<"open" | "close">("close");
    const [ modalState, setModalState ] = useState<"open" | "close">("close");
    const [ label, setLabel ] = useState<string>("");
    const [ link, setLink ] = useState<string>("");
    const [ icon, setIcon ] = useState<string>("");
    const [ parent, setParent ] = useState<Option[]>([])
    const [ action, setAction ] = useState<"add" | "edit">("add");
    const [ errorMsg, setErrorMsg ] = useState("");
    const [ showError, setShowError ] = useState(false);
    const [ navigationItems, setNavigationItems ] = useState([]);
    const [ selectedItemId, setSelectedItemId ] = useState<string>("") 
    const [ selectedParentId, setSelectedParentId ] = useState<string>("") 
    const { resolvedTheme } = useTheme()
    const theme = isTheme(resolvedTheme) ? resolvedTheme : "light";

    const rowClassName = (record: DataType) => {
        if (!record.isPublish) {
          return sx['row-disabled'];
        }
        return '';
    };
      
    const columns: ColumnsType<DataType> = [
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
            render: (_, data:any) => {
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
        {
            title: '',
            dataIndex: '',
            key: 'x',
            render: (data) => (
                <div style={{"display": "flex", "gap": "8px"}}>                
                    <Button type="button" title="Delete navigation entry" size="small" variant="neutral" status="fail" surface="2" content="icon" theme={theme} onClick={() => handleDeleteClick(data.id)}>
                        <FontAwesomeIcon icon="trash" />
                    </Button>
                    <Button type="button" title="Edit navigation entry" size="small" variant="neutral" status="info" surface="2" content="icon" theme={theme} onClick={() => handleEditClick(data.id)}>
                        <FontAwesomeIcon icon="edit" />
                    </Button>
                </div>
            )
        }
    ];
    
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            console.log(selectedRows);
            setSelectedRows(selectedRowKeys)
        },
    };

    const getNavigationItems = async () => {
        const response = await fetch('/api/navigation', { method: 'GET' });
        const data = await response.json();
        console.log(data)
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
            console.log(data)
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
                setNavigationItems(mergedData)
                setParent(parentOptions)
            });
        });
    }

    const saveHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const userID = session?.user?.id

        if (!label) {
            console.log("error label")
            setErrorMsg('Label is required!')
            setShowError(true)
            return
        }

        if (!link) {
            console.log("error link")
            setErrorMsg('Link is required!')
            setShowError(true)
            return
        }

        if (action === 'add') {
            const res = await fetch('/api/navigation', {
                method: 'POST',
                cache: "no-cache",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ label, link, icon, parentId: selectedParentId, createdById: userID, updatedById: userID, allowedUsers: [userID]})
            }).then(async () => {
                console.log("The navigation entry was successfully registred!");
                getNavigationData()
                setDrawerState('close')

                setLabel('')
                setLink('')
                setIcon('')
                setSelectedParentId('')
            }).catch((error) => {
                console.log(error)
            });
        } else {
            if (selectedItemId) {  
                console.log(selectedItemId)
                const res = await fetch(`/api/navigation?id=${selectedItemId}`, {
                    method: 'PUT',
                    cache: "no-cache",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ label, link, parentId: selectedParentId, icon, updatedById: userID})
                }).then(async () => {
                    console.log("The navigation entry was successfully edited!");
                    getNavigationData()
                    setDrawerState('close')

                    setLabel('')
                    setLink('')
                    setIcon('')
                    setSelectedParentId('')
                }).catch((error) => {
                    console.log(error)
                });
            }
        }
    }

    const addHandler = async () => {
        try {
            setLabel('')
            setLink('')
            setIcon('')
        } catch (error) {
            console.log(error)
        }
    }

    const editHandler = async (id: string) => {
        setSelectedItemId(id)
        try {
            const res = await fetch(`/api/navigation?id=${id}`, { method: 'GET'})
            const currentNavItem = await res.json()

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            setLabel(currentNavItem.label)
            setLink(currentNavItem.link)
            setIcon(currentNavItem.icon)
        } catch (error) {
            console.error('Error editing navigation item:', error);
        }
    }

    const deleteHandler = async (id: string | string[] | React.Key[] | undefined) => {
        console.log(id)
        const response = await fetch(`/api/navigation?ids=${id}`, { method: 'DELETE'}).then((data) => {
            getNavigationData()
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
            getNavigationData()
            console.log(`Navigation item updated successfully ${id}`);
            console.log(data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleAddClick = () => {
        setAction("add")
        addHandler()
        setDrawerState("open")
    }

    const handleEditClick = (id: string) => {
        setAction("edit")
        editHandler(id)
        setDrawerState("open")
    }

    const handleDeleteClick = (id: any) => {
        setModalState("open")
        setSelectedItemId(id)
    }

    const handleCancelClick = () => {
        setDrawerState("close")
        setLabel('')
        setLink('')
        setIcon('')
    }

    const handleConfirmClick = () => {
        deleteHandler(selectedItemId)
        setModalState("close")
    }

    const handlePublishClick = (id: string, value: boolean) => {
        publishHandler(id, value)
    }

    const handleSelectChange = (option: any) => {
        console.log(option.value)
        console.log(selectedParentId)
        setSelectedParentId(option.value)
    }

    const alert = (
        <Alert status="fail" variant="standard" action={<Button type="button" size="xsmall" variant="text" status="fail" content="icon" onClick={() => setShowError(false)} theme={theme}><FontAwesomeIcon icon="close" /></Button>}>
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>{errorMsg}</Alert.Description>
        </Alert>
    )

    const FormDrawer = (
        <Drawer state={drawerState} onClickOutside={() => setDrawerState("close")} theme={theme} width="500px" > 
            {<Form onSubmit={saveHandler} style={{"height": "100%", "gap": "0"}}>  
                <Drawer.Header>
                    {action === 'add' ? (
                        <div className={sx["drawer-header-inner"]}>
                            <h2 className={sx["drawer-header-heading"]}>Create navigation entry</h2>
                            <span className={sx["drawer-header-subheading"]}>Fullfill the form below</span>
                        </div>
                    ) : (
                        <div className={sx["drawer-header-inner"]}>
                            <h2 className={sx["drawer-header-heading"]}>Edit navigation entry</h2>
                            <span className={sx["drawer-header-subheading"]}>Change the form values below</span>
                        </div>
                    )}
                    <Button type="button" size="xsmall" theme={theme} variant="neutral" status="neutral" surface="1" content="icon" onClick={() => setDrawerState("close")} >
                        <FontAwesomeIcon icon="close" />
                    </Button>
                </Drawer.Header>
                <Drawer.Body>  
                    {
                        showError && alert
                    }
                    <InputGroup>
                        <Label htmlFor="label">Label</Label>
                        <Input id="label" name="label" placeholder="Label" type="text" value={label} onChange={(e:any) => {setLabel(e.target.value)}} />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="link">Link</Label>
                        <Input id="link" name="link" placeholder="Link" type="text" value={link} onChange={(e:any) => {setLink(e.target.value)}} />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="icon">Icon</Label>
                        <Input id="icon" name="icon" placeholder="Icon" type="text" value={icon} onChange={(e:any) => {setIcon(e.target.value)}} />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="parent">Parent</Label>
                        <Select id="001" placeholder={"Choose an option..."} options={parent} theme={theme} onChange={handleSelectChange} />
                    </InputGroup>
                    {/* <Input name="parent" placeholder="Parent" type="text" onChange={(e:any) => {setParent(e.target.value)}} /> */}
                </Drawer.Body>
                <Drawer.Footer>
                    <Button type="submit" size="small" theme={theme} variant="solid" status="accent" content="text" >Save</Button>
                    <Button type="button" size="small" theme={theme} variant="neutral" status="neutral" surface="2" content="text" onClick={handleCancelClick}>Cancel</Button>
                </Drawer.Footer>
            </Form>}
        </Drawer>
    )

    const WarningModal = (
        <Modal title="Are you sure?" state={modalState} theme={theme} onClickOutside={() => setModalState("close")} onClose={() => setModalState("close")} onCancel={() => setModalState("close")} onConfirm={handleConfirmClick}>
            <p>Are you sure you want to delete this navigation item?</p> 
            <p>This action cannot be undone.</p>
        </Modal>
    )

    useEffect(() => {
        getNavigationData()
        console.log(parent)
    }, []);

    return (
        
        <MainLayout>
            <Head>
                <title>Navigation Manager</title>
            </Head>
            <Toolbar
            left={
                <div style={{"display": "flex", "gap": "10px"}}>
                    {/* <Select id="001" placeholder="Select..." width="250px" options={fakeOptions} theme={theme} surface="2" onChange={(value: any) => console.log(value)} />
                    <Select id="002" placeholder="Select..." width="250px" options={fakeOptions} theme={theme} surface="2" onChange={(value: any) => console.log(value)} />
                    <Select id="003" placeholder="Select something..." width="250px" options={fakeOptions} isMulti={true} surface="2" theme={theme} onChange={(value: any) => console.log(value)} />
                    <Select id="004" placeholder="Select something..." width="250px" options={fakeOptions} isMulti={true} surface="2" isSearchable={true} theme={theme} onChange={(value: any) => console.log(value)} /> */}
                </div>
            }
            right={
                <>      
                    <Button type="button" size="medium" variant="neutral" status="fail" surface="1" content="icon" theme={theme} onClick={() => handleDeleteClick(selectedRows)} disabled={!selectedRows?.length ? true : false}>
                        <FontAwesomeIcon icon="trash" />
                    </Button>          
                    <Button type="button" size="medium" variant="solid" status="accent" content="icon" theme={theme} onClick={handleAddClick}>
                        <FontAwesomeIcon icon="plus" />
                    </Button>

                </>
            } />
            <Content>
                <ConfigProvider theme={configTheme(theme)}>
                    {
                        navigationItems ? (
                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={navigationItems}
                                rowClassName={rowClassName}
                                rowKey="id"
                                // scroll={{ x: true, y: 400 }}
                            />
                        ) : (
                            <Loading />
                        )
                    }
                </ConfigProvider>

            </Content>
            {drawerState === "open" && FormDrawer}
            {modalState  === "open" && WarningModal}
        </MainLayout>
    )
}

Navigation.auth = {
    roles: ["ADMIN"],
    loading: <Loading />,
    unauthorized: "/unauthorized", // redirect to this url
}

export default Navigation
