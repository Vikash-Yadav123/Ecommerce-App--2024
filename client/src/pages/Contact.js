import React from 'react'
import Layout from '../components/Layout/Layout'
import { MdOutlineMessage } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";

const Contact = () => {
    return (
        <Layout title=" Contact Page-Ecommerce App" description=" contact page Welcome to  ecommerce app" keywords="contact,ecommerce,shop,online,products" excludeFromSEO={true}>
            <div className='container-fluid'>
                <div className='row contact'>
                    <div className='col-md-6 div-1 pt-4 mt-4'>
                        <img
                            src="images/contact.jpeg"
                            class="img-fluid rounded-top"
                            alt="about jpg"
                        />

                    </div>
                    <div className='col-md-5 div-2'>
                        <h1>Contact us</h1>
                        <p className='mb-2'>Any Querry product feel free to call anytime we 24*7 available</p>
                        <p className='mb-2'><MdOutlineMessage />:<span>www.helpp@ecommerce.com</span></p>
                        <p className='mb-2'><BsFillTelephoneFill />:<span>012-3546-5641</span></p>
                        <p className='mb-2'><MdSupportAgent />:<span>01800-0000-0000(toll free)</span></p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact
