import React, { useState } from 'react';
import Layout from "../components/Layout/Layout";
import './faq.css';

const OrderRelatedFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "How can I track my order?",
            answer: "You can track your order by logging into your Fashion Flux account and visiting the 'Orders' section."
        },
        {
            question: "What should I do if I receive a damaged item?",
            answer: "Contact customer support with your order details, and we will assist you with the return or replacement process."
        },
        {
            question: "Can I change or cancel my order?",
            answer: "Orders can be modified or cancelled within 2 hours of placing them. Please contact support."
        }
    ];

    return (
        <Layout>
            <div className="faq-container">
                <h2>Order Related FAQs</h2>
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

export default OrderRelatedFAQ;

