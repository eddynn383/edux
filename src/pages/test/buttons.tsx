import MainLayout from '@/layouts/MainLayout'
import Button from '@/components/Button'
import { useTheme } from 'next-themes'
import Loading from '@/components/Loading'

const Buttons = () => {
    const { resolvedTheme  } = useTheme()
    console.log(resolvedTheme )
    return (
        <MainLayout>
            <div className="container">
                <div style={{maxWidth: "1024px", padding: "24px", backgroundColor: resolvedTheme === 'dark' ? "#242424" : "#ffffff"}}>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(6, auto)", gridTemplateRows: "repeat(6, auto)", gridAutoFlow: "row", gap: '20px'}}>
                        <Button theme={resolvedTheme} type="button" size="large" variant="solid" status="accent" disabled>Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="solid" status="success" disabled>Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="solid" status="fail" disabled>Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="solid" status="warning" disabled>Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="solid" status="info" disabled>Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="solid" status="neutral" disabled>Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="solid" status="accent">Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="solid" status="success">Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="solid" status="fail">Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="solid" status="warning">Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="solid" status="info">Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="solid" status="neutral">Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="solid" status="accent">Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="solid" status="success">Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="solid" status="fail">Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="solid" status="warning">Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="solid" status="info">Button 1</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="solid" status="neutral">Button 1</Button>
                    </div>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(6, auto)", gridTemplateRows: "repeat(6, auto)", gridAutoFlow: "row", gap: '20px'}}>
                        <Button theme={resolvedTheme} type="button" size="large" variant="outline" status="accent" disabled>Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="outline" status="success" disabled>Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="outline" status="fail" disabled>Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="outline" status="warning" disabled>Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="outline" status="info" disabled>Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="outline" status="neutral" disabled>Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="outline" status="accent">Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="outline" status="success">Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="outline" status="fail">Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="outline" status="warning">Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="outline" status="info">Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="outline" status="neutral">Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="outline" status="accent">Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="outline" status="success">Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="outline" status="fail">Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="outline" status="warning">Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="outline" status="info">Button 2</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="outline" status="neutral">Button 2</Button>
                    </div>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(6, auto)", gridTemplateRows: "repeat(6, auto)", gridAutoFlow: "row", gap: '20px'}}>
                        <Button theme={resolvedTheme} type="button" size="large" variant="neutral" status="accent" surface="1" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="neutral" status="success" surface="1" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="neutral" status="fail" surface="1" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="neutral" status="warning" surface="1" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="neutral" status="info" surface="1" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="neutral" status="neutral" surface="1" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="neutral" status="accent" surface="1">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="neutral" status="success" surface="1">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="neutral" status="fail" surface="1">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="neutral" status="warning" surface="1">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="neutral" status="info" surface="1">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="neutral" status="neutral" surface="1">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="neutral" status="accent" surface="1">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="neutral" status="success" surface="1">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="neutral" status="fail" surface="1">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="neutral" status="warning" surface="1">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="neutral" status="info" surface="1">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="neutral" status="neutral" surface="1">Button 3</Button>
                    </div>                    
                    <div style={{display: "grid", gridTemplateColumns: "repeat(6, auto)", gridTemplateRows: "repeat(6, auto)", gridAutoFlow: "row", gap: '20px'}}>
                        <Button theme={resolvedTheme} type="button" size="large" variant="neutral" status="accent" surface="2" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="neutral" status="success" surface="2" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="neutral" status="fail" surface="2" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="neutral" status="warning" surface="2" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="neutral" status="info" surface="2" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="neutral" status="neutral" surface="2" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="neutral" status="accent" surface="2">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="neutral" status="success" surface="2">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="neutral" status="fail" surface="2">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="neutral" status="warning" surface="2">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="neutral" status="info" surface="2">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="neutral" status="neutral" surface="2">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="neutral" status="accent" surface="2">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="neutral" status="success" surface="2">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="neutral" status="fail" surface="2">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="neutral" status="warning" surface="2">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="neutral" status="info" surface="2">Button 3</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="neutral" status="neutral" surface="2">Button 3</Button>
                    </div>

                    <div style={{display: "grid", gridTemplateColumns: "repeat(6, auto)", gridTemplateRows: "repeat(6, auto)", gridAutoFlow: "row", gap: '20px'}}>
                        <Button theme={resolvedTheme} type="button" size="large" variant="text" status="accent" disabled>Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="text" status="success" disabled>Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="text" status="fail" disabled>Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="text" status="warning" disabled>Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="text" status="info" disabled>Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="large" variant="text" status="neutral" disabled>Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="text" status="accent">Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="text" status="success">Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="text" status="fail">Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="text" status="warning">Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="text" status="info">Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="medium" variant="text" status="neutral">Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="text" status="accent">Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="text" status="success">Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="text" status="fail">Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="text" status="warning">Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="text" status="info">Button 4</Button>
                        <Button theme={resolvedTheme} type="button" size="small" variant="text" status="neutral">Button 4</Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

Buttons.auth = {
    roles: ["ADMIN"],
    loading: <Loading />,
    unauthorized: "/unauthorized", // redirect to this url
}


export default Buttons