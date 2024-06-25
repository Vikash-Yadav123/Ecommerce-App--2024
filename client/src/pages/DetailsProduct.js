import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import '../styles/CartDetailStyle.css';
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useCart } from '../context/cart'
import { useNavigate } from 'react-router-dom'


const DetailsProduct = () => {
    const params = useParams();
    const [product, setProduct] = useState('');
    const [id, setId] = useState('');
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart();
    const navigate = useNavigate()

    // GET SINGLE PRODUCT BASED ON SLUG
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            if (data && data?.success) {
                setProduct(data.product);
                setId(data?.product?._id);


            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }
    useEffect(() => {
        getSingleProduct();
    }, [params.slug])

    // GET RELATED PRODUCT BASED ON PID AND CID
    const relatedProduct = async (productid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${productid}`)
            if (data.success) {
                setProducts(data.product);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error ');
        }
    }
    useEffect(() => {
        if (id) {
            relatedProduct(id);
        }
    }, [id]);

    return (
        <Layout title="Details Product - Ecommerce"
            description="details product for the ecommerce app"
            keywords="details products, ecommerce, products,online ,shopping" >
            <div className='container-fluid  '>
                <div className='row mt-4 border product-details' >
                    <div className='col-md-4'>
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/get-photo/${product._id}`} className="card-img-top" alt={product.name} style={{ width: "400px", height: "420px" }} />

                    </div>
                    <div className='col-md-8 mt-2 product-details-info'>
                        <h3 className='text-center '>Product Details</h3>
                        <div className='rating'>
                            <FaStar className='gold star' />
                            <FaStar className='gold star' />
                            <FaStar className='gold star' />
                            <FaStar className='gold star' />
                            <CiStar className='white star' />
                            <span>(34 user rating)</span>


                        </div>
                        <div className='d-flex '><h5>Name:-</h5><p>{product.name}</p></div>
                        <div className='d-flex'><h5>Description:-</h5><p>{product.description}</p></div>
                        <div className='d-flex'><h5>Color:-</h5><p>{product.color}</p></div>
                        <div className='d-flex'><h5>Brand:-</h5><p>{product.brand}</p></div>
                        <div className='d-flex'><h5>Size:-</h5><p>{product.size}</p></div>
                        <div className='d-flex'><h5>Category:-</h5><p>{product.category?.name}</p></div>
                        <div className='d-flex'><h5>Price:-</h5><p>${product.price}.00</p></div>
                        <button className='btn btn-info btn-success btn-add-card'
                            onClick={() => {
                                setCart([...cart, product]);
                                localStorage.setItem('ecart', JSON.stringify([...cart, product]));
                                toast.success('Add to cart')
                            }}
                        >ADD TO CARD</button>


                    </div>
                </div>
                <hr />
                <div className=' container-fluid row related-products'>
                    <h3 className='text-center bg-danger-subtle text-light p-4'>{products ? `Find Related Product ${products.length}` : `0 Product Find`}</h3>

                    <div className='d-flex align-items-center justify-content-around flex-wrap related-products-info'>
                        {products.map((p) => (
                            <div className="card mb-2 ms-4" style={{ width: '18rem' }}>
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <div className='card-name-price'>
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">${p.price}.00</p>

                                    </div>
                                    <p className="card-text">{p.description.substring(0, 26)}..</p>
                                </div>
                                <div className='d-flex gap-2 justify-content-evenly mb-2'>
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
        </Layout>
    )
}

export default DetailsProduct;
