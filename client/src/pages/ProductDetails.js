import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth"; 
import Review from "./user/Review"; 

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false); 
  const [reviews, setReviews] = useState([]); 
  const [auth] = useAuth(); 

  
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);


  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      if (data?.product) {
        setProduct(data.product);
        fetchProductReviews(data.product._id); 
        getSimilarProduct(data.product._id, data.product.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const fetchProductReviews = async (productId) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${productId}/getreviews`);
      setReviews(data?.reviews || []); 
    } catch (error) {

    }
  };
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-2 con1">
      <h1 className="text-center">Product Details</h1>
        <div className="col-md-6 con2">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top photo"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 con3">
          <h6>Name: {product?.name || "N/A"}</h6>
          <h6>Description: {product?.description || "N/A"}</h6>
          <h6>Price: {product?.price || "N/A"}</h6>
          <h6>Category: {product?.category?.name || "N/A"}</h6>
          <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    if (product) {
                      setCart([...cart, product]);
                      localStorage.setItem("cart", JSON.stringify([...cart, product]));
                      toast.success("Item Added to cart");
                    }
                  }}
                >
                  ADD TO CART
          </button>
          {auth?.user ? (
            <>
              <button
                className="btn btn-secondary ms-1"
                onClick={() => setShowReviewForm(true)}
              >
                Submit a Review
              </button>
              {showReviewForm && (
                <Review
                  productId={product?._id}
                  onClose={() => setShowReviewForm(false)} 
                />
              )}
            </>
          ) : (
            <button
              className="btn btn-secondary ms-1"
              onClick={() =>
                toast.error("You must be logged in to submit a review.")
              }
            >
              Submit a Review
            </button>
          )}
        </div>
      </div>

      <hr />
      <div>
        <h3>Product Reviews</h3>
        {reviews?.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review-card more-card">
              <p>Rating: {review.rating}/5</p>
              <p>{review.comment}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No reviews available for this product</p>
        )}
      </div>

      <hr />
      <h3 className="similar">Similar Products</h3>
      <div className="row container cont1">
        {relatedProducts?.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap cont2">
          {relatedProducts?.map((p) => (
            <div className="card m-2 cont3" style={{ width: "18rem" }} key={p?._id}>
              <img
                src={p?._id ? `/api/v1/product/product-photo/${p._id}` : ""}
                className="card-img-top"
                alt={p?.name || "Product Image"}
              />
              <div className="card-body">
                <h5 className="card-title">{p?.name || "N/A"}</h5>
                <p className="card-text">{p?.description?.substring(0, 30) || "N/A"}...</p>
                <p className="card-text"> $ {p?.price || "N/A"}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p?.slug}`)}
                >
                  More Details
                </button>
                <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
