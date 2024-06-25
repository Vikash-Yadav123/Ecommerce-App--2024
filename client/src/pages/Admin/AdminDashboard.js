import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'
const AdminDashboard = () => {
    const [auth, setAuth] = useAuth();
    return (
        <Layout title="Admin Dashboard - Ecommerce"
            description="Admin Dashboard for managing the ecommerce app"
            keywords="admin, dashboard, ecommerce, management">
            <div className='container-fluid  mt-4'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 mt-2 w-50 card ps-4 pt-4'>
                        <h2>Name:{auth?.user.name}</h2>
                        <h2>Eamil:{auth?.user.email}</h2>
                        <h2>Address:{auth?.user.address}</h2>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
