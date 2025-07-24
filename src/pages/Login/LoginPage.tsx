import React from 'react';
import LoginForm from './LoginForm.tsx';
import { useSEO } from '../../hooks/useSEO';
import './Login.css';

const LoginPage: React.FC = () => {
  // Apply SEO metadata for login page
  useSEO({
    customTitle: "Login to JazaMarket | Access Your Account",
    customDescription: "Login to your JazaMarket account to post ads, manage your listings, and access your dashboard. Join Kenya's trusted marketplace.",
    ogUrl: window.location.href,
  });

  return (
    <div className="login-page">
      <main className="login-main">
        <div className="login-container">
          <div className="new-customer">
            <h3>New Customer</h3>
            <p>Donot have an account? <a href="/signup">Create your account</a></p>
            <p>It takes less than a minute</p>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
