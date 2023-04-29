import { useEffect, useState } from "react";

import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import Form from "@/components/Form";
import Input from "@/components/Input";
import InputGroup from "@/components/InputGroup";
import Label from "@/components/Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import sx from "../../styles/component.module.scss"

const ManagementDrawer = ({theme="light", session, state, action="add", data, selectedItemId, getNavigationData, onStateUpdate}:any) => {
    
    const [ label, setLabel ] = useState<string>("");
    const [ link, setLink ] = useState<string>("");
    const [ icon, setIcon ] = useState<string>("");
    const [ errorMsg, setErrorMsg ] = useState<string>("");
    const [ showError, setShowError ] = useState<boolean>(false);

    useEffect(() => {
        console.log(action)
        if (action === "add") {
            setLabel("")
            setLink("")
            setIcon("")
        } else if (action === 'edit') {
            setLabel(data.label)
            setLink(data.link)
            setIcon(data.icon)
        }
    }, [action, data])

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
                body: JSON.stringify({ label, link, icon, createdById: userID, updatedById: userID, allowedUsers: [userID]})
            }).then(async () => {
                console.log("The navigation entry was successfully registred!");
                getNavigationData()
                onStateUpdate('close')

                setLabel("")
                setLink("")
                setIcon("")
            }).catch((error) => {
                console.log(error)
            });
        } else if (action === 'edit') {
            if (selectedItemId) {  
                console.log(selectedItemId)
                const res = await fetch(`/api/navigation?id=${selectedItemId}`, {
                    method: 'PUT',
                    cache: "no-cache",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ label, link, icon, updatedById: userID})
                }).then(async () => {
                    console.log("The navigation entry was successfully edited!");
                    getNavigationData()
                    onStateUpdate('close')

                    setLabel("")
                    setLink("")
                    setIcon("")
                    // setSelectedParentId('')
                }).catch((error) => {
                    console.log(error)
                });
            }
        }
    }

    const handleCancelClick = () => {
        onStateUpdate("close")
    }

    const alert = (
        <Alert status="fail" variant="standard" action={<Button type="button" size="xsmall" variant="text" status="fail" content="icon" onClick={() => setShowError(false)} theme={theme}><FontAwesomeIcon icon="close" /></Button>}>
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>{errorMsg}</Alert.Description>
        </Alert>
    )

    return (
        <Drawer state={state} onClickOutside={() => onStateUpdate("close")} theme={theme} width="500px" > 
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
                    <Button type="button" size="xsmall" theme={theme} variant="neutral" status="neutral" surface="1" content="icon" onClick={() => onStateUpdate("close")} >
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
                </Drawer.Body>
                <Drawer.Footer>
                    <Button type="submit" size="small" theme={theme} variant="solid" status="accent" content="text" >Save</Button>
                    <Button type="button" size="small" theme={theme} variant="neutral" status="neutral" surface="2" content="text" onClick={handleCancelClick}>Cancel</Button>
                </Drawer.Footer>
            </Form>}
        </Drawer>
    )
}

export default ManagementDrawer
