import React from 'react'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    useEffect(() => {
        const AuthCheck = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-route`);
            if (data?.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }
        if (auth?.token) AuthCheck();
    }, [auth?.token]);
    return ok ? <Outlet /> : <Spinner path="/" />;
}

export default AdminRoute;
