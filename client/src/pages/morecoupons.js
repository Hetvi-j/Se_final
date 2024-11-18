
import React from 'react';
import Image1 from './assets/Group 20.png'; 
import Image2 from './assets/Group 21.png'; 
import './moreCoupon.css'; 
import { Link } from 'react-router-dom'; 


const moreCouponSection = () => {
    return (
        <div className="CouponSection">
            <div className="image1Container">
            <Link to="/cart">
                <img src={Image1} alt="Poster" className="Image1" />
            </Link>
            </div>
            <div className="image2Container">
            <Link to="/cart"> 
                <img src={Image2} alt="Coupon" className="Image2" />
            </Link>
            </div>
        </div>
    );
};

export default moreCouponSection;
