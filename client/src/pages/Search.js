import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom"; 
import { useCart } from "../context/cart"; 
import toast from "react-hot-toast"; 


const Search = () => {
  const [values] = useSearch(); 
  const navigate = useNavigate(); 
  const [cart, setCart] = useCart(); 
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values.results.map((p1) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p1._id}>
                <p className="card-text">

                  </p>
                <img
                  src={p1.id ? `/api/v1/product/product-photo/${p1.id}` : ""}


                  className="card-img-top"
                  alt={p1.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p1.name}</h5>
                  <p className="card-text">
                    {(p1.description && p1.description.substring(0, 30)) || 'No description available...'}
                  </p>
                  <p className="card-text"> $ {p1.price}</p>

                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p1.slug}`)}

                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p1]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p1])
                      );
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
    </Layout>
  );
};

export default Search;
