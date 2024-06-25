import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import Categoryes from './Categoryes';
import { useCart } from '../context/cart'
import { useNavigate } from 'react-router-dom'

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const params = useParams();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    // GET PRODUCTS
    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-categoryproduct/${params.slug}`)
            if (data?.success) {
                setProducts(data.product);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }

    useEffect(() => {
        if (params) getProducts();
    }, [params])


    return (
        <Layout title="Category Product - Ecommerce"
            description="category product for the ecommerce app"
            keywords="category, product, ecommerce, products" >
            <div className='container-fluid '>


                <div className='row'>
                    <div className='bg-danger-subtle mb-2 p-2'>
                        <h3 className='text-center products-heading'>CategoryProduct</h3>
                        <h5 className='text-center text-success'>{products && products.length ? ` Find Product ${products.length}` : ` Not Find Product`}</h5>
                    </div>
                    <div className=''>
                        <div className='d-flex flex-wrap align-items-center justify-content-center  '>

                            {products?.map((p) => (
                                <div className="card mb-2 main-card ms-4" style={{ width: '18rem' }} key={p._id}>
                                    <div className='images'>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} />

                                    </div>
                                    <div className="card-body">
                                        <div className='card-name-price'>
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">${p.price}.00</p>

                                        </div>
                                        <p className="card-text">{p.description.substring(0, 26)}..</p>
                                    </div>
                                    <div className='d-flex gap-2 justify-content-evenly home-btn mb-2'>
                                        <button className='btn btn-info btn-success btn-add-card'
                                            onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem('ecart', JSON.stringify([...cart, p]));
                                                toast.success('Add to cart')
                                            }}
                                        >ADD TO CARD</button>
                                        <button className='btn btn-success  btn-details' onClick={() => navigate(`/details/${p.slug}`)}>DETAILS</button>
                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct
