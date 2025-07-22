import React, { useState, useEffect } from 'react';
import './ProfileSettings.css';
import CountryCodes from '../../components/CountryCodes/CountryCodes';
import { useProfile } from '../../context/ProfileContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import {
  validateName,
  validatePhone,
  validatePassword,
  validateWhatsapp,
  validateUsername,
} from '../../validation/validators';

const ProfileSettings: React.FC = () => {
  const { profile, loading, error, fetchProfile } = useProfile();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    profilePictureURL: '',
    whatsapp: '',
    x: '',
    linkedin: '',
    facebook: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [countryCode, setCountryCode] = useState('+254');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        password: profile.password || '',
        profilePictureURL: profile.profilePictureURL || '',
        whatsapp: profile.whatsapp ? profile.whatsapp.replace(countryCode, '') : '',
        x: profile.x || '',
        linkedin: profile.linkedin || '',
        facebook: profile.facebook || '',
      });
      // You might want to add more sophisticated logic to extract country code
      if (profile.whatsapp) {
          // A simple check for common prefixes, you can expand this
          const codes = ['+254', '+1', '+44', '+255', '+256']; // Add more codes as needed
          const foundCode = codes.find(code => profile.whatsapp!.startsWith(code));
          if (foundCode) {
              setCountryCode(foundCode);
              setFormData(prev => ({ ...prev, whatsapp: profile.whatsapp!.substring(foundCode.length) }));
          }
      }
    }
  }, [profile]);

  useEffect(() => {
    if (!profile) return;

    const checkDirty = () => {
      if (formData.fullName !== (profile.fullName || '')) return true;
      // Only check password if it has been changed from the initial one, and it's not empty
      if (formData.password !== (profile.password || '') && formData.password !== '') return true;
      if (formData.phone !== (profile.phone || '')) return true;
      if (formData.address !== (profile.address || '')) return true;
      
      const fullWhatsApp = formData.whatsapp ? `${countryCode}${formData.whatsapp}` : '';
      if (fullWhatsApp !== (profile.whatsapp || '')) return true;

      if (formData.x !== (profile.x || '')) return true;
      if (formData.linkedin !== (profile.linkedin || '')) return true;
      if (formData.facebook !== (profile.facebook || '')) return true;

      if (profileImageFile) return true;

      // This covers removing an existing image
      if (profile.profilePictureURL && !formData.profilePictureURL) return true;

      return false;
    };

    setIsDirty(checkDirty());
  }, [formData, profile, profileImageFile, countryCode]);

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'fullName':
        error = validateName(value);
        break;
      case 'phone':
        error = value ? validatePhone(value) : '';
        break;
      case 'address':
        error = value ? validateName(value) : '';
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'whatsapp':
        error = value ? validateWhatsapp(value) : '';
        break;
      case 'x':
      case 'linkedin':
      case 'facebook':
        error = value ? validateUsername(value) : '';
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    newErrors.fullName = validateName(formData.fullName);
    if (formData.phone) newErrors.phone = validatePhone(formData.phone);
    if (formData.address) newErrors.address = validateName(formData.address);
    newErrors.password = validatePassword(formData.password);
    if (formData.whatsapp) newErrors.whatsapp = validateWhatsapp(formData.whatsapp);
    if (formData.x) newErrors.x = validateUsername(formData.x);
    if (formData.linkedin) newErrors.linkedin = validateUsername(formData.linkedin);
    if (formData.facebook) newErrors.facebook = validateUsername(formData.facebook);

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === "");
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setProfileImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, profilePictureURL: reader.result as string }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Validation failed");
      setSubmitStatus({ message: 'Please fix the errors before submitting.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const changedFields: Record<string, any> = {};

    if (profile) {
        if (formData.fullName !== profile.fullName) changedFields.fullName = formData.fullName;
        if (formData.password && formData.password !== profile.password) changedFields.password = formData.password;
        if (formData.phone !== (profile.phone || '')) changedFields.phone = formData.phone;
        if (formData.address !== (profile.address || '')) changedFields.address = formData.address;
        if (formData.facebook !== (profile.facebook || '')) changedFields.facebook = formData.facebook;
        if (formData.linkedin !== (profile.linkedin || '')) changedFields.linkedin = formData.linkedin;
        if (formData.x !== (profile.x || '')) changedFields.x = formData.x;

        const fullWhatsApp = formData.whatsapp ? `${countryCode}${formData.whatsapp}` : '';
        if (fullWhatsApp !== (profile.whatsapp || '')) changedFields.whatsapp = fullWhatsApp;
    }

    const payload = new FormData();

    let changesFound = Object.keys(changedFields).length > 0;

    for (const key in changedFields) {
        payload.append(key, changedFields[key]);
    }

    if (profileImageFile) {
        payload.append('profilePicture', profileImageFile);
        changesFound = true;
    } else if (profile?.profilePictureURL && !formData.profilePictureURL) {
        payload.append('removeProfilePicture', 'true');
        changesFound = true;
    }

    if (!changesFound) {
        setSubmitStatus({ message: 'No changes to submit.', type: 'error' });
        setIsSubmitting(false);
        return;
    }

    try {
        const response = await fetch('/api/edit_profile', {
            method: 'POST',
            body: payload,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update profile.');
        }

        setSubmitStatus({ message: 'Profile updated successfully!', type: 'success' });
        fetchProfile(); // Refresh profile data
    } catch (err: any) {
        setSubmitStatus({ message: err.message, type: 'error' });
    } finally {
        setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="profile-settings-container">
      <h3>Profile Settings</h3>
      <form className="profile-settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name<span className="required-star">*</span></label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">E-Mail<span className="required-star">*</span></label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required disabled />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          {errors.address && <span className="error-text">{errors.address}</span>}
        </div>
        <div className="form-group">
            <label htmlFor="password">Password<span className="required-star">*</span></label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>Profile Image</label>
          <div className="profile-image-upload">
            <img src={formData.profilePictureURL || "https://via.placeholder.com/100"} alt="Profile" />
            <input
              type="file"
              id="profile-image-input"
              style={{ display: 'none' }}
              onChange={handleImageChange}
              accept="image/*"
            />
            <div className="profile-image-buttons">
              <label htmlFor="profile-image-input" className="profile-image-button">
                Profile Image
              </label>
              {formData.profilePictureURL && (
                <button
                  type="button"
                  className="remove-image-button"
                  onClick={() => setFormData(prev => ({...prev, profilePictureURL: ''}))}
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="whatsapp">WhatsApp Number</label>
          <div className="whatsapp-input">
            <CountryCodes value={countryCode} onChange={(e) => setCountryCode(e.target.value)} />
            <input
              type="text"
              id="whatsapp"
              name="whatsapp"
              placeholder="712345678"
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </div>
          {errors.whatsapp && <span className="error-text">{errors.whatsapp}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="x">X Username</label>
          <input
            type="text"
            id="x"
            name="x"
            placeholder="X Username"
            value={formData.x}
            onChange={handleChange}
          />
          {errors.x && <span className="error-text">{errors.x}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn Username</label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            placeholder="LinkedIn Username"
            value={formData.linkedin}
            onChange={handleChange}
          />
          {errors.linkedin && <span className="error-text">{errors.linkedin}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="facebook">Facebook Username</label>
          <input
            type="text"
            id="facebook"
            name="facebook"
            placeholder="Facebook Username"
            value={formData.facebook}
            onChange={handleChange}
          />
          {errors.facebook && <span className="error-text">{errors.facebook}</span>}
        </div>
        {submitStatus && (
          <div className={`submit-status ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}
        <button type="submit" className="submit-btn" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
