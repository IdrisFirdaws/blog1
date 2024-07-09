import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/global/AdminNavbar'

export default function AdminLayout() {
    return (
        <div>
            <AdminNavbar />
            <main>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    )
}
