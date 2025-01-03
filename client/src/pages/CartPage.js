
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "./CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState({ type: '', value: 0 });  
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });

      if (couponApplied && discount.value) {
        if (discount.type === 'percentage') {
          total = total - (total * discount.value) / 100;
        } else if (discount.type === 'fixed') {
          total = total - discount.value;
        }
      }

      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      const index = myCart.findIndex((item) => item._id === pid);
      if (index > -1) {
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
        toast.success("Item removed from cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyCoupon = async () => {
    try {
      const { data } = await axios.get(`/api/v1/coupon/apply/${couponCode}`);
      if (data.success) {
        const { discount_type, discount_value } = data.coupon;
        setDiscount({ type: discount_type, value: discount_value });
        setCouponApplied(true);
        setCouponError("");
        toast.success(`Coupon applied! ${discount_value}${discount_type === 'percentage' ? '%' : ''} discount`);
      } else {
        setCouponError(data.error);
        toast.error(data.error);
      }
    } catch (error) {
      setCouponError("Failed to apply coupon. Please try again.");
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row" style={{}}>
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout!"}`
                  : "Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-7 p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height="130px"
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price: {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>

              {/* Apply Coupon */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="form-controll"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={applyCoupon}
                  disabled={!couponCode}
                >
                  Apply Coupon
                </button>
                {couponError && <p className="text-danger">{couponError}</p>}
              </div>

              {auth?.user?.address ? (
                              <div className="mb-3">
                                <h4>Current Address</h4>
                                <h5>{auth?.user?.address}</h5>
                                <button
                                  className="btn btn-outline-warning"
                                  onClick={() => navigate("/dashboard/user/profile")}
                                >
                                  Update Address
                                </button>
                              </div>
                            ) : (
                              <div className="mb-3">
                                <h4>Please Update Your Address</h4>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => navigate("/dashboard/user/profile")}
                                >
                                  Update Address
                                </button>
                              </div>
                            )}

              <div className="mb-3">
                <h4>Complete Your Payment</h4>
                {clientToken && cart.length > 0 && (
                  <DropIn
                    options={{ authorization: clientToken }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                )}
                <button
                  className="btn btn-success"
                  onClick={handlePayment}
                  disabled={!instance || loading}
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;