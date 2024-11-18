import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import './faq.css';

const OtherFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I contact customer support?",
            answer: "You can reach our support team via the 'Contact Us' page or by emailing support@fashionflux.com."
        },
        {
            question: "Where is Fashion Flux located?",
            answer: "Fashion Flux is headquartered in New York, USA, with offices in London and Tokyo."
        },
        {
            question: "Can I give feedback about my shopping experience?",
            answer: "Yes, we value customer feedback. You can leave feedback through the 'Feedback' section on your account dashboard."
        }
    ];

    return (
        <Layout>
            <div className="faq-container">
                <h2>Other FAQs</h2>
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

export default OtherFAQ;
