import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import { useLocation, Link } from 'react-router-dom'
import '../../styles/AuthStyle.css';


const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // handle login
    const handleLogin = async (e) => {

        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });

            if (data && data?.success) {
                toast.success('Successfully Login');
                setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token
                });
                localStorage.setItem('auth3', JSON.stringify(data));
                navigate(location.state || '/');

            } else {
                toast.error(data?.message);

            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }
    return (
        <Layout title=" Login Page" author="vikash" description="Welcome to  ecommerce app" keywords="ecommerce,shop,online,products">
            <div className='container-fluid form-container border shadow'>
                <div className='FormData'>
                    <form className='form'>
                        <div className='heading-register text-center '>
                            <h2>Login Form</h2>
                            <p>Welcome back Login</p>
                        </div>

                        <div className="mb-3">
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter the Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="exampleInputPaaword1" aria-describedby="emailHelp" placeholder="Enter the Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <p>If you want to  <Link to="/forgetpassword">Forget Password</Link></p>



                        <button type="submit" className="btn btn-primary submit mb-2" onClick={handleLogin}>SUBMIT</button>
                    </form>

                </div>
            </div>
        </Layout>
    )
}

export default Login
