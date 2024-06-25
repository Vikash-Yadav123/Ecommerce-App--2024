import React from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className='footer container-fluid'>
            <div className='row '>
                <div className='col-md-3 '>
                    <h4>Links</h4>
                    <ul>
                        <li><Link to="/policy">Policy</Link></li>

                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className=' col-md-3'>
                    <h4>Help</h4>
                    <ul>
                        <li><Link to="#">Payment</Link></li>

                        <li><Link to="#">Shipping</Link></li>
                        <li><Link to="#">Cancellation & Return</Link></li>
                        <li><Link to="#">F&Q</Link></li>

                    </ul>
                </div>
                <div className='col-md-3'>
                    <h4>consumer policy</h4>
                    <ul>
                        <li><Link to="#">Privacy</Link></li>

                        <li><Link to="#">Term of Use</Link></li>
                        <li><Link to="#">Cancellation & Return</Link></li>
                        <li><Link to="#">Security</Link></li>
                        <li><Link to="#">Sitemap</Link></li>

                    </ul>
                </div>
                <div className=' col-md-3'>
                    <h4>Have a Question</h4>
                    <ul>
                        <p><FaEnvelope className='icon' />royvikash056@gmail.com</p>
                        <p><FaPhoneAlt className='icon' />8252295449</p>
                        <div className='social-icons d-flex gap-4'>
                            <Link to="https://www.facebook.com/VikashYadav00327" target="_blank"><FaFacebook /></Link>
                            <Link to="https://www.instagram.com/vikashyadav00327/" target="_blank"><FaSquareInstagram /></Link>
                            <Link to="https://www.linkedin.com/in/vikash-kumar-b18776289/" target="_blank"><FaLinkedin /></Link>
                        </div>

                    </ul>
                </div>
            </div>
            <p className='copy-rigth'>Vikash ecommerce &copy; All right reserved.</p>
        </div>
    )
}

export default Footer
