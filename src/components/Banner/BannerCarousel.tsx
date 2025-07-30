import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BannerCarousel.css';

interface BannerItem {
  imageUrl: string;
  linkTo: string;
  altText: string;
}

interface BannerCarouselProps {
  banners: BannerItem[];
  className?: string;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners, className }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Use the provided banners array, limit to 3 maximum
  const images = banners.slice(0, 3);

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
          {images.map((banner, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <Link to={banner.linkTo}>
                <img 
                  src={banner.imageUrl} 
                  alt={banner.altText} 
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
