import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'


const Product = () => {
    const [products, setProducts] = useState([]);

    // GET ALL PRODUCTS
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`);
            if (data?.success) {
                setProducts(data.products);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])
    return (
        <Layout title="Products - Ecommerce"
            description="get and manage products for the ecommerce app"
            keywords="admin, dashboard, ecommerce, products"
        >
            <div className='container-fluid  mt-4'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 mt-2  ps-4'>
                        <h3 className='text-center'>Products</h3>
                        <div className='d-flex flex-wrap  '>
                            {products?.map((p) => (
                                <Link to={`/dashboard/admin/update/${p.slug}`} className='' key={p._id}>
                                    <div className="card mb-2 ms-4" style={{ width: '18rem' }}>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0, 20)}</p>
                                        </div>
                                    </div>
                                </Link>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product
