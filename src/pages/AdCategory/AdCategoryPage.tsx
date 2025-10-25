import React, { useEffect, useRef, useState } from "react";
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

const PAGE_SIZE = 8;

const AdCategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const displayCategoryName = categoryName || "";

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

  // 🔹 Fetch ads from backend
const fetchCategoryAds = async (pageNum: number) => {
  try {
    const offset = pageNum * PAGE_SIZE;
    const url = createApiUrl(
      `/ce498158-a94b-43d6-b52b-c9d4efd5f33f/get_category_ads_v2/${displayCategoryName}?page=${offset}&limit=${PAGE_SIZE}`
    );

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ads: ${response.statusText}`);

    const text = await response.text();
    const data = text.trim() ? JSON.parse(text) : [];
    const adsArray = Array.isArray(data) ? data : [];

    const sortedAds = sortAdsByPackagePriority(adsArray, (ad) => ad.package || "Explorer");

    if (pageNum === 0) setAds(sortedAds);
    else setAds((prev) => [...prev, ...sortedAds]);

    setHasMore(sortedAds.length === PAGE_SIZE);
  } catch (err) {
    console.error("Error fetching category ads:", err);
    setError(err instanceof Error ? err.message : "An unknown error occurred");
  } finally {
    setLoading(false);
    setLoadingMore(false);
  }
};


  // 🔹 On category change, reset + fetch first page
  useEffect(() => {
    if (!displayCategoryName) return;
    setAds([]);
    setPage(0);
    setHasMore(true);
    setLoading(true);
    fetchCategoryAds(0);
  }, [displayCategoryName]);

  // 🔹 Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          setLoadingMore(true);
          const nextPage = page + 1;
          setPage(nextPage);
          fetchCategoryAds(nextPage);
        }
      },
      { rootMargin: "0px 0px 1000px 0px", threshold: 0.1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, page, ads]);



  const handleAdClick = (ad: BaseAd | VehicleAd | PropertyAd) => {
    setSelectedAd((prev) => (prev && prev._id === ad._id ? null : ad));
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
                <AdDetailView
                  ad={selectedAd}
                  onClose={() => setSelectedAd(null)}
                  isMyAd={false}
                />
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="no-ads-message">
            <p>No ads found in this category.</p>
          </div>
        )}
      </div>


      <div ref={loaderRef} style={{ height: "40px", marginTop: "20px" }}>
        {loadingMore && <LoadingSpinner small />}
        {!hasMore && <p className="no-more-ads">No more ads to show</p>}
      </div>

  
    </div>
  );
};

export default AdCategoryPage;