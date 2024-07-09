import React from 'react'
import VisitorNavbar from '../components/global/VisitorNavbar'
import { Outlet } from 'react-router-dom'

export default function VisitorLayout() {
    return (
        <div>
            <VisitorNavbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
