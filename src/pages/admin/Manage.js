import React from 'react';
import SideBar from '../../components/SideBar';
import {Outlet } from 'react-router-dom';



const Manage = () => {
    return (
        <div className='d-flex'>
            <SideBar />
            

            <Outlet />
        </div>
    )
}

export default Manage;