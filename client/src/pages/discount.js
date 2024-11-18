import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplyCoupons = ({ orderTotal, setNewOrderTotal }) => {
    const [couponCode, setCouponCode] = useState('');
    const [couponCodes, setCouponCodes] = useState([]);
    const [appliedCoupons, setAppliedCoupons] = useState([]);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [newTotal, setNewTotal] = useState(orderTotal);
    const [messages, setMessages] = useState([]);
    const [availableCoupons, setAvailableCoupons] = useState([]);

    useEffect(() => {
        
        axios.get('/api/coupons/active')
            .then(response => {
                setAvailableCoupons(response.data);
            })
            .catch(error => console.error('Error fetching coupons:', error));
    }, []);

    
    useEffect(() => {
        setNewTotal(orderTotal);
    }, [orderTotal]);

    const addCouponCode = () => {
        if (couponCode && !couponCodes.includes(couponCode)) {
            setCouponCodes([...couponCodes, couponCode]);
            setCouponCode(''); 
        }
    };

    const applyCoupons = () => {
        let totalDiscountAmount = 0;
        let updatedTotal = orderTotal;
        const appliedCouponsList = [];
        const errorMessages = [];

        for (const code of couponCodes) {
            const coupon = availableCoupons.find(c => c.code.toLowerCase() === code.toLowerCase() && c.status === 'active');

            if (!coupon) {
                errorMessages.push(`Coupon "${code}" is invalid or inactive.`);
                continue;
            }

            if (new Date() > new Date(coupon.expiration_date)) {
                errorMessages.push(`Coupon "${code}" has expired.`);
                continue;
            }

            if (updatedTotal < coupon.minimum_order_amount) {
                errorMessages.push(`Order must be at least $${coupon.minimum_order_amount} to use coupon "${code}".`);
                continue;
            }

            if (coupon.used_count >= coupon.usage_limit) {
                errorMessages.push(`Coupon "${code}" has reached its usage limit.`);
                continue;
            }

            let discountAmount = coupon.discount_type === 'percentage'
                ? (coupon.discount_value / 100) * updatedTotal
                : coupon.discount_value;

            discountAmount = Math.min(discountAmount, updatedTotal);
            updatedTotal -= discountAmount;
            totalDiscountAmount += discountAmount;

            appliedCouponsList.push({
                code: coupon.code,
                discountAmount,
            });
        }

        if (errorMessages.length > 0) {
            setMessages(errorMessages);
        } else {
            setMessages(['Coupons applied successfully!']);

            setAppliedCoupons(appliedCouponsList);
            setTotalDiscount(totalDiscountAmount);
            setNewTotal(updatedTotal);
            setNewOrderTotal(updatedTotal); 
        }
    };

    return (
        <div>
            <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
            />
            <button onClick={addCouponCode}>Add Coupon</button>
            <button onClick={applyCoupons}>Apply Coupons</button>
            {messages.length > 0 && messages.map((msg, index) => <p key={index}>{msg}</p>)}
            <p>Coupons to Apply: {couponCodes.join(', ')}</p>
            {totalDiscount > 0 && (
                <>
                    <p>Total Discount: ${totalDiscount.toFixed(2)}</p>
                    <p>New Total: ${newTotal.toFixed(2)}</p>
                    <h4>Applied Coupons:</h4>
                    <ul>
                        {appliedCoupons.map((coupon, index) => (
                            <li key={index}>
                                {coupon.code}: ${coupon.discountAmount.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ApplyCoupons;
