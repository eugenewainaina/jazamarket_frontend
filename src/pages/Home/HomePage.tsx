import React from 'react';
import Categories from '../../components/Categories/Categories';
import Banner from '../../components/Banner/Banner';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      <Banner
        imageUrl="/banners/top-home-banner.png"
        linkTo="/categories/Vehicles"
        altText="Top Promotional Banner"
        className="top-banner"
      />
      <Categories />
      <Banner
        imageUrl="/banners/bottom-home-banner.png"
        linkTo="/categories/Property%20&%20Rentals"
        altText="Bottom Promotional Banner"
        className="bottom-banner"
      />
    </div>
  );
};

export default HomePage;
