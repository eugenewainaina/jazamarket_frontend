import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ImageGallery.css';
import { FaChevronDown, FaChevronUp, FaExpand, FaTimes } from 'react-icons/fa';

interface ImageGalleryProps {
  images: string[];
  adName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, adName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxImage) {
        closeLightbox();
      }
    };

    if (lightboxImage) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxImage]);

  if (!images || images.length === 0) {
    return null;
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const openLightbox = (image: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const handleLightboxClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  return (
    <>
      <div className="image-gallery-section">
        <button className="gallery-toggle" onClick={toggleExpanded}>
          <span>Gallery ({images.length} image{images.length !== 1 ? 's' : ''})</span>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        
        {isExpanded && (
          <div className="gallery-content">
            <div className="gallery-grid">
              {images.map((image, index) => (
                <div key={index} className="gallery-item">
                  <img
                    src={image}
                    alt={`${adName} - Image ${index + 1}`}
                    onClick={(e) => openLightbox(image, e)}
                  />
                  <div className="image-overlay" onClick={(e) => openLightbox(image, e)}>
                    <FaExpand />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {lightboxImage && createPortal(
        <div className="lightbox" onClick={handleLightboxClick}>
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={closeLightbox}>
              <FaTimes />
            </button>
            <img src={lightboxImage} alt={`${adName} - Full size`} />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ImageGallery;
