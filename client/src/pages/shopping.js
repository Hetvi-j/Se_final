import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import './faq.css';

const ShoppingFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is your return policy?",
            answer: "You can return items within 30 days of receipt. Ensure the product is in its original condition."
        },
        {
            question: "Can I change my shipping address?",
            answer: "Yes, you can update your shipping address before the order is dispatched by contacting support."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship internationally. Shipping fees and delivery times will vary based on your location."
        }
    ];

    return (
        <Layout>
            <div className="faq-container">
                <h2>Shopping FAQs</h2>
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => toggleFAQ(index)}
                    >
                        <h4 className="faq-question">{faq.question}</h4>
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default ShoppingFAQ;
