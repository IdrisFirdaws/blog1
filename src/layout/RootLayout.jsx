import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/global/Footer'

export default function RootLayout() {
    return (
        <div>
            <Outlet />
            <Footer />
        </div>
    )
}
