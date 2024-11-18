import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import ImageM from './assets/m.png'; 
import ImageW1 from './assets/w1.png'; 
import ImageW from './assets/w.png'; 
import ImageG from './assets/g.png'; 
import ImageC from './assets/c.png'; 
import ImageF from './assets/f.png';
import "./CategoryProuctStyles.css";

const Categories = () => {
  const categories = useCategory();

  const categoryImages = [ImageW, ImageM, ImageC, ImageF, ImageW1, ImageG];

  return (
    <Layout title={"All Categories"}>
      <div className="container container1" style={{ alignItems: "center" }}>
        <div className="row" style={{ alignItems: "center" }} >
          {categories.map((c, index) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3 X1" key={c._id}>
                <Link to={`/category/${c.slug}`} className="btn btn-primary11">
                  <div className="category-section" style={{ backgroundColor: "transparent" }}>
                    <div className="category-image">
                      <img 
                        src={categoryImages[index % categoryImages.length]} // Cycle through the images array
                        alt={`${c.name} Collection`} 
                        className={`image-${c.slug}`} 
                      />
                    </div>
                    <div className="category-name">{c.name}</div>
                  </div>
                </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
