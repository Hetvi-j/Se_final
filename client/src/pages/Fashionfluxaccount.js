import React, { useState } from 'react';
import Layout from "../components/Layout/Layout";
import './faq.css';

const FashionFluxAccountFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I reset my password?",
            answer: "You can reset your password by clicking 'Forgot Password' on the login page and following the instructions."
        },
        {
            question: "How do I update my profile information?",
            answer: "Log in to your Fashion Flux account and navigate to 'Account Settings' to update your profile information."
        },
        {
            question: "Can I delete my account?",
            answer: "Yes, you can request account deletion by contacting customer support. Note that this action is irreversible."
        }
    ];

    return (
        <Layout>
            <div className="faq-container">
                <h2>Fashion Flux Account FAQs</h2>
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

export default FashionFluxAccountFAQ;
