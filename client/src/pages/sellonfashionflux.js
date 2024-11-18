import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import './faq.css';

const SellOnFashionFluxFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    
    const faqs = [
        {
            question: "How do I become a seller on Fashion Flux?",
            answer: "You can sign up to become a seller by visiting the 'Sell on Fashion Flux' section and filling out the registration form."
        },
        {
            question: "What are the fees for selling?",
            answer: "We charge a commission on each sale, which varies based on the product category. Additional fees may apply for promotions."
        },
        {
            question: "How do I manage my inventory?",
            answer: "Once registered, you can manage your inventory through the seller dashboard, which allows you to add, edit, and remove products."
        }
    ];

    return (
        <Layout>
            <div className="faq-container">
                <h2>Sell On Fashion Flux FAQs</h2>
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

export default SellOnFashionFluxFAQ;
