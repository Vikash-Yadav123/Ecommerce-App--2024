import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import axios from 'axios';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import toast from 'react-hot-toast';
import '../styles/CartStyle.css';
import { ImCross } from "react-icons/im";

const CartPage = () => {
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState(null);
    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // CALCULATE TOTAL PRICE
    const TotalPrice = () => {
        let total = 0;
        cart.forEach((p) => {
            total += p.price;
        });
        return total.toLocaleString('en-US', {
            style: "currency",
            currency: 'USD'
        });
    }

    // REMOVE ITEM
    const RemoveItem = (id) => {
        let updatedCart = cart.filter((item) => item._id !== id);
        setCart(updatedCart);
        localStorage.setItem('ecart', JSON.stringify(updatedCart));
    }

    // GET BRAINTREE TOKEN
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree-token`);
            setClientToken(data.clientToken);
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }

    useEffect(() => {
        getToken();
    }, []);

    // PAYMENT
    const getPayment = async () => {
        if (!instance) {
            toast.error('Payment instance is not set');
            return;
        }
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, { nonce, cart });
            setLoading(false);
            toast.success('Successfully Payment');
            navigate(`/dashboard/user/orders`);
            setCart([]);
            localStorage.removeItem('ecart');
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error('Internal Server Error');
        }
    }

    // CLEAR ALL ITEMS FUNCTION
    const ClearALL = () => {
        localStorage.removeItem('ecart');
        setCart([]);
    }

    // Group cart items by product ID and calculate total quantity
    const groupItems = cart.reduce((acc, item) => {
        if (!acc[item._id]) {
            acc[item._id] = { ...item, quantity: 1 };
        } else {
            acc[item._id].quantity += 1;
        }
        return acc;
    }, {});

    // Convert groupedItems object to an array 
    const groupedItemsArray = Object.values(groupItems);

    return (
        <Layout title="Cart Page - Ecommerce"
            description="cart page for the ecommerce app"
            keywords="cart, add to cart, ecommerce, products">
            <div className='container-fluid'>
                <div className='row cart-page'>
                    <h5 className='text-center text-success bg-info-subtle p-2'>
                        {!auth?.user
                            ? "Hello Guest"
                            : `Hello  ${auth?.token && auth?.user?.name}`}
                        <p className="text-center">
                            {cart?.length
                                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"}`
                                : "Your Cart Is Empty"}
                        </p>
                    </h5>
                    <div className='col-md-8'>
                        {groupedItemsArray?.map((p) => (
                            <table key={p._id} className="w-100 border mb-3">
                                <tbody>
                                    <tr className='d-flex justify-content-between align-items-center'>
                                        <td className='text-center' style={{ flex: '1' }}>
                                            <img
                                                src={`${process.env.REACT_APP_API}/api/v1/product/get-photo/${p._id}`}
                                                className="card-img-top"
                                                alt={p.name}
                                                style={{ width: "50px", height: "50px" }}
                                            />
                                        </td>
                                        <td className='text-center' style={{ flex: '2' }}>{p.name}</td>
                                        <td className='text-center' style={{ flex: '1' }}>${p.price}.00</td>
                                        <td className='text-center' style={{ flex: '1' }}>
                                            <ImCross className='cross' onClick={() => RemoveItem(p._id)} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ))}
                        {cart.length > 1 && (
                            <div className='mt-2 mb-2 all-clear'>
                                <button className='btn btn-danger' onClick={ClearALL}>CLEAR ALL ITEMS</button>
                            </div>
                        )}
                    </div>
                    <div className='col-md-4'>
                        <h2 className='text-center mb-2 text-danger'>Cart Summary</h2>
                        <h4 className='text-center'>Total || Checkout || Payment</h4>
                        <hr />
                        {auth?.token ? (
                            auth?.user?.address ? (
                                <>
                                    <h5 className='text-center text-info'>Total Amount: {TotalPrice()}</h5>
                                    <h5 className='text-center mb-2'>Address: {auth?.user?.address}</h5>
                                    <div className='mb-2 text-center'>
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                    </div>
                                    <div className='mb-2 text-center'>
                                        {clientToken && (
                                            <>
                                                <DropIn
                                                    options={{ authorization: clientToken, paypal: { flow: "vault" } }}
                                                    onInstance={instance => setInstance(instance)}
                                                />
                                                <button className='btn btn-primary' onClick={getPayment}>
                                                    {loading ? "Processing" : 'Make Payment'}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className='mb-2 text-center'>
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/login')}>Please Check Login</button>
                                </div>
                            )
                        ) : (
                            <div className='mb-2 text-center'>
                                <button className='btn btn-outline-warning' onClick={() => navigate(location.state || '/login')}>Please Check Login</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage;
