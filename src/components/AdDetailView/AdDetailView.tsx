import React, { useState, useEffect } from 'react';
import type { BaseAd, PropertyAd, VehicleAd, MyAdSummary } from '../../types/ads';
import { formatPrice, formatPostDate } from '../../utils/formatters';
import './AdDetailView.css';
import { FaEdit, FaTrash, FaRocket } from 'react-icons/fa';
import EditAdForm from '../EditAdForm/EditAdForm';
import ImageUpload from '../ImageUpload/ImageUpload';
import ImageGallery from '../ImageGallery/ImageGallery';
import ContactDetails from '../ContactDetails/ContactDetails';
import BoostPackagesPopup from '../BoostPackagesPopup/BoostPackagesPopup';
import { createApiUrl } from '../../utils/api';

interface AdDetailViewProps {
  ad: BaseAd | VehicleAd | PropertyAd | MyAdSummary;
  onClose: () => void;
  isMyAd: boolean;
  onAdUpdated?: () => void;
}

const AdDetailView: React.FC<AdDetailViewProps> = ({ ad, onClose, isMyAd, onAdUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>(ad.imageLinks || []);
  const [showBoostPopup, setShowBoostPopup] = useState(false);

  // Sync local state when ad prop changes (after refresh)
  useEffect(() => {
    setCurrentImages(ad.imageLinks || []);
  }, [ad.imageLinks]);

  const handleEditSuccess = () => {
    setIsEditing(false);
    if (onAdUpdated) {
      onAdUpdated();
    }
    onClose();
  };

  const handleImagesUpdated = (newImages: string[]) => {
    setCurrentImages(newImages);
    if (onAdUpdated) {
      onAdUpdated();
    }
  };

  const handleBoostAd = () => {
    // Open the boost packages popup
    setShowBoostPopup(true);
  };

  const handleCloseBoostPopup = () => {
    setShowBoostPopup(false);
  };

  const renderAdSpecificDetails = () => {
    if ('make' in ad) { // It's a VehicleAd
      const vehicle = ad as VehicleAd;
      return (
        <>
          <p><strong>Make:</strong> {vehicle.make}</p>
          <p><strong>Model:</strong> {vehicle.model}</p>
          <p><strong>Year:</strong> {vehicle.year}</p>
          <p><strong>Mileage:</strong> {vehicle.mileage}</p>
          <p><strong>Condition:</strong> {vehicle.condition}</p>
          <p><strong>Transmission:</strong> {vehicle.transmission}</p>
          <p><strong>Fuel Type:</strong> {vehicle.fuelType}</p>
        </>
      );
    }
    if ('bedrooms' in ad) { // It's a PropertyAd
      const property = ad as PropertyAd;
      return (
        <>
          <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
          <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
          <p><strong>Land Size:</strong> {property.landSize}</p>
          <p><strong>Pet Friendly:</strong> {property.petFriendly ? 'Yes' : 'No'}</p>
        </>
      );
    }
    return null;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      try {
        const response = await fetch(createApiUrl(`/delete_ad/${ad._id}`), {
          method: 'DELETE',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to delete ad');
        }

        console.log('Ad deleted successfully');
        if (onAdUpdated) {
          onAdUpdated();
        }
        onClose();
      } catch (error) {
        console.error('Error deleting ad:', error);
        alert('There was an error deleting the ad. Please try again.');
      }
    }
  };

  if (isEditing) {
    return (
      <EditAdForm
        ad={ad as MyAdSummary}
        onClose={() => setIsEditing(false)}
        onSuccess={handleEditSuccess}
      />
    );
  }

  return (
    <div className="ad-detail-view">
      <div className="ad-detail-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="ad-detail-header">
          <h2>{ad.name}</h2>
          {isMyAd && (
            <div className="ad-actions">
              <button className="action-btn edit-btn" onClick={handleEditClick}>
                <FaEdit />
                <span>Edit</span>
              </button>
              <button className="action-btn delete-btn" onClick={handleDeleteClick}>
                <FaTrash />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
        <div className="ad-detail-body">
          <div className="ad-detail-image-container">
            <img src={ad.adImageURL} alt={ad.name} />
          </div>
          <div className="ad-detail-info">
            <p className="price">{formatPrice(ad.price)}</p>
            <p><strong>Location:</strong> {ad.location}</p>
            <p><strong>Description:</strong> {ad.description}</p>
            <p><strong>Posted:</strong> {formatPostDate(ad._createTime)}</p>
            {renderAdSpecificDetails()}
            
            {/* Show contact details only for ads that are not the user's own */}
            {!isMyAd && (
              <ContactDetails adId={ad._id} adName={ad.name} />
            )}
            
            {isMyAd && (
              <>
                <div className="boost-ad-section">
                  <button className="boost-ad-detail" onClick={handleBoostAd}>
                    <FaRocket />
                    Boost Ad
                  </button>
                  <p className="boost-ad-description">Boost your Ad to reach more customers</p>
                </div>
                <ImageUpload
                  adId={ad._id}
                  currentImages={currentImages}
                  onImagesUpdated={handleImagesUpdated}
                  onAdUpdated={onAdUpdated}
                />
              </>
            )}
            
            <ImageGallery images={currentImages} adName={ad.name} />
          </div>
        </div>
      </div>
      
      {/* Boost Packages Popup - only render if it's the user's ad */}
      {isMyAd && (
        <BoostPackagesPopup
          isOpen={showBoostPopup}
          onClose={handleCloseBoostPopup}
          adCategory={ad.category}
        />
      )}
    </div>
  );
};

export default AdDetailView;
