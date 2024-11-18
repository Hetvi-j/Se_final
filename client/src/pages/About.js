import React from 'react';
import Layout from "../components/Layout/Layout";
import './about.css';

const AboutUs = () => {
  return (
    <Layout>
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        Welcome to Fashion Flux! We are an online fashion destination, bringing you the latest trends and timeless pieces. Our mission is to make fashion accessible to everyone, offering a variety of styles that cater to every taste and occasion.
      </p>
      <p>
        We aim to provide high-quality fashion items at affordable prices. We work closely with designers and brands to ensure that we offer the latest collections while maintaining top-notch customer service.
      </p>
      <p>
        Our team is passionate about fashion and dedicated to making your shopping experience as enjoyable and seamless as possible. We hope you find exactly what you are looking for, and if you need any assistance, our customer support team is here to help!
      </p>
    </div>
    </Layout>
  );
};

export default AboutUs;
