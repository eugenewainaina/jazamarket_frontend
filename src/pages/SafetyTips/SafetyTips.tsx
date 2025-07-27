import React from 'react';
import { useSEO } from '../../hooks/useSEO';
import MainLayout from '../MainLayout';
import { FaShieldAlt, FaEye, FaHandshake, FaExclamationTriangle, FaUserCheck, FaLock } from 'react-icons/fa';
import './SafetyTips.css';

const SafetyTips: React.FC = () => {
  useSEO({
    customTitle: 'Safety Tips - JazaMarket',
    customDescription: 'Stay safe while buying and selling on JazaMarket. Learn essential safety tips for secure online transactions in Kenya.',
    ogUrl: window.location.href,
  });

  return (
    <MainLayout>
      <div className="safety-tips-page">
        <div className="container">
          <h1>Safety Tips</h1>
          <p className="intro-text">
            Your safety is our top priority. Follow these essential tips to ensure secure and successful 
            transactions on JazaMarket.
          </p>
          
          <div className="safety-overview">
            <div className="safety-stat">
              <FaShieldAlt className="stat-icon" />
              <h3>Safe Trading</h3>
              <p>Thousands of secure transactions daily</p>
            </div>
            <div className="safety-stat">
              <FaUserCheck className="stat-icon" />
              <h3>Verified Users</h3>
              <p>Growing community of trusted traders</p>
            </div>
            <div className="safety-stat">
              <FaLock className="stat-icon" />
              <h3>Secure Platform</h3>
              <p>Advanced security measures in place</p>
            </div>
          </div>

          <section className="safety-section">
            <h2><FaEye /> General Safety Guidelines</h2>
            <div className="tips-grid">
              <div className="tip-card">
                <h3>Meet in Public Places</h3>
                <p>Always arrange to meet buyers or sellers in well-lit, public locations with good foot traffic. Avoid isolated areas.</p>
              </div>
              <div className="tip-card">
                <h3>Bring a Friend</h3>
                <p>Consider bringing a trusted friend or family member when meeting to exchange items, especially for high-value transactions.</p>
              </div>
              <div className="tip-card">
                <h3>Trust Your Instincts</h3>
                <p>If something feels wrong or too good to be true, trust your gut feeling and walk away from the deal.</p>
              </div>
              <div className="tip-card">
                <h3>Verify Identity</h3>
                <p>Ask for identification and verify the person's identity before completing any transaction.</p>
              </div>
            </div>
          </section>

          <section className="safety-section">
            <h2><FaHandshake /> For Buyers</h2>
            <div className="safety-content">
              <h3>Before You Buy</h3>
              <ul>
                <li>Research the market price of the item you want to buy</li>
                <li>Ask detailed questions about the item's condition</li>
                <li>Request additional photos if needed</li>
                <li>Verify the seller's contact information</li>
                <li>Check the seller's other listings for credibility</li>
              </ul>

              <h3>During the Transaction</h3>
              <ul>
                <li>Inspect the item thoroughly before paying</li>
                <li>Test electronic items to ensure they work properly</li>
                <li>Count your change carefully if paying in cash</li>
                <li>Get a receipt or written agreement for expensive items</li>
                <li>Take photos of the item and transaction if necessary</li>
              </ul>

              <h3>Payment Safety</h3>
              <ul>
                <li>Use secure payment methods when possible</li>
                <li>Avoid sending money before seeing the item</li>
                <li>Be cautious of deals requiring immediate payment</li>
                <li>Keep records of all payment transactions</li>
              </ul>
            </div>
          </section>

          <section className="safety-section">
            <h2><FaUserCheck /> For Sellers</h2>
            <div className="safety-content">
              <h3>Creating Your Listing</h3>
              <ul>
                <li>Use clear, honest descriptions of your items</li>
                <li>Include multiple high-quality photos</li>
                <li>Set realistic and fair prices</li>
                <li>Be transparent about any defects or issues</li>
                <li>Include your preferred contact method</li>
              </ul>

              <h3>Communicating with Buyers</h3>
              <ul>
                <li>Respond promptly to genuine inquiries</li>
                <li>Be clear about your terms and conditions</li>
                <li>Arrange meetings at your convenience</li>
                <li>Don't share personal information unnecessarily</li>
                <li>Keep communication professional and friendly</li>
              </ul>

              <h3>During the Sale</h3>
              <ul>
                <li>Have the exact item ready for inspection</li>
                <li>Be prepared to demonstrate how items work</li>
                <li>Accept secure payment methods</li>
                <li>Provide proof of ownership if requested</li>
                <li>Give the buyer time to inspect the item</li>
              </ul>
            </div>
          </section>

          <section className="safety-section warning-section">
            <h2><FaExclamationTriangle /> Red Flags to Watch For</h2>
            <div className="warning-grid">
              <div className="warning-card">
                <h3>Unrealistic Prices</h3>
                <p>Be suspicious of prices that are significantly below market value - they often indicate scams.</p>
              </div>
              <div className="warning-card">
                <h3>Pressure Tactics</h3>
                <p>Avoid deals where you're pressured to decide immediately or send money quickly.</p>
              </div>
              <div className="warning-card">
                <h3>Poor Communication</h3>
                <p>Be wary of sellers or buyers who avoid phone calls or meeting in person.</p>
              </div>
              <div className="warning-card">
                <h3>Unusual Payment Requests</h3>
                <p>Never send money via wire transfer, gift cards, or other non-traceable payment methods.</p>
              </div>
              <div className="warning-card">
                <h3>Missing Information</h3>
                <p>Be cautious of listings with very few details, no photos, or generic descriptions.</p>
              </div>
              <div className="warning-card">
                <h3>Fake Profiles</h3>
                <p>Watch for accounts with no history, fake photos, or inconsistent information.</p>
              </div>
            </div>
          </section>

          <section className="safety-section">
            <h2>Online Safety Tips</h2>
            <div className="online-safety">
              <div className="safety-item">
                <h3>Protect Your Personal Information</h3>
                <p>Never share sensitive information like passwords, bank details, or ID numbers through messages.</p>
              </div>
              <div className="safety-item">
                <h3>Use JazaMarket Messaging</h3>
                <p>Keep initial communications within our platform for your safety and security.</p>
              </div>
              <div className="safety-item">
                <h3>Report Suspicious Activity</h3>
                <p>If you encounter suspicious users or scams, report them to us immediately.</p>
              </div>
            </div>
          </section>

          <section className="safety-section">
            <h2>Vehicle Purchase Safety</h2>
            <div className="vehicle-safety">
              <ul>
                <li>Always inspect the vehicle thoroughly, preferably with a mechanic</li>
                <li>Verify the vehicle's documentation and ownership</li>
                <li>Check for any liens or legal issues</li>
                <li>Test drive the vehicle before purchasing</li>
                <li>Ensure all paperwork is properly transferred</li>
                <li>Consider getting a vehicle history report</li>
              </ul>
            </div>
          </section>

          <section className="safety-section">
            <h2>Property & Rental Safety</h2>
            <div className="property-safety">
              <ul>
                <li>Visit the property in person before making any payments</li>
                <li>Verify the landlord's or seller's identity and ownership</li>
                <li>Read all rental agreements or contracts carefully</li>
                <li>Understand your rights as a tenant or buyer</li>
                <li>Don't pay large deposits without proper documentation</li>
                <li>Get everything in writing</li>
              </ul>
            </div>
          </section>

          <div className="emergency-contact">
            <h2>Need Help?</h2>
            <p>
              If you feel unsafe or encounter suspicious activity, don't hesitate to contact us 
              immediately or reach out to local authorities if necessary.
            </p>
            <div className="contact-buttons">
              <a href="tel:+254750922133" className="contact-btn emergency">Emergency: +254 750 922 133</a>
              <a href="mailto:safety@jazamarket.com" className="contact-btn">Report Issue: safety@jazamarket.com</a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SafetyTips;
