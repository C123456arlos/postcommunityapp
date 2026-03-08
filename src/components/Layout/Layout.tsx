import React, { ReactNode } from 'react'
import Navbar from '../Navbar/Navbar'
interface props {
    children: React.ReactNode
}
const Layout: React.FC<props> = ({ children }) => {
    return (
        <>
            <Navbar></Navbar>
            <main>{children}</main>
        </>
    )
}
export default Layout
