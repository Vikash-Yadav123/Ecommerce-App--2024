import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import '../../styles/AuthStyle.css';



const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [answer, setAnswer] = useState('');

    // handle forget password
    const handleForget = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/forget-password`, { email, answer, newpassword });
            if (data && data?.success) {
                navigate('/login');
                toast.success('Successfully reset password');
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }
    return (
        <Layout title=" Forget Password Page" author="vikash" description="Welcome to  ecommerce app" keywords="ecommerce,shop,online,products">
            <div className='container-fluid form-container border shadow'>
                <div className='FormData'>
                    <form onSubmit={handleForget} className='form'>
                        <div className='heading-register '>
                            <h2>Forget Password </h2>
                            <p> Welcome back to ForgetPassword</p>
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter the Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="exampleInputPaaword1" aria-describedby="emailHelp" placeholder="Enter the NewPassword" value={newpassword} onChange={(e) => setNewpassword(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter the Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        </div>


                        <button type="submit" className="btn btn-primary submit">Submit</button>
                    </form>

                </div>
            </div>
        </Layout>
    )
}

export default ForgetPassword
