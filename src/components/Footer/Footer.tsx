import React from 'react';
import { FaHome, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-column">
          <h4>INFORMATION</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Safety Tips</a></li>
            <li><a href="#">Intellectual Property Rights</a></li>
            <li><a href="#">Frequently Asked Questions</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>USEFUL LINKS</h4>
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Myads</a></li>
            <li><a href="#">My Setting</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>CONTACT US</h4>
          <p><FaHome /> JazaMarket.com</p>
          <p><FaMapMarkerAlt /> Nairobi, Kenya</p>
          <p><FaPhone /> +254 750 922 133</p>
          <p><FaEnvelope /> support@jazamarket.com</p>
        </div>
        <div className="footer-column">
            <img src="/Logo.png" alt="JazaMarket" className="footer-logo" />
          <p>Instant Deals, Endless Possibilities!</p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaGooglePlusG /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaYoutube /></a>
          </div>
          <h4>LATEST NEWS</h4>
          <form className="newsletter-form">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>JazaMarket.com © 2025. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
