import React, { useEffect, useState, useRef } from "react";
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

const PAGE_SIZE = 10; // number of ads per page

const AdCategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const displayCategoryName = categoryName || "";

  const [allAds, setAllAds] = useState<(BaseAd | VehicleAd | PropertyAd)[]>([]);
  const [ads, setAds] = useState<(BaseAd | VehicleAd | PropertyAd)[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAd, setSelectedAd] = useState<BaseAd | VehicleAd | PropertyAd | null>(null);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useSEO({
    category: categoryName,
    ogUrl: window.location.href,
  });

  // Step 1: Fetch all ads once for the category
  useEffect(() => {
    const fetchCategoryAds = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          createApiUrl(`/2bf73dc1-0fe5-4e0b-aa4b-10f32ede6f4a/${displayCategoryName}`)
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch ads: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        let data = [];

        if (text.trim()) {
          try {
            data = JSON.parse(text);
          } catch (parseError) {
            console.warn("Failed to parse response as JSON:", parseError);
            data = [];
          }
        }

        const adsArray = Array.isArray(data) ? data : [];

        const sortedAds = sortAdsByPackagePriority(
          adsArray,
          (ad) => ad.package || "Explorer"
        );

        // Store all ads and display first page
        setAllAds(sortedAds);
        setAds(sortedAds.slice(0, PAGE_SIZE));
        setHasMore(sortedAds.length > PAGE_SIZE);
        setPage(0);
      } catch (err) {
        console.error("Error fetching ads:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setAds([]);
      } finally {
        setLoading(false);
      }
    };

    if (displayCategoryName) fetchCategoryAds();
  }, [displayCategoryName]);

  // Step 2: Infinite Scroll Trigger
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMoreAds();
        }
      },
      {
        rootMargin: "0px 0px 800px 0px", // trigger earlier
        threshold: 0.1,
      }
    );

    observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loadingMore, ads]);

  // Step 3: Load next batch
  const loadMoreAds = () => {
    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const start = nextPage * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const newAds = allAds.slice(start, end);

      setAds((prev) => [...prev, ...newAds]);
      setPage(nextPage);
      setHasMore(end < allAds.length);
      setLoadingMore(false);
    }, 400); // slight delay for UX
  };

  const handleAdClick = (ad: BaseAd | VehicleAd | PropertyAd) => {
    if (selectedAd && selectedAd._id === ad._id) {
      setSelectedAd(null);
    } else {
      setSelectedAd(ad);
    }
  };

  const handleCloseDetailView = () => {
    setSelectedAd(null);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="category-page">
      <BannerCarousel
        banners={[
          {
            imageUrl: "/banners/top-category-banner.png",
            altText: "Top of Category Banner",
            linkTo: "/some-link",
          },
        ]}
        className="top-category-banner"
      />
      <h1 className="category-title">{displayCategoryName}</h1>
      <HotDeals category={displayCategoryName} />

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
          <div className="no-ads-message">
            <p>No ads found in this category.</p>
            {error && <p className="error-details">Error: {error}</p>}
          </div>
        )}
      </div>

      {/* Infinite Scroll Sentinel */}
      <div ref={loaderRef} className="loader-trigger">
        {loadingMore && <LoadingSpinner small/>}
        {!hasMore && <p className="no-more-ads">No more ads to show</p>}
      </div>
    </div>
  );
};

export default AdCategoryPage;