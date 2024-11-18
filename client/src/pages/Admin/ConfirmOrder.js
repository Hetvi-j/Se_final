import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../email.css';
import Layout from "./../../components/Layout/Layout";
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
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
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
        <input type="email" name="user_email" placeholder='abc@gmail.com' className="contact-input" />
        <label>Message</label>
        <textarea name="message" placeholder='Message' className="contact-textarea" />
        <input type="submit" value="Send" className="contact-submit" />
      </form>
    </div>
    </Layout>
 
  );
};
export default ContactUs; 