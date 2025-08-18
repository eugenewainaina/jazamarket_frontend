import React from 'react';
import Categories from '../../components/Categories/Categories';
import BannerCarousel from '../../components/Banner/BannerCarousel';
import HomepageAds from '../../components/HomepageAds/HomepageAds';
import { useSEO } from '../../hooks/useSEO';
import { categoryNameToKey } from '../../utils/formatters';
import './HomePage.css';

const HomePage: React.FC = () => {
  // Apply default SEO metadata for home page
  useSEO({
    customTitle: "JazaMarket - Buy & Sell in Kenya | Kenya's Trusted Marketplace",
    customDescription: "Kenya's leading marketplace for buying and selling. Find great deals on vehicles, electronics, property, jobs, and more. Join thousands of buyers and sellers on JazaMarket.",
    ogUrl: window.location.href,
  });

  // Define banners for the carousel
  const topBanners = [
    {
      imageUrl: "/banners/top-home-banner.png",
      linkTo: `/category/${categoryNameToKey('Vehicles')}`,
      altText: "Top Promotional Banner"
    },
    {
      imageUrl: "/banners/autospot-kenya-banner.png",
      linkTo: `/category/${categoryNameToKey('Vehicles')}`,
      altText: "Autospot Kenya - Drive Quality, Drive Confidence"
    }
  ];

  const bottomBanners = [
    {
      imageUrl: "/banners/bottom-home-banner.png",
      linkTo: `/category/${categoryNameToKey('Property & Rentals')}`,
      altText: "Bottom Promotional Banner"
    },
    {
      imageUrl: "/banners/autospot-kenya-banner.png",
      linkTo: `/category/${categoryNameToKey('Vehicles')}`,
      altText: "Autospot Kenya - Drive Quality, Drive Confidence"
    }
  ];

  return (
    <div className="homepage-container">
      <BannerCarousel
        banners={topBanners}
        className="top-banner"
      />
      <Categories />
      <HomepageAds />
      <BannerCarousel
        banners={bottomBanners}
        className="bottom-banner"
      />
    </div>
  );
};

export default HomePage;
