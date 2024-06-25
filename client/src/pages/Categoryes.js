import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';

const Categoryes = () => {
    const categorys = useCategory();
    return (
        <Layout title="Category - Ecommerce"
            description="all category for the ecommerce app"
            keywords="category, user, ecommerce, products">
            <div className='container-fluid row'>
                <h3 className='text-center bg-danger-subtle mb-2 products-heading p-2'>All Categoryes</h3>
                <div className='category-links'>


                    <ul>
                        {categorys?.map((c) => (
                            <div className='d' key={c._id}>
                                <Link key={c._id} to={`/categorye/${c.slug}`}>{c.name}</Link>

                            </div>
                        ))}
                    </ul>

                </div>
            </div>
        </Layout>
    )
}

export default Categoryes
