import './layout.css';
import { Outlet } from "react-router-dom";
import Navbar from '../navbar/navbar';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {Flex} from "../styles/flex.styled"

function Layout() {

    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!cookies.get("user")){
            navigate("/login");
        }
    },[]);

    return (
        <Flex className='layout'>
            <Navbar />
            <Outlet/>
        </Flex>
    );
}

export default Layout;
