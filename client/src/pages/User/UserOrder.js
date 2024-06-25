import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import moment from 'moment';


const UserOrder = () => {
    const [order, setOrder] = useState([]);
    const [auth, setAuth] = useAuth();


    // GET ORDER
    const getOrder = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/get-order`);
            if (data && data?.success) {
                setOrder(data.order);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }

    useEffect(() => {
        if (auth?.token) getOrder();
    }, [])
    return (
        <Layout title="User Order - Ecommerce"
            description="user order for the ecommerce app"
            keywords="user, order, ecommerce, products" >
            <div className='container-fluid  mt-4'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9 mt-2 ps-4'>
                        <h3 className='text-center products-heading'>User Order</h3>
                        <div className='container-fluid'>
                            {order?.map((o, i) => (
                                <div className='w-90'>
                                    <table className="table border shadow">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Payment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={o._id}>
                                                <th>{i}</th>
                                                <td>{o?.status}</td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createdAt).fromNow()}</td>
                                                <td>{o?.product.length}</td>
                                                <td>{o?.payment?.transaction ? "Success" : "False"}</td>
                                                <td>{o?.product?.name}</td>
                                            </tr>



                                        </tbody>
                                    </table>
                                    {o?.product?.map((p) => (
                                        <div className=' mb-2 border'>
                                            <div className='' key={p._id}>

                                                <div className='row'>
                                                    <div className='col-md-6  mt-4'>
                                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} style={{ width: "100%", height: "250px" }} />

                                                    </div>
                                                    <div className='col-md-5 mb-2 div-2'>
                                                        <h3 className='text-center mt-2 '>Product Details</h3>
                                                        <div className='d-flex '><h5>Name:-</h5><p>{p.name}</p></div>
                                                        <div className='d-flex'><h5>Description:-</h5><p>{p.description.substring(0, 30)}...</p></div>
                                                        <div className='d-flex '><h5>Price:-</h5><p>${p.price}.00</p></div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>

                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserOrder;
