import React from 'react';
import { useSEO } from '../../hooks/useSEO';
import MainLayout from '../MainLayout';
import './IntellectualProperty.css';

const IntellectualProperty: React.FC = () => {
  useSEO({
    customTitle: 'Intellectual Property Rights - JazaMarket',
    customDescription: 'Learn about intellectual property rights on JazaMarket and how we protect creators and original content owners.',
    ogUrl: window.location.href,
  });

  return (
    <MainLayout>
      <div className="ip-page">
        <div className="container">
          <h1>Intellectual Property Rights</h1>
          <p className="intro-text">
            JazaMarket respects intellectual property rights and expects all users to do the same. 
            This page outlines our policies and procedures regarding intellectual property.
          </p>
          
          <section className="ip-section">
            <h2>1. Overview</h2>
            <p>
              Intellectual property refers to creations of the mind, such as inventions, literary and 
              artistic works, designs, symbols, names, and images used in commerce. At JazaMarket, 
              we are committed to protecting the intellectual property rights of all parties.
            </p>
          </section>

          <section className="ip-section">
            <h2>2. Types of Intellectual Property</h2>
            <div className="ip-types">
              <div className="ip-type">
                <h3>Copyright</h3>
                <p>
                  Protects original works of authorship including photos, videos, text, music, 
                  and software. On JazaMarket, this includes ad descriptions, images, and any 
                  creative content posted by users.
                </p>
              </div>
              <div className="ip-type">
                <h3>Trademarks</h3>
                <p>
                  Protects brand names, logos, slogans, and other identifiers. Users cannot 
                  sell counterfeit goods or use trademarks without authorization from the 
                  rights holder.
                </p>
              </div>
              <div className="ip-type">
                <h3>Patents</h3>
                <p>
                  Protects inventions and processes. Users should be aware of patent rights 
                  when selling innovative products or technologies.
                </p>
              </div>
              <div className="ip-type">
                <h3>Trade Secrets</h3>
                <p>
                  Protects confidential business information. Users should respect 
                  proprietary information and trade secrets of others.
                </p>
              </div>
            </div>
          </section>

          <section className="ip-section">
            <h2>3. User Responsibilities</h2>
            <h3>3.1 When Posting Ads</h3>
            <ul>
              <li>Ensure you own or have permission to use all images, text, and content</li>
              <li>Do not use copyrighted images without proper authorization</li>
              <li>Create original descriptions and avoid copying from other sources</li>
              <li>Respect trademark rights when describing brand-name products</li>
              <li>Do not sell counterfeit, replica, or unauthorized goods</li>
            </ul>

            <h3>3.2 Selling Authentic Products</h3>
            <ul>
              <li>Only sell genuine, authentic products</li>
              <li>Provide proof of authenticity when requested</li>
              <li>Clearly state if items are used, refurbished, or modified</li>
              <li>Do not misrepresent products or their origins</li>
            </ul>
          </section>

          <section className="ip-section">
            <h2>4. Prohibited Activities</h2>
            <div className="prohibited-grid">
              <div className="prohibited-item">
                <h3>Counterfeit Goods</h3>
                <p>Selling fake or replica items that infringe on trademark rights</p>
              </div>
              <div className="prohibited-item">
                <h3>Copyright Infringement</h3>
                <p>Using copyrighted images, text, or content without permission</p>
              </div>
              <div className="prohibited-item">
                <h3>Trademark Misuse</h3>
                <p>Unauthorized use of brand names, logos, or trademarks</p>
              </div>
              <div className="prohibited-item">
                <h3>Pirated Content</h3>
                <p>Selling copied software, movies, music, or digital content</p>
              </div>
            </div>
          </section>

          <section className="ip-section">
            <h2>5. Reporting IP Violations</h2>
            <p>
              If you believe your intellectual property rights have been violated on JazaMarket, 
              please report it to us immediately. We take these matters seriously and will 
              investigate all reports.
            </p>

            <h3>How to Report</h3>
            <ol>
              <li>Gather evidence of the infringement (screenshots, URLs, etc.)</li>
              <li>Provide proof of your ownership of the intellectual property</li>
              <li>Submit a detailed report to our IP team</li>
              <li>Include your contact information for follow-up</li>
            </ol>

            <div className="report-box">
              <h3>Report IP Violation</h3>
              <p>Email: <strong>ip@jazamarket.com</strong></p>
              <p>Phone: <strong>+254 750 922 133</strong></p>
              <p>Include: Evidence, proof of ownership, and detailed description</p>
            </div>
          </section>

          <section className="ip-section">
            <h2>6. DMCA Notice and Takedown</h2>
            <p>
              JazaMarket complies with the Digital Millennium Copyright Act (DMCA) and 
              similar international copyright laws. We respond to valid takedown notices 
              and remove infringing content promptly.
            </p>

            <h3>DMCA Notice Requirements</h3>
            <ul>
              <li>Identification of the copyrighted work</li>
              <li>Location of the infringing material on our platform</li>
              <li>Your contact information</li>
              <li>Statement of good faith belief that use is not authorized</li>
              <li>Statement that the information is accurate</li>
              <li>Your signature (electronic or physical)</li>
            </ul>
          </section>

          <section className="ip-section">
            <h2>7. Counter-Notification Process</h2>
            <p>
              If you believe your content was removed in error, you may submit a counter-notification. 
              We will review the counter-notification and may restore the content if appropriate.
            </p>

            <h3>Counter-Notification Requirements</h3>
            <ul>
              <li>Identification of the removed material and its location</li>
              <li>Statement under penalty of perjury that removal was a mistake</li>
              <li>Your contact information</li>
              <li>Consent to jurisdiction of federal court</li>
              <li>Your signature</li>
            </ul>
          </section>

          <section className="ip-section">
            <h2>8. Consequences of Violations</h2>
            <p>Users who violate intellectual property rights may face:</p>
            <ul>
              <li>Immediate removal of infringing content</li>
              <li>Temporary or permanent account suspension</li>
              <li>Loss of selling privileges</li>
              <li>Legal action by rights holders</li>
              <li>Reporting to relevant authorities</li>
            </ul>
          </section>

          <section className="ip-section">
            <h2>9. JazaMarket's Intellectual Property</h2>
            <p>
              JazaMarket owns intellectual property rights in our platform, including:
            </p>
            <ul>
              <li>The JazaMarket name, logo, and branding</li>
              <li>Website design and functionality</li>
              <li>Software and technology</li>
              <li>Content we create (policies, help articles, etc.)</li>
            </ul>
            <p>
              Users may not copy, modify, or use our intellectual property without permission.
            </p>
          </section>

          <section className="ip-section">
            <h2>10. Best Practices</h2>
            <div className="best-practices">
              <div className="practice-item">
                <h3>For Sellers</h3>
                <ul>
                  <li>Take your own photos of items</li>
                  <li>Write original descriptions</li>
                  <li>Only sell items you legally own</li>
                  <li>Research trademark restrictions</li>
                  <li>Keep proof of purchase for branded items</li>
                </ul>
              </div>
              <div className="practice-item">
                <h3>For Rights Holders</h3>
                <ul>
                  <li>Monitor for unauthorized use of your IP</li>
                  <li>Report violations promptly</li>
                  <li>Provide clear evidence of ownership</li>
                  <li>Use proper legal channels</li>
                  <li>Consider licensing opportunities</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="ip-section">
            <h2>11. Resources and Education</h2>
            <p>
              We encourage users to educate themselves about intellectual property rights. 
              Here are some helpful resources:
            </p>
            <ul>
              <li>Kenya Copyright Board (KECOBO)</li>
              <li>Kenya Industrial Property Institute (KIPI)</li>
              <li>World Intellectual Property Organization (WIPO)</li>
              <li>Local legal counsel specializing in IP law</li>
            </ul>
          </section>

          <section className="ip-section">
            <h2>12. Policy Updates</h2>
            <p>
              We may update this intellectual property policy from time to time. Users will 
              be notified of significant changes through our platform or via email. Continued 
              use of JazaMarket constitutes acceptance of any policy updates.
            </p>
          </section>

          <div className="contact-section">
            <h2>Questions About IP Rights?</h2>
            <p>
              If you have questions about intellectual property rights or need clarification 
              about our policies, please contact our IP team.
            </p>
            <div className="contact-buttons">
              <a href="mailto:ip@jazamarket.com" className="contact-btn">Email IP Team</a>
              <a href="/contact" className="contact-btn secondary">General Contact</a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default IntellectualProperty;
