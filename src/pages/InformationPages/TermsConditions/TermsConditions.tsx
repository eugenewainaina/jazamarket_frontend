import React from 'react';
import { useSEO } from '../../../hooks/useSEO';
import MainLayout from '../../MainLayout';
import './TermsConditions.css';

const TermsConditions: React.FC = () => {
  useSEO({
    customTitle: 'Terms & Conditions - JazaMarket',
    customDescription: 'Read JazaMarket\'s terms and conditions for using our online marketplace platform in Kenya.',
    ogUrl: window.location.href,
  });

  return (
    <MainLayout>
      <div className="terms-conditions-page">
        <div className="container">
          <h1>Terms & Conditions</h1>
          <p className="last-updated">Last updated: January 26, 2025</p>
          
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using JazaMarket's website and services, you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide by the above, please 
              do not use this service.
            </p>
          </section>

          <section>
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on JazaMarket's website 
              for personal, non-commercial transitory viewing only. This is the grant of a license, not a 
              transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2>3. User Accounts and Registration</h2>
            <h3>3.1 Account Creation</h3>
            <p>
              To access certain features of our service, you must register for an account. You agree to 
              provide accurate, current, and complete information during registration.
            </p>
            
            <h3>3.2 Account Security</h3>
            <p>
              You are responsible for maintaining the security of your account and password. You agree 
              to notify us immediately of any unauthorized use of your account.
            </p>
            
            <h3>3.3 Account Termination</h3>
            <p>
              We reserve the right to terminate or suspend your account at our sole discretion, without 
              notice, for conduct that we believe violates these Terms or is harmful to other users.
            </p>
          </section>

          <section>
            <h2>4. Posting Guidelines</h2>
            <h3>4.1 Prohibited Content</h3>
            <p>Users are prohibited from posting content that:</p>
            <ul>
              <li>Is illegal, harmful, threatening, abusive, or defamatory</li>
              <li>Violates intellectual property rights</li>
              <li>Contains spam, viruses, or malicious code</li>
              <li>Promotes illegal activities or violence</li>
              <li>Contains false or misleading information</li>
              <li>Violates privacy rights of others</li>
            </ul>

            <h3>4.2 Ad Posting Requirements</h3>
            <ul>
              <li>Ads must be placed in the appropriate category</li>
              <li>Descriptions must be accurate and complete</li>
              <li>Images must be relevant to the item being sold</li>
              <li>Contact information must be current and valid</li>
              <li>Duplicate postings are not allowed</li>
            </ul>
          </section>

          <section>
            <h2>5. Payment and Fees</h2>
            <p>
              Basic listing services are free. Premium features may require payment. All fees are 
              non-refundable unless otherwise specified. We reserve the right to change our pricing 
              at any time with reasonable notice.
            </p>
          </section>

          <section>
            <h2>6. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the service for any unlawful purpose</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Impersonate any person or entity</li>
              <li>Collect user information without consent</li>
              <li>Interfere with the operation of the service</li>
              <li>Use automated systems to access the service</li>
            </ul>
          </section>

          <section>
            <h2>7. Intellectual Property</h2>
            <p>
              The service and its original content, features, and functionality are owned by JazaMarket 
              and are protected by international copyright, trademark, patent, trade secret, and other 
              intellectual property laws.
            </p>
          </section>

          <section>
            <h2>8. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs 
              your use of the service, to understand our practices.
            </p>
          </section>

          <section>
            <h2>9. Disclaimers</h2>
            <p>
              The information on this website is provided on an "as is" basis. To the fullest extent 
              permitted by law, this Company:
            </p>
            <ul>
              <li>Excludes all representations and warranties relating to this website and its contents</li>
              <li>Does not warrant that the service will be uninterrupted or error-free</li>
              <li>Makes no warranty as to the accuracy or reliability of any content</li>
              <li>Disclaims all liability for any loss or damage arising from use of this website</li>
            </ul>
          </section>

          <section>
            <h2>10. Limitation of Liability</h2>
            <p>
              In no event shall JazaMarket or its suppliers be liable for any damages (including, without 
              limitation, damages for loss of data or profit, or due to business interruption) arising 
              out of the use or inability to use the materials on JazaMarket's website.
            </p>
          </section>

          <section>
            <h2>11. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of 
              Kenya, and you irrevocably submit to the exclusive jurisdiction of the courts in that 
              state or location.
            </p>
          </section>

          <section>
            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any 
              material changes via email or through our website. Your continued use of the service 
              after such modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2>13. Contact Information</h2>
            <p>
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> legal@jazamarket.com</p>
              <p><strong>Phone:</strong> +254 750 922 133</p>
              <p><strong>Address:</strong> Nairobi, Kenya</p>
            </div>
          </section>
        </div>
      </div>
   </MainLayout>
  );
};

export default TermsConditions;
