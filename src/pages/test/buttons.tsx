import React from 'react'
import MainLayout from '@/layouts/MainLayout'
import Button from '@/components/Button'
import { useTheme } from 'next-themes'

const Buttons = () => {
    const { resolvedTheme  } = useTheme()
    console.log(resolvedTheme )
    return (
        <MainLayout>
            <div className="container">
                <div style={{maxWidth: "1024px", padding: "24px", backgroundColor: resolvedTheme === 'dark' ? "#242424" : "#ffffff"}}>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(6, auto)", gridTemplateRows: "repeat(6, auto)", gridAutoFlow: "row", gap: '20px'}}>
                        <Button theme={resolvedTheme} size="large" variant="solid" status="accent" disabled>Button 1</Button>
                        <Button theme={resolvedTheme} size="large" variant="solid" status="success" disabled>Button 1</Button>
                        <Button theme={resolvedTheme} size="large" variant="solid" status="fail" disabled>Button 1</Button>
                        <Button theme={resolvedTheme} size="large" variant="solid" status="warning" disabled>Button 1</Button>
                        <Button theme={resolvedTheme} size="large" variant="solid" status="info" disabled>Button 1</Button>
                        <Button theme={resolvedTheme} size="large" variant="solid" status="neutral" disabled>Button 1</Button>
                        <Button theme={resolvedTheme} size="medium" variant="solid" status="accent">Button 1</Button>
                        <Button theme={resolvedTheme} size="medium" variant="solid" status="success">Button 1</Button>
                        <Button theme={resolvedTheme} size="medium" variant="solid" status="fail">Button 1</Button>
                        <Button theme={resolvedTheme} size="medium" variant="solid" status="warning">Button 1</Button>
                        <Button theme={resolvedTheme} size="medium" variant="solid" status="info">Button 1</Button>
                        <Button theme={resolvedTheme} size="medium" variant="solid" status="neutral">Button 1</Button>
                        <Button theme={resolvedTheme} size="small" variant="solid" status="accent">Button 1</Button>
                        <Button theme={resolvedTheme} size="small" variant="solid" status="success">Button 1</Button>
                        <Button theme={resolvedTheme} size="small" variant="solid" status="fail">Button 1</Button>
                        <Button theme={resolvedTheme} size="small" variant="solid" status="warning">Button 1</Button>
                        <Button theme={resolvedTheme} size="small" variant="solid" status="info">Button 1</Button>
                        <Button theme={resolvedTheme} size="small" variant="solid" status="neutral">Button 1</Button>
                    </div>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(6, auto)", gridTemplateRows: "repeat(6, auto)", gridAutoFlow: "row", gap: '20px'}}>
                        <Button theme={resolvedTheme} size="large" variant="outline" status="accent" disabled>Button 2</Button>
                        <Button theme={resolvedTheme} size="large" variant="outline" status="success" disabled>Button 2</Button>
                        <Button theme={resolvedTheme} size="large" variant="outline" status="fail" disabled>Button 2</Button>
                        <Button theme={resolvedTheme} size="large" variant="outline" status="warning" disabled>Button 2</Button>
                        <Button theme={resolvedTheme} size="large" variant="outline" status="info" disabled>Button 2</Button>
                        <Button theme={resolvedTheme} size="large" variant="outline" status="neutral" disabled>Button 2</Button>
                        <Button theme={resolvedTheme} size="medium" variant="outline" status="accent">Button 2</Button>
                        <Button theme={resolvedTheme} size="medium" variant="outline" status="success">Button 2</Button>
                        <Button theme={resolvedTheme} size="medium" variant="outline" status="fail">Button 2</Button>
                        <Button theme={resolvedTheme} size="medium" variant="outline" status="warning">Button 2</Button>
                        <Button theme={resolvedTheme} size="medium" variant="outline" status="info">Button 2</Button>
                        <Button theme={resolvedTheme} size="medium" variant="outline" status="neutral">Button 2</Button>
                        <Button theme={resolvedTheme} size="small" variant="outline" status="accent">Button 2</Button>
                        <Button theme={resolvedTheme} size="small" variant="outline" status="success">Button 2</Button>
                        <Button theme={resolvedTheme} size="small" variant="outline" status="fail">Button 2</Button>
                        <Button theme={resolvedTheme} size="small" variant="outline" status="warning">Button 2</Button>
                        <Button theme={resolvedTheme} size="small" variant="outline" status="info">Button 2</Button>
                        <Button theme={resolvedTheme} size="small" variant="outline" status="neutral">Button 2</Button>
                    </div>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(6, auto)", gridTemplateRows: "repeat(6, auto)", gridAutoFlow: "row", gap: '20px'}}>
                        <Button theme={resolvedTheme} size="large" variant="neutral" status="accent" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} size="large" variant="neutral" status="success" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} size="large" variant="neutral" status="fail" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} size="large" variant="neutral" status="warning" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} size="large" variant="neutral" status="info" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} size="large" variant="neutral" status="neutral" disabled>Button 3</Button>
                        <Button theme={resolvedTheme} size="medium" variant="neutral" status="accent">Button 3</Button>
                        <Button theme={resolvedTheme} size="medium" variant="neutral" status="success">Button 3</Button>
                        <Button theme={resolvedTheme} size="medium" variant="neutral" status="fail">Button 3</Button>
                        <Button theme={resolvedTheme} size="medium" variant="neutral" status="warning">Button 3</Button>
                        <Button theme={resolvedTheme} size="medium" variant="neutral" status="info">Button 3</Button>
                        <Button theme={resolvedTheme} size="medium" variant="neutral" status="neutral">Button 3</Button>
                        <Button theme={resolvedTheme} size="small" variant="neutral" status="accent">Button 3</Button>
                        <Button theme={resolvedTheme} size="small" variant="neutral" status="success">Button 3</Button>
                        <Button theme={resolvedTheme} size="small" variant="neutral" status="fail">Button 3</Button>
                        <Button theme={resolvedTheme} size="small" variant="neutral" status="warning">Button 3</Button>
                        <Button theme={resolvedTheme} size="small" variant="neutral" status="info">Button 3</Button>
                        <Button theme={resolvedTheme} size="small" variant="neutral" status="neutral">Button 3</Button>
                    </div>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(6, auto)", gridTemplateRows: "repeat(6, auto)", gridAutoFlow: "row", gap: '20px'}}>
                        <Button theme={resolvedTheme} size="large" variant="text" status="accent" disabled>Button 4</Button>
                        <Button theme={resolvedTheme} size="large" variant="text" status="success" disabled>Button 4</Button>
                        <Button theme={resolvedTheme} size="large" variant="text" status="fail" disabled>Button 4</Button>
                        <Button theme={resolvedTheme} size="large" variant="text" status="warning" disabled>Button 4</Button>
                        <Button theme={resolvedTheme} size="large" variant="text" status="info" disabled>Button 4</Button>
                        <Button theme={resolvedTheme} size="large" variant="text" status="neutral" disabled>Button 4</Button>
                        <Button theme={resolvedTheme} size="medium" variant="text" status="accent">Button 4</Button>
                        <Button theme={resolvedTheme} size="medium" variant="text" status="success">Button 4</Button>
                        <Button theme={resolvedTheme} size="medium" variant="text" status="fail">Button 4</Button>
                        <Button theme={resolvedTheme} size="medium" variant="text" status="warning">Button 4</Button>
                        <Button theme={resolvedTheme} size="medium" variant="text" status="info">Button 4</Button>
                        <Button theme={resolvedTheme} size="medium" variant="text" status="neutral">Button 4</Button>
                        <Button theme={resolvedTheme} size="small" variant="text" status="accent">Button 4</Button>
                        <Button theme={resolvedTheme} size="small" variant="text" status="success">Button 4</Button>
                        <Button theme={resolvedTheme} size="small" variant="text" status="fail">Button 4</Button>
                        <Button theme={resolvedTheme} size="small" variant="text" status="warning">Button 4</Button>
                        <Button theme={resolvedTheme} size="small" variant="text" status="info">Button 4</Button>
                        <Button theme={resolvedTheme} size="small" variant="text" status="neutral">Button 4</Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Buttons