import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

interface BannerProps {
  imageUrl: string;
  linkTo: string;
  altText: string;
  className?: string;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, linkTo, altText, className }) => {
  return (
    <div className={`banner-container ${className || ''}`}>
      <Link to={linkTo}>
        <img src={imageUrl} alt={altText} className="banner-image" />
      </Link>
    </div>
  );
};

export default Banner;
