import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'

function Layout() {
    return (
        <div>
            <Header />
            <div className='pt-[4rem] sm:pt-[5rem]'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
