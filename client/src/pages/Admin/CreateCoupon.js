import React, { useState } from 'react';
import axios from 'axios';

const CreateCoupon = () => {
    const [formData, setFormData] = useState({
        code: '',
        discount_value: '',
        discount_type: 'percentage',
        expiration_date: '',
        minimum_order_amount: '',
        status: 'active',
        usage_limit: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/coupon/create-coupon', formData);
            alert(`Coupon created successfully: ${response.data.coupon.code}`);
            // Reset form
            setFormData({
                code: '',
                discount_value: '',
                discount_type: 'percentage',
                expiration_date: '',
                minimum_order_amount: '',
                status: 'active',
                usage_limit: '',
            });
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert('Error: Unable to create coupon');
            }
        }
    };

    return (
        <div>
            <h2>Create Coupon</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Coupon Code:</label>
                    <input type="text" name="code" value={formData.code} onChange={handleChange} required />
                </div>
                <div>
                    <label>Discount Value:</label>
                    <input type="number" name="discount_value" value={formData.discount_value} onChange={handleChange} required />
                </div>
                <div>
                    <label>Discount Type:</label>
                    <select name="discount_type" value={formData.discount_type} onChange={handleChange} required>
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                    </select>
                </div>
                <div>
                    <label>Expiration Date:</label>
                    <input type="date" name="expiration_date" value={formData.expiration_date} onChange={handleChange} required />
                </div>
                <div>
                    <label>Minimum Order Amount:</label>
                    <input type="number" name="minimum_order_amount" value={formData.minimum_order_amount} onChange={handleChange} required />
                </div>
                <div>
                    <label>Status:</label>
                    <select name="status" value={formData.status} onChange={handleChange} required>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <div>
                    <label>Usage Limit:</label>
                    <input type="number" name="usage_limit" value={formData.usage_limit} onChange={handleChange} required />
                </div>
                <button type="submit">Create Coupon</button>
            </form>
        </div>
    );
};

export default CreateCoupon;
