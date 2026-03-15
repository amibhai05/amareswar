import React, { useState } from 'react';
import { send } from '@emailjs/browser';
import './Contact.css';

const SERVICE_ID = 'service_23';
const TEMPLATE_ID = 'template_7t4sbyj';
const PUBLIC_KEY = 'n9tGlkTmbi8AlDYJt';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage('Sending...');

    const templateParams = {
      from_name: formData.name,
      user_name: formData.name,
      sender_name: formData.name,
      from_email: formData.email,
      user_email: formData.email,
      sender_email: formData.email,
      reply_to: formData.email,
      message: formData.message,
      user_message: formData.message,
      contact_message: formData.message,
      // Provide a fallback if message is empty
      message_fallback: formData.message || 'No message provided',
      subject: 'New message from portfolio site'
    };

    console.log('Sending EmailJS payload:', templateParams);

    send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        const errorMsg =
          error?.text ||
          error?.statusText ||
          'Failed to send message. Please check your EmailJS template and service settings.';
        setStatusMessage(`Error: ${errorMsg}`);
      });
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <h2 className="section-title">Let's Work Together</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <a href="mailto:nayakamareswar3@gmail.com">nayakamareswar3@gmail.com</a>
            </div>
            <div className="contact-item">
              <h3>LinkedIn</h3>
              <a href="https://www.linkedin.com/in/amareswar-nayak-2b41b5301" target="_blank" rel="noopener noreferrer">
                Amareswar Nayak
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-primary">Send</button>
            {statusMessage && <p className="form-status">{statusMessage}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;