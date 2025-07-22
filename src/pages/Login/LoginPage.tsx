import React from 'react';
import LoginForm from './LoginForm.tsx';
import './Login.css';

const LoginPage: React.FC = () => {
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
