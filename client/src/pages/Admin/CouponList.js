import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import "../CouponList.css"

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const { data } = await axios.get('/api/v1/coupon/');
      if (data.success) {
        setCoupons(data.coupons); 
      } else {
        toast.error(data.message || 'Failed to fetch coupons');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while fetching coupons');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await axios.delete(`/api/v1/coupon/${id}`); 
        toast.success('Coupon deleted successfully');
        fetchCoupons(); 
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong while deleting the coupon');
      }
    }
  };
  
  const handleUpdate = (couponId) => {
    navigate('/dashboard/admin/update-coupon', { state: { id: couponId } });
  };

  return (
    <Layout title="Dashboard - Coupons List">
      <Toaster />
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          

          <div className="col-md-9 con31">
            <h1>Coupons List</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Discount Type</th>
                  <th>Discount Value</th>
                  <th>Expiration Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon._id}>
                    <td>{coupon.code}</td>
                    <td>{coupon.discount_type}</td>
                    <td>{coupon.discount_value}</td>
                    <td>{new Date(coupon.expiration_date).toLocaleDateString()}</td>
                    <td>
                    <div className="action-buttons">
                      <button onClick={() => handleUpdate(coupon._id)} className="btn btn-warning warn1">
                        Update
                      </button>
                      <button onClick={() => handleDelete(coupon._id)} className="btn btn-danger dang1">
                        Delete
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CouponList;
