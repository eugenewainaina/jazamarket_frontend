import React, { useEffect, useState } from "react";
import Ad from "../Ad/Ad";
import AdDetailView from "../AdDetailView/AdDetailView";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import type { BaseAd } from "../../types/ads";
import { createApiUrl } from "../../utils/api";
import { sortAdsByPackagePriority } from "../../utils/packagePriority";
import "./HomepageAds.css";

// Define the homepage ad type based on the provided structure
interface HomepageAd {
  _id: string;
  accountID: string;
  price: string;
  name: string;
  description: string;
  location: string;
  adImageURL: string;
  category: string;
  subcategory: string;
  package: string;
  expiry: string;
}

const HomepageAds: React.FC = () => {
  const [ads, setAds] = useState<HomepageAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAd, setSelectedAd] = useState<HomepageAd | null>(null);

  useEffect(() => {
    const fetchHomepageAds = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(createApiUrl('/homepage_ads'));
        
        if (!response.ok) {
          throw new Error(`Failed to fetch homepage ads: ${response.status} ${response.statusText}`);
        }
        
        const text = await response.text();
        let data = [];
        
        if (text.trim()) {
          try {
            data = JSON.parse(text);
          } catch (parseError) {
            console.warn('Failed to parse response as JSON:', parseError);
            data = [];
          }
        }
        
        // Ensure data is always an array
        const adsArray = Array.isArray(data) ? data : [];
        
        // Sort ads by package priority (highest priority first)
        const sortedAds = sortAdsByPackagePriority(
          adsArray,
          (ad) => ad.package || 'Explorer' // Default to Explorer if no package specified
        );
        
        setAds(sortedAds);
      } catch (err) {
        console.error('Error fetching homepage ads:', err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setAds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageAds();
  }, []);

  const handleAdClick = (ad: HomepageAd) => {
    if (selectedAd && selectedAd._id === ad._id) {
      setSelectedAd(null); // Deselect if the same ad is clicked again
    } else {
      setSelectedAd(ad);
    }
  };

  const handleCloseDetailView = () => {
    setSelectedAd(null);
  };

  // Convert HomepageAd to BaseAd format for the Ad component
  const convertToBaseAd = (homepageAd: HomepageAd): BaseAd => ({
    _id: homepageAd._id,
    name: homepageAd.name,
    description: homepageAd.description,
    location: homepageAd.location,
    price: homepageAd.price,
    category: homepageAd.category,
    subcategory: homepageAd.subcategory,
    adImageURL: homepageAd.adImageURL,
    accountID: homepageAd.accountID,
    _createTime: homepageAd.expiry, // Using expiry as createTime since it's not provided
    package: homepageAd.package,
  });

  if (loading) {
    return (
      <div className="homepage-ads-section">
        <h2 className="homepage-ads-title">Trending Ads</h2>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage-ads-section">
        <h2 className="homepage-ads-title">Trending Ads</h2>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!ads || ads.length === 0) {
    return null; // Don't show anything if there are no ads
  }

  return (
    <div className="homepage-ads-section">
      <h2 className="homepage-ads-title">Trending Ads</h2>
      <div className="homepage-ads-grid">
        {ads.map((ad) => {
          const baseAd = convertToBaseAd(ad);
          return (
            <React.Fragment key={ad._id}>
              <Ad
                ad={baseAd}
                onClick={() => handleAdClick(ad)}
                isSelected={selectedAd?._id === ad._id}
              />
              {selectedAd && selectedAd._id === ad._id && (
                <AdDetailView 
                  ad={convertToBaseAd(selectedAd)} 
                  onClose={handleCloseDetailView} 
                  isMyAd={false} 
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default HomepageAds;
