import React, { useState, useRef } from 'react';
import Layout from "../components/Layout/Layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './policy.css';

const Contact = () => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const policyRef = useRef(null);

  const handleScroll = () => {
    const element = policyRef.current;
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 1) {
      setIsScrolledToBottom(true);
    } else {
      setIsScrolledToBottom(false);
    }
  };

  const handleAgree = () => {
    if (isScrolledToBottom) {
      toast.success('You agreed to the privacy policy.');
    } else {
      toast.error('Please scroll to the bottom to read the full policy before agreeing.');
    }
  };

  const handleCancel = () => {
    toast.info('You have canceled.');
  };

  return (
    <Layout>
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <div className="privacy-content" ref={policyRef} onScroll={handleScroll}>
        <p>Welcome to FASHION FLUX! We are committed to protecting your privacy.</p>
        <p>This policy explains how we collect, use, and safeguard your information.</p>
        <p>We collect personal information such as your name, email, and payment details when you make a purchase or create an account.</p>
        <p>We also collect data through cookies to improve your experience on our site.</p>
        <p>Your information will be used solely for processing your orders and improving our services.</p>
        <p>We do not share your information with third parties without your consent.</p>
        <p>If you have any concerns, please reach out to our support team.</p>
      </div>
      {isScrolledToBottom && (
        <p className="scroll-warning">
          You've reached the end. You can now agree to the privacy policy.
        </p>
      )}
      <div className="privacy-buttons">
        <button
          className={`agree-btn ${isScrolledToBottom ? '' : 'disabled-btn'}`}
          onClick={handleAgree}
        >
          ✔ I Agree
        </button>
        <button className="cancel-btn" onClick={handleCancel}>✖ Cancel</button>
      </div>
      {/* Center the ToastContainer by setting the position to "top-center" */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
    </Layout>
  );
};

export default Contact;
