import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ad from "../../components/Ad/Ad";
import AdDetailView from "../../components/AdDetailView/AdDetailView";
import Banner from "../../components/Banner/Banner";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import type { BaseAd, VehicleAd, PropertyAd } from "../../types/ads";
import "./AdCategoryPage.css";

const AdCategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [ads, setAds] = useState<(BaseAd | VehicleAd | PropertyAd)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAd, setSelectedAd] = useState<BaseAd | VehicleAd | PropertyAd | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/2bf73dc1-0fe5-4e0b-aa4b-10f32ede6f4a/${categoryName}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch ads");
        }
        const data = await response.json();
        setAds(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchAds();
    }
  }, [categoryName]);

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
      <Banner
        imageUrl="/banners/top-category-banner.png"
        altText="Top of Category Banner"
        linkTo="/some-link"
      />
      <h1 className="category-title">{categoryName}</h1>
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
                <AdDetailView ad={selectedAd} onClose={handleCloseDetailView} isMyAd={false} />
              )}
            </React.Fragment>
          ))
        ) : (
          <p>No ads found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default AdCategoryPage;
