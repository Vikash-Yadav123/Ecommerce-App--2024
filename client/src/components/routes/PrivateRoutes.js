import React, { useState } from 'react'
import { useAuth } from '../../context/auth'
import { useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

const PrivateRoutes = () => {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);
    useEffect(() => {
        const AuthCheck = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-route`);
            if (data?.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }
        if (auth?.token) AuthCheck();

    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner />;
}

export default PrivateRoutes;

