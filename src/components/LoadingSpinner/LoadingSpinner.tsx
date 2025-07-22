import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-overlay">
      <img src="/Logo.png" alt="Loading..." className="spinner-logo" />
    </div>
  );
};

export default LoadingSpinner;
