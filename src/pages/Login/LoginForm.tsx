import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { validateEmail } from '../../validation/validators';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { formatString } from '../../utils/formatters';
import { setCookie } from '../../utils/cookies';
import { createApiUrl } from '../../utils/api';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    server: '',
  });

  const validate = (id: string, value: string) => {
    let error = '';
    switch (id) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        if (!value) {
          error = 'Password is required.';
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [id]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    validate(id, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, server: '' }));

    const emailError = validateEmail(formData.email);
    const passwordError = !formData.password ? 'Password is required.' : '';

    setErrors({
        email: emailError,
        password: passwordError,
        server: '',
    });

    if (emailError || passwordError) {
      return;
    }

    setIsLoading(true);

    const formattedData = {
      email: formatString(formData.email),
      password: formData.password,
    };

    try {
      const response = await fetch(createApiUrl('/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        console.log('Login successful');
        // The backend sets jazamarket_token cookie, we just set logged_in flag
        setCookie('logged_in', 'true', 1);
        navigate('/');
      } else {
        const errorData = await response.json();
        setErrors((prevErrors) => ({ ...prevErrors, server: errorData.message || 'Invalid credentials.' }));
      }
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, server: 'An error occurred. Please check your connection.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    !errors.email &&
    !errors.password &&
    formData.email !== '' &&
    formData.password !== '';

  return (
    <div className="login-form-container">
      {isLoading && <LoadingSpinner />}
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        {errors.server && <div className="error-message">{errors.server}</div>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-with-icon">
            <FaEnvelope />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'invalid' : ''}
            />
          </div>
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-with-icon">
            <FaLock />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'invalid' : ''}
            />
            <span onClick={() => setShowPassword(!showPassword)} className="password-toggle-icon">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <a href="#" className="forgot-password">
          Forgot Password?
        </a>
        <button type="submit" className="btn-continue" disabled={!isFormValid || isLoading}>
          {isLoading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
