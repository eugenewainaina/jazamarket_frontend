import React from 'react';
import SignUpForm from './SignUpForm.tsx';
import { useSEO } from '../../hooks/useSEO';
import './SignUp.css';

const SignUpPage: React.FC = () => {
  // Apply SEO metadata for signup page
  useSEO({
    customTitle: "Sign Up for JazaMarket | Create Your Account",
    customDescription: "Join JazaMarket today! Create your free account to start buying and selling in Kenya's most trusted marketplace. Quick and easy registration.",
    ogUrl: window.location.href,
  });

  return (
    <div className="signup-page">
      <main className="signup-main">
        <SignUpForm />
      </main>
    </div>
  );
};

export default SignUpPage;
