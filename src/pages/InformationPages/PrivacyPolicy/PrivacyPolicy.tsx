import React from 'react';
import { useSEO } from '../../../hooks/useSEO';
import MainLayout from '../../MainLayout';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
  useSEO({
    customTitle: 'Privacy Policy - JazaMarket',
    customDescription: 'Read JazaMarket\'s privacy policy to understand how we collect, use, and protect your personal information.',
    ogUrl: window.location.href,
  });

  return (
    <MainLayout>
      <div className="privacy-policy-page">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: January 26, 2025</p>
          
          <section>
            <h2>1. Introduction</h2>
            <p>
              At JazaMarket, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website 
              and services.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We may collect the following personal information:</p>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>Profile information and preferences</li>
              <li>Payment and billing information</li>
              <li>Location data (when you choose to share it)</li>
              <li>Communication records with customer support</li>
            </ul>

            <h3>2.2 Usage Information</h3>
            <p>We automatically collect information about how you use our services:</p>
            <ul>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address and location data</li>
              <li>Pages visited and time spent on our site</li>
              <li>Search queries and interactions with ads</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process transactions and payments</li>
              <li>Communicate with you about your account and our services</li>
              <li>Improve our website and user experience</li>
              <li>Prevent fraud and ensure platform security</li>
              <li>Comply with legal obligations</li>
              <li>Send promotional materials (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2>4. Information Sharing and Disclosure</h2>
            <p>We may share your information in the following circumstances:</p>
            <ul>
              <li><strong>With other users:</strong> Information in your public profile and ads</li>
              <li><strong>Service providers:</strong> Third-party companies that help us operate our services</li>
              <li><strong>Legal compliance:</strong> When required by law or to protect our rights</li>
              <li><strong>Business transfers:</strong> In case of merger, acquisition, or sale of assets</li>
              <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
            </ul>
          </section>

          <section>
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
              the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2>6. Your Rights and Choices</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Update:</strong> Correct or update your information</li>
              <li><strong>Delete:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Data portability:</strong> Request transfer of your data</li>
            </ul>
          </section>

          <section>
            <h2>7. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our website. 
              You can control cookie settings through your browser preferences. Some features may not work 
              properly if you disable cookies.
            </p>
          </section>

          <section>
            <h2>8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy 
              practices of these external sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 18 years of age. We do not knowingly collect 
              personal information from children under 18. If you believe we have collected information from 
              a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> privacy@jazamarket.com</p>
              <p><strong>Phone:</strong> +254 750 922 133</p>
              <p><strong>Address:</strong> Nairobi, Kenya</p>
            </div>
          </section>
        </div>
      </div>
   </MainLayout>
  );
};

export default PrivacyPolicy;
