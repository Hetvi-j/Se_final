import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import "../update.css"

const CouponUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { id } = location.state || {}; 
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [minOrderValue, setMinOrderValue] = useState('');
  const [usageLimit, setUsageLimit] = useState('');
  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (id) {
      fetchCouponById(id); 
    } else {
      toast.error('Coupon ID is missing'); 
      navigate('/dashboard/admin/coupons'); 
    }
  }, [id]);

  const fetchCouponById = async (couponId) => {
    try {
      const { data } = await axios.get(`/api/v1/coupon/${couponId}`); 
      if (data.success) {
        const { code, discount_type, discount_value, expiration_date, min_order_value, usage_limit, status } = data.coupon;
        setCode(code);
        setDiscountType(discount_type);
        setDiscountValue(discount_value);
        setExpirationDate(expiration_date);
        setMinOrderValue(min_order_value);
        setUsageLimit(usage_limit);
        setStatus(status);
      } else {
        toast.error(data.message || 'Failed to fetch coupon');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while fetching the coupon');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedCouponData = {
      code,
      discount_type: discountType,
      discount_value: Number(discountValue), 
      expiration_date: expirationDate,
      min_order_value: Number(minOrderValue), 
      usage_limit: Number(usageLimit), 
      status,
    };

    try {
    
      const { data } = await axios.put(`/api/v1/coupon/${id}`, updatedCouponData);
      if (data.success) {
        toast.success('Coupon updated successfully');
        navigate('/dashboard/admin/coupon'); 
      } else {
        toast.error(data.message || 'Failed to update coupon');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while updating the coupon');
    }
  };

  return (
    <Layout title={"Dashboard - Update Coupon"}>
      <Toaster />
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 con11">
            <h1>Update Coupon</h1>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Coupon Code"
                required
              />
              <select value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder="Discount Value"
                required
              />
              <input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                required
              />
              <input
                type="number"
                value={minOrderValue}
                onChange={(e) => setMinOrderValue(e.target.value)}
                placeholder="Minimum Order Value"
                required
              />
              <input
                type="number"
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
                placeholder="Usage Limit"
                required
              />
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button type="submit">Update Coupon</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CouponUpdate;
