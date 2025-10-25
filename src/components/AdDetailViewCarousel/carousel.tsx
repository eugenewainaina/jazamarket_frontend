import React, { useEffect, useRef } from 'react';
// import { createPortal } from 'react-dom';

// import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import './carousel.css';

interface AdImageCarouselProps {
  images: string[];
  adName: string;
  currentIndex: number; // controlled index from parent
  onChangeIndex: (index: number) => void; // callback to parent
  isFullscreen: boolean; // controlled fullscreen state
  onFullscreenChange: (state: boolean) => void; // notify parent
}

const AdImageCarousel: React.FC<AdImageCarouselProps> = ({
  images,
  adName,
  currentIndex,
  onChangeIndex,
  isFullscreen,
  // onFullscreenChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasMultipleImages = images.length > 1;

  const showNext = () => {
    if (currentIndex === images.length - 1) {
      // if (isFullscreen) {
      //   closeFullscreen(); // exit fullscreen if last image
      // } else {
      onChangeIndex(0); // loop in non-fullscreen mode (optional)
      // }
    } else {
      onChangeIndex(currentIndex + 1);
    }
  };

  const showPrev = () => {
    // if (currentIndex === 0 && isFullscreen) {
    //   closeFullscreen(); // optional: exit fullscreen if user goes "prev" from first image
    // } else {
    onChangeIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    // }
  };

  // const openFullscreen = () => {
  //   onFullscreenChange(true);
  //   document.body.style.overflow = 'hidden';
  // };

  // const closeFullscreen = () => {
  //   onFullscreenChange(false);
  //   document.body.style.overflow = 'unset';
  // };

  // Sync scroll for vertical carousel (optional)
  useEffect(() => {
    const imageContainer = containerRef.current;
    if (imageContainer && images.length > 0) {
      imageContainer.scrollTo({
        top: currentIndex * imageContainer.clientHeight,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, images]);

  // Keyboard navigation (still works outside fullscreen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      // if (isFullscreen && e.key === 'Escape') closeFullscreen();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, currentIndex, images]);

  return (
    <>
      <div className="ad-image-carousel" ref={containerRef}>
        <img
          src={images[currentIndex]}
          alt={`${adName} - Image ${currentIndex + 1}`}
          className="carousel-image"
          // onClick={openFullscreen}
        />

        {hasMultipleImages && (
          <>
            <button className="carousel-prev" onClick={showPrev}>
              <FaChevronLeft />
            </button>
            <button className="carousel-next" onClick={showNext}>
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {/* 
      {isFullscreen &&
        createPortal(
          <div className="fullscreen-overlay">
            <div className="fullscreen-content">
              <button className="fullscreen-close" onClick={closeFullscreen}>
                <FaTimes />
              </button>

              <img
                src={images[currentIndex]}
                alt={`${adName} - Fullscreen`}
                className="fullscreen-image"
              />

              {hasMultipleImages && (
                <>
                  <button
                    className="carousel-prev fullscreen-nav"
                    onClick={showPrev}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="carousel-next fullscreen-nav"
                    onClick={showNext}
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
      */}
    </>
  );
};

export default AdImageCarousel;