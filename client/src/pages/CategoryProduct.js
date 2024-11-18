
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CategoryProuctStyles.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3 category-container">
  <h4 className="text-center category-title">Category - {category?.name}</h4>
  <h6 className="text-center category-result">{products?.length} result found</h6>
  <div className="row12 category-row">
    <div className="col-md-9 offset-1 category-col">
      <div className="d-flex flex-wrap category-cards">
        {products?.map((p) => (
          <div
            className="card m-2 category-card"
            style={{ width: "18rem" }}
            key={p._id}
          >
            <img
              src={`/api/v1/product/product-photo/${p._id}`}
              className="card-img-top category-img"
              alt={p.name}
            />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">
                {p.description.substring(0, 30)}...
              </p>
              <p className="card-text"> $ {p.price}</p>
              <button
                className="btn btn-primary ms-1 details-btn"
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                More Details
              </button>
              <button
                className="btn btn-secondary ms-1 add-to-cart-btn"
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
  </div>
</div>

    </Layout>
  );
};

export default CategoryProduct;
