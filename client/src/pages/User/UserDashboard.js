import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'

const UserDashboard = () => {
    const [auth, setAuth] = useAuth();
    return (
        <Layout title="user Dashbord - Ecommerce"
            description="user dashbord for the ecommerce app"
            keywords="user, dashbord, ecommerce, products" >
            <div className='container-fluid  mt-4'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
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

export default UserDashboard
