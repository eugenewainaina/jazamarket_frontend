import React, { useState } from 'react';
import { useSEO } from '../../hooks/useSEO';
import MainLayout from '../MainLayout';
import { FaHome, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import './ContactUs.css';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useSEO({
    customTitle: 'Contact Us - JazaMarket',
    customDescription: 'Get in touch with JazaMarket. We\'re here to help with any questions about buying and selling on Kenya\'s leading marketplace.',
    ogUrl: window.location.href,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would typically send the form data to your backend
      console.log('Contact form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <MainLayout>
      <div className="contact-us-page">
        <div className="container">
          <h1>Contact Us</h1>
          <p className="intro-text">
            We'd love to hear from you! Whether you have questions, feedback, or need support, 
            our team is here to help you make the most of your JazaMarket experience.
          </p>
          
          <div className="contact-content">
            <div className="contact-info-section">
              <h2>Get in Touch</h2>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-details">
                    <h3>Visit Us</h3>
                    <p>Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <FaPhone />
                  </div>
                  <div className="contact-details">
                    <h3>Call Us</h3>
                    <p>+254 750 922 133</p>
                    <small>Monday - Friday: 8:00 AM - 6:00 PM</small>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-details">
                    <h3>Email Us</h3>
                    <p>support@jazamarket.com</p>
                    <small>We'll respond within 24 hours</small>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <FaHome />
                  </div>
                  <div className="contact-details">
                    <h3>Website</h3>
                    <p>www.jazamarket.com</p>
                  </div>
                </div>
              </div>

              <div className="social-section">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                  <a href="#" aria-label="Twitter"><FaTwitter /></a>
                  <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <h2>Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="account">Account Issues</option>
                    <option value="payment">Payment & Billing</option>
                    <option value="safety">Safety & Security</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="report">Report a Problem</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Please describe your inquiry in detail..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">Send Message</button>

                {submitStatus === 'success' && (
                  <div className="status-message success">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="status-message error">
                    Sorry, there was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>How do I post an ad?</h3>
                <p>Simply create an account, click "Post Ad" and fill in your item details. It's free and easy!</p>
              </div>
              <div className="faq-item">
                <h3>Is JazaMarket safe to use?</h3>
                <p>Yes! We have safety guidelines and verification processes to ensure secure transactions.</p>
              </div>
              <div className="faq-item">
                <h3>How do I contact a seller?</h3>
                <p>Click on any ad to view seller contact information including phone number and location.</p>
              </div>
              <div className="faq-item">
                <h3>Are there any fees?</h3>
                <p>Basic listings are completely free. Premium features may have associated costs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactUs;
