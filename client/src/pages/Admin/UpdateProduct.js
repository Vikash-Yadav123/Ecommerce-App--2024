import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
const { Option } = Select;



const UpdateProduct = () => {
    const [product, setProduct] = useState('');
    const [categorys, setCategorys] = useState([]);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [shipping, setShipping] = useState('');
    const [color, setColor] = useState('');
    const [brand, setBrand] = useState('');
    const [size, setSize] = useState('');
    const [id, setId] = useState('');
    const [existingPhotoUrl, setExistingPhotoUrl] = useState('');


    const params = useParams();

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

    // GET SINGLE PRODUCT
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);

            if (data && data?.success) {
                setName(data.product.name);
                setCategory(data.product.category._id);
                setDescription(data.product.description);
                setExistingPhotoUrl(`${process.env.REACT_APP_API}/api/v1/product/get-photo/${data.product._id}`);

                setPrice(data.product.price);
                setQuantity(data.product.quantity);
                setColor(data.product.color);
                setBrand(data.product.brand);
                setSize(data.product.size);
                setShipping(data.product.shipping);
                setId(data.product._id);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }

    useEffect(() => {
        getProduct();
    }, [])

    // UPDATE PRODUCT
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('color', color);
            formData.append('brand', brand);
            formData.append('size', size);
            formData.append('shipping', shipping);
            formData.append('category', category);
            if (photo) formData.append('photo', photo); // Check if photo is not null


            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, formData);
            if (data && data?.success) {
                toast.success('Successfully Update Product');
                navigate('/dashboard/admin/product')
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            toast.error('Internal Server Error');
            console.log(error);
        }
    }

    // DELETE PRODUCT
    const deleteProduct = async (e) => {
        e.preventDefault();
        let promt = window.prompt('Are You Sure Delete this Product');
        try {
            if (!promt) return
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`);
            if (data && data?.success) {
                toast.success('Successfully Delete Product');
                navigate('/dashboard/admin/product');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }

    return (
        <Layout title="Update Product - Ecommerce"
            description="Update and manage products for the ecommerce app"
            keywords="admin, dashboard, ecommerce, products"
        >
            <div className='container-fluid mt-4'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 mt-2  ps-4'>
                        <h3 className='text-center'>Update Products</h3>
                        <div className='w-75'>

                            <form onSubmit={handleUpdateProduct}>
                                <Select
                                    showSearch
                                    placeholder="Select a category"
                                    className='mb-2 form-select'
                                    bordered={false}
                                    size='large'
                                    value={category}
                                    onChange={(value) => setCategory(value)}

                                >
                                    {categorys?.map((c) => (
                                        <Option key={c._id} value={c._id}>
                                            {c.name}
                                        </Option>
                                    ))}
                                </Select>
                                <label className='mb-2 form-control btn btn-outline-secondary'>
                                    {photo ? photo?.name : 'Upload Image'}
                                    <input type="file" onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                                <div className='mb-2 text-center'>
                                    {photo ? (
                                        <img src={URL.createObjectURL(photo)} alt={photo.name} className='img img-responsive' width={"300px"} height={"200px"} />
                                    ) : existingPhotoUrl ? (
                                        <img src={existingPhotoUrl} alt={name} className='img img-responsive' width={"300px"} height={"200px"} />
                                    ) : null}
                                </div>




                                <div className='mb-2 '>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter The Name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mb-2 '>
                                    <textarea col="10"
                                        className='form-control'
                                        placeholder='Enter The Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    >

                                    </textarea>
                                </div>
                                <div className='mb-2 '>
                                    <input
                                        type='Number'
                                        className='form-control'
                                        placeholder='Enter The Price'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className='mb-2 '>
                                    <input
                                        type='Number'
                                        className='form-control'
                                        placeholder='Enter The Quantity'
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                                <div className='mb-2 '>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter The color'
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                    />
                                </div>
                                <div className='mb-2 '>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter The brand'
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    />
                                </div>
                                <div className='mb-2 '>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter The size'
                                        value={size}
                                        onChange={(e) => setSize(e.target.value)}
                                    />
                                </div>
                                <Select
                                    className='mb-2 form-control'
                                    placeholder="Slect shipping"
                                    bordered={false}
                                    value={shipping ? 'true' : 'false'}
                                    onChange={(value) => setShipping(value)}
                                >
                                    <Option value="1">true</Option>
                                    <Option value="0">false</Option>

                                </Select>
                                <div className='mb-2 '>
                                    <button type='submit' className='btn btn-primary ms-2'>UPDATE PRODUCT</button>
                                    <button className='btn btn-danger ms-2' onClick={deleteProduct} >DELETE PRODUCT</button>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct

