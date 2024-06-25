import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import moment from 'moment'
import { useAuth } from '../../context/auth'
import { Select } from 'antd';
const { Option } = Select;

const AdminOrders = () => {
    const [order, setOrder] = useState([]);
    const [auth, setAuth] = useAuth();
    const [statuses, setStatuses] = useState(["Shipping", "Cancellation", "Process", "Packaging", "Deliver"]);

    // GET ORDER
    const getAllOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/get-allorders`);
            if (data && data?.success) {
                setOrder(data.orders);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }

    useEffect(() => {
        if (auth?.token) getAllOrders();
    }, [])

    // UPDATE ORDER STATUS
    const updateStatus = async (orderId, status) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-status/${orderId}`, { status })
            if (data?.success) {
                getAllOrders();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }


    return (
        <Layout title="Get Orders - Ecommerce"
            description="Get Orders for managing the ecommerce app"
            keywords="admin, dashboard, ecommerce,Orders">
            <div className='container-fluid  mt-4'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 mt-2  ps-4'>
                        <h3 className='text-center'>Orders</h3>
                        {order?.map((o, i) => (
                            <div className='w-90' >
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
                                        <tr>
                                            <th>{i}</th>
                                            <td>
                                                <Select
                                                    className='form-select'
                                                    showSearch
                                                    placeholder="Select Status"
                                                    variant='false'
                                                    defaultValue={"Shipping"}
                                                    value={o.status}
                                                    onChange={(value) => updateStatus(o._id, value)}

                                                >

                                                    {statuses?.map((s) => (
                                                        <Option key={s} value={s}>
                                                            {s}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </td>
                                            <td>{o?.buyer?.name}</td>
                                            <td>{moment(o?.createdAt).fromNow()}</td>
                                            <td>{o?.product.length}</td>
                                            <td>{o?.payment?.transaction ? "Success" : "False"}</td>
                                            <td>{o?.product?.name}</td>
                                        </tr>



                                    </tbody>
                                </table>
                                <div className='container-fluid row'>
                                    {o?.product?.map((p) => (
                                        <div className=' mb-2 border'>
                                            <div className='' >

                                                <div className='row' key={p._id} >
                                                    <div className='col-md-6  mt-4'>
                                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} style={{ width: "100%", height: "250px" }} />

                                                    </div>
                                                    <div className='col-md-5 mb-2 div-2' >
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
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrders
