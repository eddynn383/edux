import MainLayout from '@/layouts/MainLayout'
import React from 'react'

const Catalog = () => {
  return (
    <MainLayout>
        <div className="container">
            <div className="grid place-content-center min-h-screen">
                <div style={{maxWidth: "700px"}}>
                    <div style={{display: "flex", flexDirection: "column", gap: '20px'}}>Dashboard</div>
                </div>
            </div>
        </div>
    </MainLayout>
  )
}

export default Catalog