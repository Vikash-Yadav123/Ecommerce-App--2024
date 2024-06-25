import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';


const User = () => {
    const [users, setUsers] = useState([]);

    // GET ALL PROFILE
    const getAllProfile = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/get-allusers`);
            if (data?.success) {
                setUsers(data.users);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }

    // call getall profile
    useEffect(() => {
        getAllProfile();
    }, [])


    return (
        <Layout title=" Get Users - Ecommerce"
            description="Get and manage users for the ecommerce app"
            keywords="admin, dashboard, ecommerce, users"
        >
            <div className='container-fluid  mt-4'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>

                    <div className='col-md-8'>
                        <h3 className='text-center products-heading bg-danger-subtle mb-2 p-2'>Users</h3>

                        <div className="w-100 ">
                            <div className='d-flex flex-column'>
                                <div className=' d-flex justify-content-between align-items-center mb-2'>
                                    <h5 style={{ flex: '1' }}>Name</h5>
                                    <h5 style={{ flex: '1' }}>Email</h5>
                                    <h5 style={{ flex: '1' }}>Phone</h5>
                                    <h5 style={{ flex: '1' }}>Address</h5>
                                </div>
                            </div>
                            <div className=''>
                                {users?.map((u) => (
                                    <div key={u._id} className='d-flex justify-content-between align-items-center'>
                                        <p className='' style={{ flex: '1' }}>
                                            {u.name}
                                        </p>
                                        <p className='text-center' style={{ flex: '2' }}>
                                            {u.email}
                                        </p>
                                        <p className='text-center' style={{ flex: '2' }}>
                                            {u.phone}
                                        </p>
                                        <p className='' style={{ flex: '2' }}>
                                            {u.address}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default User

