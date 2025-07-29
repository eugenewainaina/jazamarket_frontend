import React, { useState, useRef } from 'react';
import './ImageUpload.css';
import { FaUpload, FaSpinner } from 'react-icons/fa';
import { createApiUrl } from '../../utils/api';

interface ImageUploadProps {
  adId: string;
  currentImages: string[];
  onImagesUpdated: (newImages: string[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ adId, currentImages, onImagesUpdated }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxImages = 5;
  const canUploadMore = currentImages.length < maxImages;
  const remainingSlots = maxImages - currentImages.length;

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    if (currentImages.length + validFiles.length > maxImages) {
      alert(`You can only upload ${remainingSlots} more image(s). Maximum ${maxImages} images allowed.`);
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      validFiles.forEach(file => {
        formData.append('images', file);
      });

      const response = await fetch(createApiUrl(`/upload_ad_images?ad_id=${adId}`), {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload images');
      }

      const result = await response.json();
      if (result.imageLinks) {
        const updatedImages = [...currentImages, ...result.imageLinks];
        onImagesUpdated(updatedImages);
      }

    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUploadClick = () => {
    if (canUploadMore && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="image-upload-container">
      {currentImages.length > 0 && (
        <div className="current-images">
          <h4>Current Images</h4>
          <div className="current-images-grid">
            {currentImages.map((image, index) => (
              <div key={index} className="current-image-item">
                <img src={image} alt={`Ad image ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
      
      <button
        className={`upload-btn ${!canUploadMore ? 'disabled' : ''}`}
        onClick={handleUploadClick}
        disabled={!canUploadMore || isUploading}
      >
        {isUploading ? (
          <>
            <FaSpinner className="spinning" />
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <FaUpload />
            <span>
              {canUploadMore 
                ? `Add Images (${remainingSlots} remaining)` 
                : 'Maximum images reached'
              }
            </span>
          </>
        )}
      </button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      
      <div className="upload-info">
        <small>
          {currentImages.length}/{maxImages} images • 
          Max 5 images • Only image files allowed
        </small>
      </div>
    </div>
  );
};

export default ImageUpload;
