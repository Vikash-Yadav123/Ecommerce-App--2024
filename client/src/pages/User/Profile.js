import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'

const Profile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [id, setId] = useState('');
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        let data = localStorage.getItem('auth3');
        if (data) {
            let ls = JSON.parse(data);
            setAuth(ls);
        }
    }, [])

    useEffect(() => {
        setName(auth?.user.name);
        setEmail(auth?.user.email);
        setPhone(auth?.user.phone);
        setAddress(auth?.user.address);
        setId(auth?.user._id)

    }, [auth?.token])




    // HANDLE UPDATE PROFILE
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-profile/${id}`, { name, email, password, phone, address });
            if (data && data?.success) {
                toast.success('Succefully Update Profile');
                setAuth({ ...auth, user: data.user });
                localStorage.setItem('auth3', JSON.stringify({ ...auth, user: data.user }))

            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }

    return (
        <Layout title="Profile - Ecommerce"
            description="user profile for the ecommerce app"
            keywords="user, profile, ecommerce, products" >
            <div className='container-fluid  mt-4'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9 mb-4 ps-4'>
                        <h3 className='text-center products-heading mb-0'>User Profile</h3>

                        <div className='FormData'>
                            <form onSubmit={handleUpdateProfile} className='form'>
                                <h2>Update Profile</h2>

                                <div className="mb-3">
                                    <input type="name" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" placeholder="Enter the Name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter the Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" id="exampleInputPaaword1" aria-describedby="emailHelp" placeholder="Enter the Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter the Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="Number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter the Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>



                                <button type="submit" className="btn btn-primary submit">Submit</button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
