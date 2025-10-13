import React from 'react';
import './ImageGallery.css';

interface ImageGalleryProps {
  images: string[];
  adName: string;
  currentIndex: number;
  onThumbnailClick?: (index: number) => void;   // Scroll carousel
  onOpenFullscreen?: () => void;               // Open fullscreen
  onChangeIndex?: (index: number) => void;     // Set carousel index (needed for +x)
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  adName,
  onThumbnailClick,
  onOpenFullscreen,
  onChangeIndex,
}) => {
  if (!images || images.length === 0) return null;

  const maxVisible = 4;
  const totalImages = images.length;
  const overflowCount = totalImages - maxVisible;

  // Slice thumbnails to display
  const visibleThumbnails =
    totalImages <= maxVisible ? images : images.slice(0, maxVisible);

  // Handle clicking the +x overlay
  const handleOverflowClick = () => {
    onChangeIndex?.(0); // start at first image
    onOpenFullscreen?.();
  };

  return (
    <div className="image-gallery-section">
      <div className="gallery-content">
        <div className="gallery-grid">
          {visibleThumbnails.map((image, index) => {
            const isOverflowThumbnail = index === maxVisible - 1 && overflowCount > 0;

            return (
              <div key={index} className="gallery-item">
                <img
                  src={image}
                  alt={`${adName} - Thumbnail ${index + 1}`}
                  onClick={() =>
                    isOverflowThumbnail
                      ? handleOverflowClick()
                      : onThumbnailClick?.(index)
                  }
                />

                {isOverflowThumbnail && (
                  <div
                    className="image-overlay overflow-overlay"
                    onClick={handleOverflowClick}
                  >
                    +{overflowCount}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
