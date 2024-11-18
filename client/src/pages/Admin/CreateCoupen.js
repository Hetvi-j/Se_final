import React, { useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import "../createCoupen.css";
const { Option } = Select;

const CreateCoupon = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [status, setStatus] = useState("active");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const couponData = {
        code,
        discount_type: discountType,
        discount_value: discountValue,
        expiration_date: expirationDate,
        min_order_value: minOrderValue,
        usage_limit: usageLimit,
        status,
      };

      const { data } = await axios.post("/api/v1/coupon", couponData);
          console.log(data); 

      if (data?.success) {
        toast.success("Coupon Created Successfully", {
          duration: 6000, 
          position: "top-right", 
        });
        navigate("/dashboard/admin/coupon"); 
      } else {
        toast.error(data?.message || "Failed to create coupon");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating the coupon");
    }
  };

  return (
    <Layout title={"Dashboard - Create Coupon"}>
      <Toaster />
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 con21">
            <h1>Create Coupon</h1>
            <div className="m-1 w-75 con22">
              <div className="mb-3 con23">
                <input
                  type="text"
                  value={code}
                  placeholder="Coupon Code"
                  className="form-control"
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 con23">
                <Select
                  bordered={false}
                  placeholder="Select Discount Type"
                  size="large"
                  className="form-select mb-3"
                  onChange={(value) => setDiscountType(value)}
                  value={discountType}
                >
                  <Option value="percentage">Percentage</Option>
                  <Option value="fixed">Fixed Amount</Option>
                </Select>
              </div>

              <div className="mb-3 con23">
                <input
                  type="number"
                  value={discountValue}
                  placeholder="Discount Value"
                  className="form-control"
                  onChange={(e) => setDiscountValue(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 con23">
                <input
                  type="date"
                  value={expirationDate}
                  className="form-control"
                  onChange={(e) => setExpirationDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 con23">
                <input
                  type="number"
                  value={minOrderValue}
                  placeholder="Minimum Order Value"
                  className="form-control"
                  onChange={(e) => setMinOrderValue(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 con23">
                <input
                  type="number"
                  value={usageLimit}
                  placeholder="Usage Limit"
                  className="form-control"
                  onChange={(e) => setUsageLimit(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 con23">
                <Select
                  bordered={false}
                  placeholder="Select Status"
                  size="large"
                  className="form-select mb-3"
                  onChange={(value) => setStatus(value)}
                  value={status}
                >
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </div>

              <div className="mb-3 con23">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE COUPON
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCoupon;
