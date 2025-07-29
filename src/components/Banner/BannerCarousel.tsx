import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BannerCarousel.css';

interface BannerCarouselProps {
  imageUrl: string;
  linkTo: string;
  altText: string;
  className?: string;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ imageUrl, linkTo, altText, className }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Create array of 3 identical images for now
  const images = [
    { url: imageUrl, alt: `${altText} 1` },
    { url: imageUrl, alt: `${altText} 2` },
    { url: imageUrl, alt: `${altText} 3` }
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  return (
    <div className={`banner-carousel-container ${className || ''}`}>
      <div className="banner-carousel">
        <button 
          className="carousel-button carousel-button-prev" 
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          &#8249;
        </button>
        
        <div className="carousel-slides">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <Link to={linkTo}>
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="carousel-image" 
                />
              </Link>
            </div>
          ))}
        </div>
        
        <button 
          className="carousel-button carousel-button-next" 
          onClick={goToNext}
          aria-label="Next slide"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default BannerCarousel;
