import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
  const jazaText = "Jaza";
  const marketText = "Market";
  
  return (
    <div className="loading-overlay">
      <div className="wavy-text">
        {jazaText.split('').map((letter, index) => (
          <span 
            key={`jaza-${index}`} 
            className="wavy-letter jaza-red" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
        {marketText.split('').map((letter, index) => (
          <span 
            key={`market-${index}`} 
            className="wavy-letter market-blue" 
            style={{ animationDelay: `${(jazaText.length + index) * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
