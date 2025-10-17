import React, { useEffect, useRef, useState } from "react";
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
  imageLinks?: string[];
  galleryURL?: string[];
  category: string;
  subcategory: string;
  package: string;
  _createTime: string;
}

const PAGE_SIZE = 8; // Number of ads to load per batch

const HomepageAds: React.FC = () => {
  const [ads, setAds] = useState<HomepageAd[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAd, setSelectedAd] = useState<HomepageAd | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Step 1: Fetch first page
  useEffect(() => {
    const fetchHomepageAds = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          createApiUrl(`/homepage_ads_v2?page=0&limit=${PAGE_SIZE}`)
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch homepage ads: ${response.status} ${response.statusText}`);
        }

        const data: HomepageAd[] = await response.json();

        const sortedAds = sortAdsByPackagePriority(
          data,
          (ad) => ad.package || "Explorer"
        );

        setAds(sortedAds);
        setHasMore(sortedAds.length === PAGE_SIZE); // assume more if batch full
      } catch (err) {
        console.error("Error fetching homepage ads:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageAds();
  }, []);

  // Step 2: Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMoreAds();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 800px 0px", // start loading when near bottom
        threshold: 0.1,
      }
    );

    observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loadingMore, ads]);

  // Step 3: Fetch next page from backend
  const loadMoreAds = async () => {
    try {
      setLoadingMore(true);
      const nextPage = page + 1;

      const response = await fetch(
        createApiUrl(`/homepage_ads_v2?page=${nextPage}&limit=${PAGE_SIZE}`)
      );

      if (!response.ok) {
        throw new Error(`Failed to load more ads: ${response.status}`);
      }

      const newData: HomepageAd[] = await response.json();
      const sortedNewAds = sortAdsByPackagePriority(
        newData,
        (ad) => ad.package || "Explorer"
      );

      setAds((prev) => [...prev, ...sortedNewAds]);
      setPage(nextPage);
      setHasMore(sortedNewAds.length === PAGE_SIZE);
    } catch (err) {
      console.error("Error loading more ads:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoadingMore(false);
    }
  };

  const handleAdClick = (ad: HomepageAd) => {
    if (selectedAd && selectedAd._id === ad._id) {
      setSelectedAd(null);
    } else {
      setSelectedAd(ad);
    }
  };

  const handleCloseDetailView = () => {
    setSelectedAd(null);
  };

  const convertToBaseAd = (homepageAd: HomepageAd): BaseAd => {
    const allImages = [
      ...(homepageAd.imageLinks || []),
      ...(homepageAd.galleryURL || []),
    ];
    return {
      _id: homepageAd._id,
      name: homepageAd.name,
      description: homepageAd.description,
      location: homepageAd.location,
      price: homepageAd.price,
      category: homepageAd.category,
      subcategory: homepageAd.subcategory,
      adImageURL: homepageAd.adImageURL,
      imageLinks: allImages,
      accountID: homepageAd.accountID,
      _createTime: homepageAd._createTime,
      package: homepageAd.package,
    };
  };

  // Step 4: Loading / Error states
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
    return null;
  }

  // Step 5: Render ads and sentinel
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

      {/* Infinite Scroll Sentinel */}
      <div ref={loaderRef} style={{ height: "40px", marginTop: "20px" }}>
        {loadingMore && <LoadingSpinner small />}
        {!hasMore && <p className="no-more-ads">No more ads to show</p>}
      </div>
    </div>
  );
};

export default HomepageAds;