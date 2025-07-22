import React from 'react';
import SignUpForm from './SignUpForm.tsx';
import './SignUp.css';

const SignUpPage: React.FC = () => {
  return (
    <div className="signup-page">
      <main className="signup-main">
        <SignUpForm />
      </main>
    </div>
  );
};

export default SignUpPage;
