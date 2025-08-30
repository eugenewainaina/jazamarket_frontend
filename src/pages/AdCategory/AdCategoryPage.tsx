import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ad from "../../components/Ad/Ad";
import AdDetailView from "../../components/AdDetailView/AdDetailView";
import BannerCarousel from "../../components/Banner/BannerCarousel";
import HotDeals from "../../components/HotDeals/HotDeals";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import type { BaseAd, VehicleAd, PropertyAd } from "../../types/ads";
import { createApiUrl } from "../../utils/api";
import { sortAdsByPackagePriority } from "../../utils/packagePriority";
import { useSEO } from "../../hooks/useSEO";
import "./AdCategoryPage.css";

const AdCategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [ads, setAds] = useState<(BaseAd | VehicleAd | PropertyAd)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAd, setSelectedAd] = useState<BaseAd | VehicleAd | PropertyAd | null>(null);

  // Use category name directly for SEO and display
  const displayCategoryName = categoryName || '';

  // Apply SEO metadata for this category
  useSEO({
    category: categoryName,
    ogUrl: window.location.href,
  });

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const response = await fetch(
          createApiUrl(`/2bf73dc1-0fe5-4e0b-aa4b-10f32ede6f4a/${displayCategoryName}`)
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ads: ${response.status} ${response.statusText}`);
        }
        
        // Handle empty response body
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
        
        // Ensure data is always an array, even if backend returns null/undefined
        const adsArray = Array.isArray(data) ? data : [];
        
        // Sort ads by package priority
        const sortedAds = sortAdsByPackagePriority(
          adsArray,
          (ad) => ad.package || 'Explorer' // Default to Explorer if no package specified
        );
        
        setAds(sortedAds);
      } catch (err) {
        console.error('Error fetching ads:', err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setAds([]); // Set ads to empty array on error
      } finally {
        setLoading(false);
      }
    };

    if (displayCategoryName) {
      fetchAds();
    }
  }, [displayCategoryName]);

  const handleAdClick = (ad: BaseAd | VehicleAd | PropertyAd) => {
    if (selectedAd && selectedAd._id === ad._id) {
      setSelectedAd(null); // Deselect if the same ad is clicked again
    } else {
      setSelectedAd(ad);
    }
  };

  const handleCloseDetailView = () => {
    setSelectedAd(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="category-page">
      <BannerCarousel
        banners={[{
          imageUrl: "/banners/top-category-banner.png",
          altText: "Top of Category Banner",
          linkTo: "/some-link"
        }]}
        className="top-category-banner"
      />
      <h1 className="category-title">{displayCategoryName}</h1>
      
      {/* Hot Deals section for this category */}
      <HotDeals category={displayCategoryName} />
      
      <div className="ads-grid">
        {Array.isArray(ads) && ads.length > 0 ? (
          ads.filter(ad => ad && ad._id).map((ad) => (
            <React.Fragment key={ad._id}>
              <Ad
                ad={ad}
                onClick={() => handleAdClick(ad)}
                isSelected={selectedAd?._id === ad._id}
              />
              {selectedAd && selectedAd._id === ad._id && (
                <AdDetailView ad={selectedAd} onClose={handleCloseDetailView} isMyAd={false} />
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="no-ads-message">
            <p>No ads found in this category.</p>
            {error && <p className="error-details">Error: {error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdCategoryPage;
