import React, { useRef } from 'react';
import Layout from "./../components/Layout/Layout";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './email.css';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_3danx9t', 'template_gepfa0u', form.current, {
        publicKey: 'aKJV2kVHAxBnIjmWh',
      })
      .then(
        () => {
          toast.success('Email sent successfully!');
        },
        (error) => {
          toast.error(`Failed to send email: ${error.text}`);
        },
      );
  };

  return (
    <Layout>
      <div className="contact-container">
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <label>Name</label>
          <input type="text" name="user_name" placeholder='Enter Name' className="contact-input" />
          <label>Email</label>
          <input type="email" name="user_email" placeholder='Enter Email' className="contact-input" />
          <label>Message</label>
          <textarea name="message" placeholder='Message' className="contact-textarea" />
          <input type="submit" value="Send" className="contact-submit" />
        </form>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </div>
    </Layout>
  );
};

export default ContactUs;
