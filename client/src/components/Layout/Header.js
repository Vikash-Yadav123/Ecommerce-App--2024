import React from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import SearchForm from '../form/SearchForm'
import { useCart } from '../../context/cart'
import useCategory from '../../hooks/useCategory'
import { Badge } from 'antd';
const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const categorys = useCategory();
    // handle logout
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: '',
            token: null
        });
        localStorage.removeItem('auth3')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg  bg-body-secondary shadow">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Vikash</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>



                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto">
                            <li className="nav-item">
                                <SearchForm />
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Category
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="/categoryes">All Category</NavLink></li>
                                    <li className="nav-item">
                                        {categorys.map((c) => (
                                            <NavLink className="nav-link active" aria-current="page" to={`/categorye/${c.slug}`} >{c.name}</NavLink>

                                        ))}
                                    </li>
                                </ul>
                            </li>

                            {
                                !auth.token ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link active" aria-current="page" to="/register">Register</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link active" aria-current="page" to="/login">Login</NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>


                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {auth?.user.name}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : 'user'}`}>Dashboard</NavLink></li>
                                                <li className="nav-item">
                                                    <NavLink className="nav-link active" aria-current="page" to="/login" onClick={handleLogout}>Logout</NavLink>
                                                </li>
                                            </ul>
                                        </li>




                                    </>
                                )
                            }
                            <li className="nav-item ">
                                <NavLink className="nav-link active" aria-current="page" to="/cart">

                                    <Badge count={cart.length} className='cart-text' >
                                        Cart
                                    </Badge>
                                </NavLink>
                            </li>


                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
