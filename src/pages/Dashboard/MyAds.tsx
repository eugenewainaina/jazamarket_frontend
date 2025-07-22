import React, { useState, useEffect, useCallback } from 'react';
import './MyAds.css';
import PostAdForm from '../../components/PostAdForm/PostAdForm';
import type { MyAdSummary } from '../../types/ads';
import Ad from '../../components/Ad/Ad';
import AdDetailView from '../../components/AdDetailView/AdDetailView';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const MyAds: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [ads, setAds] = useState<MyAdSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState<MyAdSummary | null>(null);

  const fetchAds = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/my_ads', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch ads');
      }
      const text = await response.text();
      const data = text ? JSON.parse(text) : [];
      const validAds = Array.isArray(data) ? data.filter(ad => ad && ad._id) : [];
      setAds(validAds);
    } catch (error) {
      console.error('Error fetching ads:', error);
      setAds([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const handlePostAdClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAdPosted = () => {
    console.log('Ad posted successfully!');
    setShowModal(false);
    fetchAds();
  };

  const handleAdClick = (ad: MyAdSummary) => {
    if (selectedAd && selectedAd._id === ad._id) {
      setSelectedAd(null); // Deselect if the same ad is clicked again
    } else {
      setSelectedAd(ad);
    }
  };

  const handleCloseDetailView = () => {
    setSelectedAd(null);
  };

  return (
    <>
      <div className="my-ads-container">
        <div className="my-ads-header">
          <h3>My Ads</h3>
          <button className="post-ad-btn" onClick={handlePostAdClick}>Post Ad</button>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="ads-grid">
            {ads.length > 0 ? (
              ads.map((ad) => (
                <React.Fragment key={ad._id}>
                  <Ad
                    ad={ad}
                    onClick={() => handleAdClick(ad)}
                    isSelected={selectedAd?._id === ad._id}
                  />
                  {selectedAd && selectedAd._id === ad._id && (
                    <AdDetailView
                      ad={selectedAd}
                      onClose={handleCloseDetailView}
                      isMyAd={true}
                      onAdUpdated={fetchAds} // Pass the fetchAds function
                    />
                  )}
                </React.Fragment>
              ))
            ) : (
              <div className="no-results">
                <p>No results!</p>
              </div>
            )}
          </div>
        )}
      </div>
      {showModal && <PostAdForm onClose={handleCloseModal} onSuccess={handleAdPosted} />}
    </>
  );
};

export default MyAds;
