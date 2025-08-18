import React, { useState, useEffect, useCallback } from 'react';
import './MyAds.css';
import PostAdForm from '../../components/PostAdForm/PostAdForm';
import type { MyAdSummary } from '../../types/ads';
import Ad from '../../components/Ad/Ad';
import AdDetailView from '../../components/AdDetailView/AdDetailView';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import BoostPackagesPopup from '../../components/BoostPackagesPopup/BoostPackagesPopup';
import { createApiUrl } from '../../utils/api';
import { FaRocket } from 'react-icons/fa';

const MyAds: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [ads, setAds] = useState<MyAdSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState<MyAdSummary | null>(null);
  const [showBoostPopup, setShowBoostPopup] = useState(false);

  const CACHE_KEY = 'dashboard_my_ads_cache';

  const fetchAds = useCallback(async (forceRefresh = false) => {
    // Check if we have cached data and don't force refresh
    if (!forceRefresh) {
      const cachedData = sessionStorage.getItem(CACHE_KEY);
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setAds(parsedData);
          setIsLoading(false);
          return; // Use cached data, don't fetch
        } catch (error) {
          console.error('Error parsing cached data:', error);
          // If cache is corrupted, continue to fetch fresh data
        }
      }
    }

    // Fetch fresh data from API
    setIsLoading(true);
    try {
      const response = await fetch(createApiUrl('/my_ads'), {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch ads');
      }
      const text = await response.text();
      const data = text ? JSON.parse(text) : [];
      const validAds = Array.isArray(data) ? data.filter(ad => ad && ad._id) : [];
      
      // Sort by posting date (newest first)
      const sortedAds = validAds.sort((a, b) => {
        const dateA = new Date(a._createTime).getTime();
        const dateB = new Date(b._createTime).getTime();
        return dateB - dateA; // Newest first
      });
      
      setAds(sortedAds);
      
      // Cache the fresh data
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(sortedAds));
    } catch (error) {
      console.error('Error fetching ads:', error);
      setAds([]);
    } finally {
      setIsLoading(false);
    }
  }, [CACHE_KEY]);

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
    fetchAds(true); // Force refresh after posting new ad
  };

  const handleBoostAdClick = () => {
    // Open the boost packages popup
    setShowBoostPopup(true);
  };

  const handleCloseBoostPopup = () => {
    setShowBoostPopup(false);
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
          <div className="my-ads-buttons">
            <button className="boost-ad-btn" onClick={handleBoostAdClick}>
              <FaRocket />
              Boost Ad
            </button>
            <button className="post-ad-btn" onClick={handlePostAdClick}>Post Ad</button>
          </div>
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
                      onAdUpdated={() => fetchAds(true)} // Force refresh after ad update
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
      
      {/* Boost Packages Popup */}
      <BoostPackagesPopup
        isOpen={showBoostPopup}
        onClose={handleCloseBoostPopup}
        adCategory="general"
      />
    </>
  );
};

export default MyAds;
