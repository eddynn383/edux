import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'antd';
import { useTheme } from 'next-themes';
import useSWR from "swr"
import Column from 'antd/es/table/Column';
import Button from '../Button';
import sx from '../../styles/component.module.scss'

const ExTable = (props: any) => {
    const { resolvedTheme:theme } = useTheme()
    const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());
    const { data: navigationData, mutate } = useSWR('/api/navigation', fetcher);

    const deleteHandler = async (id:any) => {
        console.log(id)
        try {
            const response = await fetch(`/api/navigation?ids=${id}`, { method: 'DELETE'})
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response);
            console.log('Navigation item deleted successfully');
            // setMenuData(navigationData)
            mutate()
        } catch (error) {
            console.error('Error deleting navigation item:', error);
        }
    }

    const cloneHandler = async (id:any) => {

    }

    const editHandler = async (id:any) => {

    }

    return (
        <Table className={sx["extable"]} {...props} >
            <Column title="Label" dataIndex="label" key="label" className={sx["extable-cell"]} />
            <Column title="Link" dataIndex="link" key="link" className={sx["extable-cell"]} />
            <Column title="Icon" dataIndex="icon" key="icon" className={sx["extable-cell"]} />
            <Column title="Created By" dataIndex="createdById" key="createdById" className={sx["extable-cell"]} />
            <Column title="Created At" dataIndex="createdAt" key="createdAt" className={sx["extable-cell"]} />
            <Column title="" dataIndex="" key="x" className={sx["extable-cell"]} render={
                (data) => (
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
                )
            }/>
        </Table>
    )
}

export default ExTable