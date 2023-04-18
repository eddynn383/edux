import { ReactNode, useEffect, useState } from "react";
import Loading from "@/components/Loading"
import Button from "@/components/Button";
import { ConfigProvider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import MainLayout from "@/layouts/MainLayout"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from 'next-themes'
import Drawer from "@/components/Drawer";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Toolbar from "@/modules/PageToolbar";
import Content from "@/modules/PageContent";
import InputGroup from "@/components/InputGroup";
import Label from "@/components/Label";
import Alert from "@/components/Alert";
import sx from "../../../styles/component.module.scss"
import Chip from "@/components/Chip";

interface DataType {
    id: React.Key;
    label: string;
    link: string;
    icon: string;
    createdByEmail: string;
    createdAt: Date;
    // updatedBy: Date;
}

const Navigation = () => {
    const { data: session, status } = useSession()
    // const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());
    // const { data: navigationData, mutate } = useSWR('/api/navigation', fetcher);
    const [ selectedRows, setSelectedRows ] = useState<React.Key[]>();
    const [ drawerState, setDrawerState ] = useState("close");
    const [ label, setLabel ] = useState<string>();
    const [ link, setLink ] = useState<string>();
    const [ icon, setIcon ] = useState<string>();
    // const [ parent, setParent ] = useState();
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ showError, setShowError ] = useState(false);
    const [ dataSource, setDataSource ] = useState([]);
    const { resolvedTheme:theme } = useTheme()
      
    const columns: ColumnsType<DataType> = [
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
            className: 'label'
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
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
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            render: (data) => (
                <div style={{"display": "flex", "gap": "8px"}}>                
                    <Button type="button" size="small" variant="neutral" status="fail" surface="2" content="icon" theme={theme} onClick={() => deleteHandler(data.id)}>
                        <FontAwesomeIcon icon="trash" />
                    </Button>
                    <Button type="button" size="small" variant="neutral" status="warning" surface="2" content="icon" theme={theme} onClick={() => cloneHandler(data.id)}>
                        <FontAwesomeIcon icon="clone" />
                    </Button>
                    <Button type="button" size="small" variant="neutral" status="info" surface="2" content="icon" theme={theme} onClick={() => editHandler(data.id)}>
                        <FontAwesomeIcon icon="edit" />
                    </Button>
                </div>
            ),
        }
    ];
    
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            console.log(selectedRows);
            setSelectedRows(selectedRowKeys)
        }
    };

    const fetchNavigationItems = async () => {
        const response = await fetch('/api/navigation', { method: 'GET' });
        const data = await response.json();
        return data;
    };

    const fetchUserById = async (id:any) => {
        const response = await fetch(`/api/users?id=${id}`, { method: 'GET' });
        const user = await response.json();
        return user;
    };

    const deleteHandler = async (id: string | string[] | React.Key[] | undefined) => {
        console.log(id)
        try {
            const response = await fetch(`/api/navigation?ids=${id}`, { method: 'DELETE'})
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            console.log(response);
            console.log('Navigation item deleted successfully');
            // mutate()
        } catch (error) {
            console.error('Error deleting navigation item:', error);
        }
    }

    const cloneHandler = async (id: string) => {

    }

    const editHandler = async (id: string) => {
        console.log(id)
        try {
            const res = await fetch(`/api/navigation?id=${id}`, { method: 'GET'})
            const currentNavItem = await res.json()
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            setLabel(currentNavItem.label)
            setLink(currentNavItem.link)
            setIcon(currentNavItem.icon)

            setDrawerState("open")
        } catch (error) {
            console.error('Error deleting navigation item:', error);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const userID = session?.user?.id

        if (!label) {
            setErrorMsg('Label is required!')
            setShowError(true)
            return
        }

        if (!link) {
            setErrorMsg('Link is required!')
            setShowError(true)
            return
        }

        const res = await fetch('/api/navigation', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ label, link, icon, createdById: userID, allowedUsers: [userID]})
        }).then(async () => {
            console.log("A navigation entry was successfully registred");
        }).catch((error) => {
            console.log(error);
        });

    }

    useEffect(() => {
        fetchNavigationItems().then((data) => {
            // console.log(data)
            Promise.all(
                data.map((item:any) => 
                    fetchUserById(item.createdById).then((user) => ({
                        ...item,
                        createdByEmail: user.email,
                    }))
                )
            ).then((mergedData:any) => {
                // console.log(mergedData)
                setDataSource(mergedData)
            });
        });
    }, []);

    return (
        
        <MainLayout>
            
            <Toolbar right={
                <>      
                    <Button type="button" size="medium" variant="neutral" status="fail" surface="1" content="icon" theme={theme} onClick={() => deleteHandler(selectedRows)} disabled={!selectedRows ? true : false}>
                        <FontAwesomeIcon icon="trash" />
                    </Button>          
                    <Button type="button" size="medium" variant="solid" status="accent" content="icon" theme={theme} onClick={() => setDrawerState("open")}>
                        <FontAwesomeIcon icon="plus" />
                    </Button>

                </>
            } />
            <Content>
                <ConfigProvider theme={{
                        token: {
                            colorBgBase: theme === "light" ? "#ffffff" : "#242424",
                            colorText: theme === "light" ? "#181818" : "#ffffff",
                            colorBorder: theme === "light" ? "#F0F2F4" : "#343738",
                            colorBorderSecondary: theme === "light" ? "#F0F2F4" : "#343738",
                            colorPrimaryBg: theme === "light" ? "rgba(0, 0, 0, 0.025)" : "rgba(255, 255, 255, 0.025)",
                            colorPrimaryBgHover: theme === "light" ? "rgba(0, 0, 0, 0.033)" : "rgba(255, 255, 255, 0.033)",
                            // colorFillAlter: theme === "light" ? "#F0F2F4" : "#2E2F30",
                        },
                    }}
                >
                    {
                        dataSource ? (
                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={dataSource}
                                rowKey="id"
                            />
                        ) : (
                            <Loading />
                        )
                    }
                </ConfigProvider>
            </Content>
            <Drawer state={drawerState} theme={theme} size="small" > 
                <Drawer.Header>
                    <div className={sx["drawer-header-inner"]}>
                        <h2 className={sx["drawer-header-heading"]}>Create navigation entry</h2>
                        <span className={sx["drawer-header-subheading"]}>Fullfill the form below</span>
                    </div>
                    <Button type="button" size="small" theme={theme} variant="neutral" status="neutral" surface="1" content="icon" onClick={() => setDrawerState("close")} >
                        <FontAwesomeIcon icon="close" />
                    </Button>
                </Drawer.Header> 
                <Form event={handleSubmit} style={{"height": "100%", "gap": "0"}}>  
                    <Drawer.Body>  
                        {
                            showError && 
                            <Alert status="fail" variant="standard" action={<Button type="button" size="small" variant="text" status="fail" content="icon" onClick={() => setShowError(false)} theme={theme}><FontAwesomeIcon icon="close" /></Button>}>
                                <Alert.Title>Error</Alert.Title>
                                <Alert.Description>{errorMsg}</Alert.Description>
                            </Alert>
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
                        {/* <Input name="parent" placeholder="Parent" type="text" onChange={(e:any) => {setParent(e.target.value)}} /> */}
                    </Drawer.Body>
                    <Drawer.Footer>
                        <Button type="submit" size="small" theme={theme} variant="solid" status="accent" content="text" >Save</Button>
                        <Button type="button" size="small" theme={theme} variant="neutral" status="neutral" surface="2" content="text" >Cancel</Button>
                    </Drawer.Footer>
                </Form>                   
            </Drawer>
        </MainLayout>
    )
}

Navigation.auth = {
    roles: ["ADMIN"],
    loading: <Loading />,
    unauthorized: "/unauthorized", // redirect to this url
}

export default Navigation
