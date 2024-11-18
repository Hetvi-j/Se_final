import React from 'react';
import Layout from "../components/Layout/Layout";
import ContactUs from "../pages/ContactUs";
import { Link } from 'react-router-dom';
import './contactus.css';

const HelpCenter = () => {
  const categories = [
    { name: 'Order Related', icon: '🛒', link: '/order-related' },
    { name: 'Shopping', icon: '🛍️', link: '/shopping' },
    { name: 'Fashion Flux Account', icon: '👤', link: '/account' },
    { name: 'Payments', icon: '💳', link: '/payments' },
    { name: 'Sell On Fashion Flux', icon: '📈', link: '/sell-on-fashionflux' },
    { name: 'Others', icon: '❓', link: '/others' },
  ];

  return (
    <Layout>
      <div className="help-center-container">
        <div className="help-center-header">
          <h1>Help Center</h1>
         
        </div>

        <div className="help-center-topics">
          <h2>Browse Topics</h2>
          <div className="topics-grid">
            {categories.map((category, index) => (
              <div key={index} className="topic-card">
                <Link to={category.link}>
                  <div className="icon" aria-label={category.name}>{category.icon}</div>
                  <div className="topic-name">{category.name}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="help-center-footer">
          <h3>Other Options</h3>
          <p><Link to="/ContactUs">Write to us</Link></p>
        </div>
      </div>
    </Layout>
  );
};

export default HelpCenter;
