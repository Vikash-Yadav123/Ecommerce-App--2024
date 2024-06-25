import React from 'react'
import Layout from '../components/Layout/Layout'

const PrivacyPolicy = () => {
    return (
        <Layout title=" Privacy Policy Page" description="Welcome to  ecommerce app" keywords="ecommerce,shop,online,products">
            <div className='container-fluid'>
                <div className='row contact'>
                    <div className='col-md-6 div-1 pt-4 mt-4'>
                        <img
                            src="images/contactus.jpeg"
                            class="img-fluid rounded-top"
                            alt="about jpg"
                        />

                    </div>
                    <div className='col-md-5 div-2'>
                        <p className='mb-2'>Add Privacy</p>
                        <p className='mb-2'>Add Privacy</p>
                        <p className='mb-2'>Add Privacy</p>
                        <p className='mb-2'>Add Privacy</p>
                        <p className='mb-2'>Add Privacy</p>
                        <p className='mb-2'>Add Privacy</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PrivacyPolicy
