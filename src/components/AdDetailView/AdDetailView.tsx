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
import AdImageCarousel from '../AdDetailViewCarousel/carousel';

interface AdDetailViewProps {
  ad: BaseAd | VehicleAd | PropertyAd | MyAdSummary;
  onClose: () => void;
  isMyAd: boolean;
  onAdUpdated?: () => void;
}

const AdDetailView: React.FC<AdDetailViewProps> = ({ ad, onClose, isMyAd, onAdUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>(ad.imageLinks || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselFullscreen, setCarouselFullscreen] = useState(false);
  const [showBoostPopup, setShowBoostPopup] = useState(false);

  useEffect(() => {
    setCurrentImages(ad.imageLinks || []);
  }, [ad.imageLinks]);
  const galleryImages = [ad.adImageURL, ...(ad.imageLinks || [])].filter(Boolean) as string[];
  // const galleryImages = (ad.imageLinks || []).filter(Boolean) as string[];

  // Handlers
  const handleEditSuccess = () => {
    setIsEditing(false);
    onAdUpdated?.();
    onClose();
  };

  const handleImagesUpdated = (newImages: string[]) => {
    setCurrentImages(newImages);
    onAdUpdated?.();
  };

  const handleBoostAd = () => setShowBoostPopup(true);
  const handleCloseBoostPopup = () => setShowBoostPopup(false);
  const handleEditClick = () => setIsEditing(true);

  const handleDeleteClick = async () => {
    if (!window.confirm('Are you sure you want to delete this ad?')) return;

    try {
      const response = await fetch(createApiUrl(`/delete_ad?ad_id=${ad._id}`), {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        onAdUpdated?.();
        onClose();
      } else {
        let errorMessage = 'Failed to delete ad';
        try {
          const errorData = await response.json();
          if (errorData.message) errorMessage = errorData.message;
        } catch {}
        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(`Error deleting ad: ${error instanceof Error ? error.message : 'Please try again.'}`);
    }
  };

  const renderAdSpecificDetails = () => {
    if ('make' in ad) {
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
    if ('bedrooms' in ad) {
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

  if (isEditing) {
    return <EditAdForm ad={ad as MyAdSummary} onClose={() => setIsEditing(false)} onSuccess={handleEditSuccess} />;
  }

  const isPremium = ad.package && ad.package !== 'Explorer';

  return (
    <div className={`ad-detail-view ${isPremium ? 'premium-ad-detail' : ''}`}>
      <div className="ad-detail-content">
        <button className="close-button" onClick={onClose}>×</button>

        <div className="ad-detail-header">
          <h2>{ad.name}</h2>
          {isMyAd && (
            <div className="ad-actions">
              <button className="action-btn edit-btn" onClick={handleEditClick}><FaEdit /><span>Edit</span></button>
              <button className="action-btn delete-btn" onClick={handleDeleteClick}><FaTrash /><span>Delete</span></button>
            </div>
          )}
        </div>

        <div className="ad-detail-body">
          {/* Carousel */}
          <div className="ad-detail-image-container">
            <AdImageCarousel
              images={galleryImages}
              adName={ad.name}
              currentIndex={currentIndex}
              onChangeIndex={setCurrentIndex}
              isFullscreen={carouselFullscreen}
              onFullscreenChange={setCarouselFullscreen}
            />
          <div/>

          {/* Gallery */}
          <div className="ad-detail-gallery-container">
            <ImageGallery
              images={galleryImages}
              adName={ad.name}
              currentIndex={currentIndex}
              onThumbnailClick={setCurrentIndex}
              onOpenFullscreen={() => {
                setCurrentIndex(0);       // Always start from first image
                setCarouselFullscreen(true);
              }}
              onChangeIndex={setCurrentIndex}  // Required for +x overlay
            />
          </div>

        </div>



          {/* Ad Info */}
          <div className="ad-detail-info">
            <p className="price-label">Price</p>
            <p className="price">{formatPrice(ad.price)}</p>
            <p><strong>Location:</strong> {ad.location}</p>
            <p><strong>Description:</strong> {ad.description}</p>
            <p><strong>Posted:</strong> {formatPostDate(ad._createTime)}</p>
            {renderAdSpecificDetails()}

            {!isMyAd && <ContactDetails adId={ad._id} adName={ad.name} />}

            {isMyAd && (
              <>
                <div className="boost-ad-section">
                  <button className="boost-ad-detail" onClick={handleBoostAd}><FaRocket />Boost Ad</button>
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
          </div>
        </div>
      </div>

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