import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimpleSlider = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div style={{ overflow: 'hidden', width: '100%' }}>
            <Slider {...settings}>
                <div>
                    <img src="images/banner_mens.png" alt="mens" style={{ width: '100%' }} />
                </div>
                <div>
                    <img src="images/banner_kids.png" alt="kids" style={{ width: '100%' }} />
                </div>
                <div>
                    <img src="images/banner_women.png" alt="women" style={{ width: '100%' }} />
                </div>
            </Slider>
        </div>
    );
}

export default SimpleSlider;
