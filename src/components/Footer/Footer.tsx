import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-column">
          <h4>INFORMATION</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/safety">Safety Tips</Link></li>
            <li><Link to="/intellectual-property">Intellectual Property Rights</Link></li>
            <li><Link to="/faq">Frequently Asked Questions</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>USEFUL LINKS</h4>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/dashboard/my_ads">My Ads</Link></li>
            <li><Link to="/dashboard/profile_settings">My Settings</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/blog">Blog</Link></li>
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
          <div className="footer-logo logo-base">
            <span className="logo-jaza">Jaza</span>
            <span className="logo-market">Market</span>
          </div>
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
