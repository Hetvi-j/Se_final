import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import './faq.css';

const PaymentsFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, debit cards, and digital wallets such as PayPal and Apple Pay."
        },
        {
            question: "Why was my payment declined?",
            answer: "Ensure that your card details are correct and that your bank has not restricted the transaction. If issues persist, contact your bank."
        },
        {
            question: "Can I get an invoice for my order?",
            answer: "Yes, invoices are sent to your registered email address once your order is confirmed."
        }
    ];

    return (
        <Layout>
            <div className="faq-container">
                <h2>Payments FAQs</h2>
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

export default PaymentsFAQ;
