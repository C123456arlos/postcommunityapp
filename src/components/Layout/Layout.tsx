import React, { ElementType, ReactNode } from 'react'
import Navbar from '../Navbar/Navbar'
type Props = {
    icon: ElementType
    children: React.ReactNode
}


const Layout = ({ children, icon: Icon }: Props) => {
    return (
        <>
            <Navbar icon={Icon}></Navbar>
            <main>{children}</main>
        </>
    )
}
export default Layout
