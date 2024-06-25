import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Modal } from 'antd';
import CategoryForm from '../../components/form/CategoryForm'
const CreateCategory = () => {
    const [categorys, setCategorys] = useState([]);
    const [visible, setVisible] = useState(false);
    const [update, setUpdate] = useState('');
    const [name, setName] = useState('');
    const [id, setId] = useState('');


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

    // UPDATE CATEGORY
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${id}`, { name: update });
            console.log(data);
            if (data?.success) {
                setVisible(false);
                setUpdate('');
                toast.success('Successfully Update Category');
                getAllCategorys();
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // CREATE CATEGORY
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name });
            if (data?.success) {
                toast.success('Sucessfully Create Category');
                setName('');
                getAllCategorys();
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }

    // DELETE CATEGORY
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`);
            if (data?.success) {
                toast.success('Successfully Delete Category');
                getAllCategorys();
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error');
        }
    }

    return (
        <Layout title="Create Category - Ecommerce"
            description="Create and manage categories for the ecommerce app"
            keywords="admin, dashboard, ecommerce, categories"
        >
            <div className='container-fluid  mt-4'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 mt-2  mt-2  ps-4'>
                        <h3 className='text-center'> Category</h3>
                        <div className='w-75 mt-4'>
                            <div className='w-50 mt-2 mb-4'>
                                <h5>Create Category</h5>
                                <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
                            </div>
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Operation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorys?.map((c) => (

                                        <>
                                            <tr key={c._id}>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button type="button" className="btn btn-primary ms-2" onClick={() => { setVisible(true); setId(c._id); setUpdate(c.name) }}>Edit</button>
                                                    <button type="button" className="btn btn-danger ms-2" onClick={() => handleDelete(c._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}


                                </tbody>
                            </table>

                        </div>

                    </div>
                </div>
                <Modal open={visible} onCancel={() => setVisible(false)} footer={null}>
                    <CategoryForm value={update} setValue={setUpdate} handleSubmit={handleUpdate} />
                </Modal>
            </div>

        </Layout>
    )
}

export default CreateCategory;
