import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/AuthStyle.css';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');


    // handel register
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, answer, phone, address });
            if (data && data?.success) {
                toast.success('Succefully Register');
                navigate('/login')
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }

    return (
        <Layout title=" Register Page" author="vikash" description="Welcome to  ecommerce app" keywords="ecommerce,shop,online,products">
            <div className='container-fluid form-container border shadow'>
                <div className='FormData'>
                    <form onSubmit={handleRegister} className='form'>
                        <div className='heading-register '>
                            <h2>Create an account</h2>
                            <p>Welcome to create an account</p>
                        </div>

                        <div className="mb-3">
                            <input type="name" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" placeholder="Enter the Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter the Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                        <div className="mb-3">
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=" Favourate Sports" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        </div>

                        <p>Already registerd <Link to="/login">Login</Link></p>
                        <button type="submit" className="btn btn-primary submit">Submit</button>
                    </form>

                </div>
            </div>
        </Layout>
    )
}

export default Register
