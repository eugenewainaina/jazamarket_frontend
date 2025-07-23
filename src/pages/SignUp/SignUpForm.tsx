import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { validateName, validateEmail, validatePassword } from '../../validation/validators';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { formatString } from '../../utils/formatters';
import { setCookie } from '../../utils/cookies';
import { createApiUrl } from '../../utils/api';

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    server: '',
  });

  const validate = (name: string, value: string, currentFormData = formData) => {
    let error = '';
    switch (name) {
      case 'fullName':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        if (!error && currentFormData.passwordConfirm && value !== currentFormData.passwordConfirm) {
          setErrors((prev) => ({ ...prev, passwordConfirm: 'Passwords do not match.' }));
        } else if (!error && currentFormData.passwordConfirm && value === currentFormData.passwordConfirm) {
          setErrors((prev) => ({ ...prev, passwordConfirm: '' }));
        }
        break;
      case 'passwordConfirm':
        if (currentFormData.password !== value) {
          error = 'Passwords do not match.';
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => {
      const newFormData = { ...prevData, [id]: newValue };
      validate(id, value, newFormData);
      return newFormData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Clear previous server errors
    setErrors((prev) => ({ ...prev, server: '' }));

    // Validate all fields on submit
    const fullNameError = validateName(formData.fullName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    let passwordConfirmError = '';
    if (formData.password !== formData.passwordConfirm) {
        passwordConfirmError = 'Passwords do not match.';
    }

    setErrors({
        fullName: fullNameError,
        email: emailError,
        password: passwordError,
        passwordConfirm: passwordConfirmError,
        server: '',
    });

    if (fullNameError || emailError || passwordError || passwordConfirmError) {
        return;
    }

    setIsLoading(true);

    const formattedData = {
      fullName: formatString(formData.fullName),
      email: formatString(formData.email),
      password: formData.password,
    };

    try {
      const response = await fetch(createApiUrl('/sign_up'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        console.log('Signup successful');
        setCookie('logged_in', 'true', 1); // Set cookie on successful signup
        navigate('/'); // Redirect to homepage on successful signup
      } else {
        const errorData = await response.json();
        setErrors((prevErrors) => ({ ...prevErrors, server: errorData.message || 'An error occurred during sign up.' }));
      }
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, server: 'An error occurred. Please check your connection.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const { server, ...formErrors } = errors;
  const isFormValid =
    Object.values(formErrors).every((error) => !error) &&
    formData.fullName !== '' &&
    formData.email !== '' &&
    formData.password !== '' &&
    formData.passwordConfirm !== '' &&
    formData.terms;

  return (
    <div className="signup-form-container">
      {isLoading && <LoadingSpinner />}
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        {errors.server && <div className="error-message">{errors.server}</div>}
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <div className="input-with-icon">
            <FaUser />
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'invalid' : ''}
            />
          </div>
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">E-Mail</label>
          <div className="input-with-icon">
            <FaEnvelope />
            <input
              type="email"
              id="email"
              placeholder="E-Mail"
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
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <div className="input-with-icon">
            <FaLock />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="passwordConfirm"
              placeholder="Confirm Password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              className={errors.passwordConfirm ? 'invalid' : ''}
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-toggle-icon">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.passwordConfirm && <span className="error-message">{errors.passwordConfirm}</span>}
        </div>
        <div className="form-group terms">
          <input
            type="checkbox"
            id="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <label htmlFor="terms">
            I agree to the <a href="/terms">Terms and Conditions</a>
          </label>
        </div>
        <button type="submit" className="btn-continue" disabled={!isFormValid || isLoading}>
          {isLoading ? 'Signing Up...' : 'Continue'}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
