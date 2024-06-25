import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'


const PageNotFound = () => {
    return (
        <Layout title="Page not found - Ecommerce"
            description="page not found for the ecommerce app"
            keywords="user, profile, ecommerce, products" >
            <div className=''>
                <div className='privacy '>

                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <div className='btn '>
                        <Link to="/">Back</Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PageNotFound
