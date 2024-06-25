import React from 'react'
import Layout from '../components/Layout/Layout.js';
import { useSearch } from '../context/search';
import axios from 'axios';
import { useCart } from '../context/cart.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SearchProduct = () => {
    const [value, setValue] = useSearch();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    return (
        <Layout title="Search Product - Ecommerce"
            description="search product for the ecommerce app"
            keywords="search, products, ecommerce, products" >
            <div className='container-fluid '>
                <div className='row'>
                    <div className='bg-danger-subtle mb-2 p-2'>
                        <h2 className='text-center products-heading'>Search Product</h2>
                        <h5 className='text-center text-success'>{value && value?.result.length ? ` Find Product ${value?.result.length}` : ` Not Find Product`}</h5>
                    </div>
                    <div className=''>
                        <div className='d-flex flex-wrap align-items-center justify-content-center  '>

                            {value?.result.map((p) => (
                                <div className="card main-card mb-2 ms-4" style={{ width: '18rem' }} key={p._id}>
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

export default SearchProduct
