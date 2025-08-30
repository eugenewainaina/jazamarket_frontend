import React, { useEffect, useState, useRef } from "react";
import Ad from "../Ad/Ad";
import AdDetailView from "../AdDetailView/AdDetailView";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import type { BaseAd } from "../../types/ads";
import { createApiUrl } from "../../utils/api";
import { sortAdsByPackagePriority } from "../../utils/packagePriority";
import "./HotDeals.css";

// Define the hot deals ad type
interface HotDealsAd {
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
  _createTime: string;
}

interface HotDealsProps {
  category?: string; // Optional category parameter for filtering
}

const HotDeals: React.FC<HotDealsProps> = ({ category }) => {
  const [ads, setAds] = useState<HotDealsAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAd, setSelectedAd] = useState<HotDealsAd | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHotDealsAds = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Build URL with optional category parameter
        let url = '/hot_deals_ads';
        if (category) {
          url += `?category=${encodeURIComponent(category)}`;
        }
        
        const response = await fetch(createApiUrl(url));
        
        if (!response.ok) {
          throw new Error(`Failed to fetch hot deals ads: ${response.status} ${response.statusText}`);
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
        console.error('Error fetching hot deals ads:', err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setAds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotDealsAds();
  }, [category]); // Re-fetch when category changes

  // Auto-scroll functionality with infinite loop
  useEffect(() => {
    if (!scrollContainerRef.current || ads.length === 0) return;

    const container = scrollContainerRef.current;
    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame - slower for smoother effect
    let isScrolling = true;

    // Only enable auto-scroll if we have enough ads to make it worthwhile
    const shouldAutoScroll = ads.length >= 3;
    
    if (!shouldAutoScroll) return;

    const autoScroll = () => {
      if (!container || !isScrolling) return;

      scrollPosition += scrollSpeed;
      
      // Calculate the width of one set of ads (half the total scroll width since we duplicate)
      const singleSetWidth = container.scrollWidth / 2;
      
      // Reset position when we've scrolled through one complete set
      if (scrollPosition >= singleSetWidth) {
        scrollPosition = 0;
      }

      container.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(autoScroll);
    };

    // Start auto-scrolling after a brief delay
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(autoScroll);
    }, 1000);

    // Pause on hover
    const handleMouseEnter = () => {
      isScrolling = false;
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      isScrolling = true;
      animationId = requestAnimationFrame(autoScroll);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ads]);

  const handleAdClick = (ad: HotDealsAd) => {
    if (selectedAd && selectedAd._id === ad._id) {
      setSelectedAd(null); // Deselect if the same ad is clicked again
    } else {
      setSelectedAd(ad);
    }
  };

  const handleCloseDetailView = () => {
    setSelectedAd(null);
  };

  // Convert HotDealsAd to BaseAd format for the Ad component
  const convertToBaseAd = (hotDealsAd: HotDealsAd): BaseAd => ({
    _id: hotDealsAd._id,
    name: hotDealsAd.name,
    description: hotDealsAd.description,
    location: hotDealsAd.location,
    price: hotDealsAd.price,
    category: hotDealsAd.category,
    subcategory: hotDealsAd.subcategory,
    adImageURL: hotDealsAd.adImageURL,
    accountID: hotDealsAd.accountID,
    _createTime: hotDealsAd._createTime,
    package: hotDealsAd.package,
  });

  if (loading) {
    return (
      <div className="hot-deals-section">
        <h2 className="hot-deals-title">Hot 🔥 Deals</h2>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="hot-deals-section">
        <h2 className="hot-deals-title">Hot 🔥 Deals</h2>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!ads || ads.length === 0) {
    return null; // Don't show anything if there are no ads
  }

  return (
    <div className="hot-deals-section">
      <h2 className="hot-deals-title">Hot 🔥 Deals</h2>
      <div className="hot-deals-container" ref={scrollContainerRef}>
        <div className="hot-deals-scroll">
          {/* First set of ads */}
          {ads.map((ad) => {
            const baseAd = convertToBaseAd(ad);
            return (
              <div key={`first-${ad._id}`} className="hot-deals-item">
                <Ad
                  ad={baseAd}
                  onClick={() => handleAdClick(ad)}
                  isSelected={selectedAd?._id === ad._id}
                />
              </div>
            );
          })}
          {/* Duplicate set of ads for infinite loop - only if we have enough ads */}
          {ads.length >= 3 && ads.map((ad) => {
            const baseAd = convertToBaseAd(ad);
            return (
              <div key={`second-${ad._id}`} className="hot-deals-item">
                <Ad
                  ad={baseAd}
                  onClick={() => handleAdClick(ad)}
                  isSelected={selectedAd?._id === ad._id}
                />
              </div>
            );
          })}
        </div>
      </div>
      {selectedAd && (
        <AdDetailView 
          ad={convertToBaseAd(selectedAd)} 
          onClose={handleCloseDetailView} 
          isMyAd={false} 
        />
      )}
    </div>
  );
};

export default HotDeals;
