import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Checkbox, Radio } from 'antd';
import { prices } from '../components/Prices'
import { useSearch } from '../context/search'
import { useCart } from '../context/cart'
import { BiLoaderAlt } from "react-icons/bi";
import Slider from '../components/Slider.js'
import { Color, colors } from '../components/Color.js'
import '../styles/HomePage.css';
import { sizes } from '../components/Size.js'

const { Option } = Radio;


const HomePage = () => {
    const [auth, setAuth] = useAuth();
    const [value, setValue] = useSearch();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [total, setTotal] = useState();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);



    // GET ALL PRODUCTS
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/page-count/${page}`);
            setLoading(false);
            if (data?.success) {
                setProducts(data.products);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error('Internal Server Error');
        }
    }

    useEffect(() => {
        if (!checked.length && !radio.length && !color.length && !size.length) getAllProducts();
    }, [checked.length, radio.length, color.length, size.length]);


    // GET ALL CATEGORYS
    const getAllCategorys = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-categorys`);
            if (data?.success) {
                setCategorys(data.categorys);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }

    useEffect(() => {
        getAllCategorys();
    }, [])

    // GET CATEGORY VALUE AND ID BY FILTER 
    const filterCategory = (value, id) => {
        let val = [...checked];
        if (value) {
            val.push(id)
        } else {
            val = val.filter((val) => val !== id);
        }
        setChecked(val);
    }
    // GET COLOR VALUE AND NAME BY FILTER 
    const filterColors = (value, name) => {
        let vals = [...color];
        if (value) {
            vals.push(name)
        } else {
            vals = vals.filter((val) => val !== name);
        }
        setColor(vals);
    }
    // GET SIZE VALUE AND NAME BY FILTER 
    const filterSizes = (value, size) => {
        let vals = [...size];
        if (value) {
            vals.push(size)
        } else {
            vals = vals.filter((val) => val !== size);
        }
        setSize(vals);
    }
    // FILTER PRODUCT 
    const filterProduct = async () => {
        try {
            console.log(checked, radio, color);
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-product`, { checked, radio, color, size });
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
        if (checked.length || radio.length || color.length || size.length) {
            filterProduct();
        } else {
            getAllProducts();
        }
    }, [checked, radio, color, size])







    // COUNT TOTAL PRODUCT
    const totalProduct = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/count-product`);
            setLoading(false);
            if (data && data?.success) {
                setTotal(data.total);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error('internal Server Error');
        }
    }
    useEffect(() => {
        totalProduct();
    }, [])

    // LOADMORE FUNCTION ON CLICK LOAD BUUTTON
    const LoadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/page-count/${page}`);
            setLoading(false);
            if (data?.success) {
                setProducts([...products, ...data.products]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
            setLoading(false);

        }
    }
    useEffect(() => {
        if (page > 1) LoadMore();
    }, [page]);

    // CLEAR ALL FILTER
    const ClearAllFilter = () => {
        window.location.reload();
    }

    // ADD TO CARD FUNCTION
    const addtocard = (id, p, pl) => {
        const product = pl;
        let stock = cart.filter((p) => p._id === id);
        let stocks = stock.length;
        console.log(stocks)

        if (stocks < product) {
            setCart([...cart, p]);
            localStorage.setItem('ecart', JSON.stringify([...cart, p]));
            toast.success('Add to cart');

        } else {
            toast.success('Out Of Stock');


        }

    }


    return (
        <Layout title=" Home Page-Ecommerce" description=" home page for  ecommerce app" keywords="home page,ecommerce,shop,online,products" excludeFromSEO={true}>
            <Slider />

            <div className='container-fluid mt-4 home-page'>
                <div className='row'>
                    <div className='col-md-3 border mb-4'>
                        <div className='mb-2 ms-2 '>
                            <div className='mb-2 d-flex justify-content-between align-items-center '>
                                <h3 className='text-center'>Filters</h3>
                                <h5 className='text-primary ' onClick={ClearAllFilter} style={{ cursor: 'pointer' }}>CLEAR ALL</h5>
                            </div>
                            <h5 className=''>Categoryes[{checked && checked.length ? products.length : '0'}]</h5>
                            {categorys?.map((c) => (
                                <div className='d-flex ' >
                                    <Checkbox className='custom-font-size check' key={c._id} value={c._id} onClick={(e) => filterCategory(e.target.checked, c._id)}>
                                        {c.name}
                                    </Checkbox>
                                </div>
                            ))}

                        </div>
                        <hr />
                        <div className='mb-2 ms-2 '>
                            <h5 className=''>Colors[{color && color.length ? products.length : '0'}]</h5>
                            {colors?.map((c) => (
                                <div className='d-flex ' >
                                    <Checkbox className='custom-font-size' key={c._id} value={c.name} onClick={(e) => filterColors(e.target.checked, c.name)}>
                                        {c.name}
                                    </Checkbox>
                                </div>
                            ))}

                        </div>
                        <hr />

                        <div className='mb-2 ms-2 '>
                            <h5 className=''>Sizes[{size && size.length ? products.length : '0'}]</h5>
                            {sizes?.map((s) => (
                                <div className='d-flex ' >
                                    <Checkbox className='custom-font-size' value={s.name} key={s._id} onClick={(e) => filterSizes(e.target.checked, s.size)}>
                                        {s.size}
                                    </Checkbox>
                                </div>
                            ))}

                        </div>
                        <hr />

                        <div className='mb-2 ms-2'>
                            <h5 className=''>Prices[{radio && radio.length ? products.length : '0'}]</h5>
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {prices?.map((p) => (
                                    <div className='d-flex ' key={p._id}>
                                        <Radio className='custom-font-size' key={p._id} value={p.array}>{p.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <hr />

                    </div>
                    <div className='col-md-9 mt-2  ps-4'>
                        <h3 className='text-center products-heading text-success'>All Products</h3>


                        <div className='d-flex flex-wrap'>

                            {products.map((p) => (
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
                                                addtocard(p._id, p, p.quantity)
                                            }}
                                        >ADD TO CARD</button>
                                        <button className='btn btn-success  btn-details' onClick={() => navigate(`/details/${p.slug}`)}>DETAILS</button>
                                    </div>

                                </div>
                            ))}

                        </div>

                        <div className='mt-2 mb-2  text-center'>
                            {total && products.length < total && (
                                <p className='load '
                                    onClick={() => setPage(page + 1)}
                                >
                                    {loading ? "Loading" : "LoadMore"} <BiLoaderAlt className='loader' />
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage
