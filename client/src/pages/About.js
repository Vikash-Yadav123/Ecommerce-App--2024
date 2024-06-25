import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
    return (
        <Layout title=" About Page" description=" about page Welcome to  ecommerce app" keywords="about,ecommerce,shop,online,products" excludeFromSEO={true}>
            <div className='container-fluid'>
                <div className='row about'>
                    <div className='col-md-6 div-1'>
                        <img
                            src="images/about.jpeg"
                            class="img-fluid rounded-top"
                            alt="about jpg"
                        />

                    </div>
                    <div className='col-md-5 div-2'>
                        <h3>About us</h3>
                        <p>Lorem ipsum is placeholder text used in the graphic, print, and publishing industries for previewing layouts and visual mockups Lorem ipsum is placeholder text used in the graphic, print, and publishing industries for previewing layouts and visual mockups. It mimics the look of readable content to help designers visualize how a page will appear when the actual text is includeipsum is placeholder text used in the grap. It mimics the look of readable content to help designers visualize how a page will appear when the actual text is includeipsum is placeholder text used in the grap</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default About
