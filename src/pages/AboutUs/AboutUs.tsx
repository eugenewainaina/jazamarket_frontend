import React from 'react';
import { useSEO } from '../../hooks/useSEO';
import MainLayout from '../MainLayout';
import './AboutUs.css';

const AboutUs: React.FC = () => {
  useSEO({
    customTitle: 'About Us - JazaMarket',
    customDescription: 'Learn about JazaMarket, Kenya\'s premier online marketplace connecting buyers and sellers across the country.',
    ogUrl: window.location.href,
  });

  return (
    <MainLayout>
      <div className="about-us-page">
        <div className="container">
          <h1>About JazaMarket</h1>
          
          <section className="hero-section">
            <h2>Instant Deals, Endless Possibilities!</h2>
            <p>
              JazaMarket is Kenya's leading online marketplace that connects millions of buyers and sellers 
              across the country. We provide a safe, convenient, and efficient platform for people to buy 
              and sell anything from electronics and vehicles to real estate and services.
            </p>
          </section>

          <section className="mission-section">
            <h2>Our Mission</h2>
            <p>
              To revolutionize the way Kenyans buy and sell by providing an accessible, secure, and 
              user-friendly platform that empowers individuals and businesses to connect and trade 
              with confidence.
            </p>
          </section>

          <section className="vision-section">
            <h2>Our Vision</h2>
            <p>
              To become the most trusted and preferred online marketplace in Kenya, fostering economic 
              growth and creating opportunities for all Kenyans to participate in the digital economy.
            </p>
          </section>

          <section className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Trust & Safety</h3>
                <p>We prioritize the safety and security of our users through robust verification processes and safety guidelines.</p>
              </div>
              <div className="value-item">
                <h3>Innovation</h3>
                <p>We continuously improve our platform with cutting-edge technology to enhance user experience.</p>
              </div>
              <div className="value-item">
                <h3>Community</h3>
                <p>We foster a vibrant community of buyers and sellers across Kenya, supporting local businesses and entrepreneurs.</p>
              </div>
              <div className="value-item">
                <h3>Accessibility</h3>
                <p>We make online trading accessible to everyone, regardless of their technical expertise or location.</p>
              </div>
            </div>
          </section>

          <section className="story-section">
            <h2>Our Story</h2>
            <p>
              Founded in 2024, JazaMarket was born from the vision of making online trading simple, 
              safe, and accessible for all Kenyans. Starting as a small team with big dreams, we've 
              grown to become one of Kenya's most trusted online marketplaces.
            </p>
            <p>
              Today, thousands of users rely on JazaMarket to buy and sell items ranging from everyday 
              household goods to vehicles, real estate, and professional services. Our platform has 
              facilitated countless successful transactions, helping people across Kenya connect and trade.
            </p>
          </section>

          <section className="team-section">
            <h2>Why Choose JazaMarket?</h2>
            <ul>
              <li><strong>Wide Range of Categories:</strong> From electronics to real estate, find everything you need in one place</li>
              <li><strong>Safe Trading:</strong> Our safety tips and verification processes ensure secure transactions</li>
              <li><strong>Easy to Use:</strong> User-friendly interface designed for everyone</li>
              <li><strong>Local Focus:</strong> Built specifically for the Kenyan market with local payment options</li>
              <li><strong>24/7 Support:</strong> Our customer support team is always ready to help</li>
              <li><strong>Mobile Optimized:</strong> Trade on the go with our mobile-friendly platform</li>
            </ul>
          </section>

          <section className="contact-cta">
            <h2>Get in Touch</h2>
            <p>
              Have questions or suggestions? We'd love to hear from you! Contact our support team 
              at support@jazamarket.com or call us at +254 750 922 133.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
