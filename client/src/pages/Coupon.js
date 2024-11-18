
import { Link } from 'react-router-dom'; 
import posterImage from './assets/poster.png'; 
import couponImage from './assets/coupon.png'; 
import './Coupon.css'; 

const PosterCouponSection = () => {
    return (
        <div className="posterCouponSection">
            <div className="posterContainer">
            <Link to="/categories">
                <img src={posterImage} alt="Poster" className="posterImage" />
            </Link>
            </div>
            <div className="couponContainer">
                <Link to="/cart"> 
                    <img src={couponImage} alt="Coupon" className="couponImage" />
                </Link>
            </div>
        </div>
    );
};
export default PosterCouponSection;

