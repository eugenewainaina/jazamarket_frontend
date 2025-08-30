import React from "react";
import "./Ad.css";
import type { BaseAd, PropertyAd, VehicleAd } from "../../types/ads";
import { formatPostDate, truncateText } from "../../utils/formatters";
import PackageIcon from "../PackageIcon/PackageIcon";

type AdProps = {
  ad: BaseAd | VehicleAd | PropertyAd;
  onClick: () => void;
  isSelected: boolean;
};

const Ad: React.FC<AdProps> = ({ ad, onClick, isSelected }) => {
  const formatPrice = (price: string | number) => {
    const numericPrice =
      typeof price === "string" ? parseFloat(price.replace(/,/g, "")) : price;
    if (isNaN(numericPrice)) {
      return "Invalid Price";
    }
    return `KSh ${numericPrice.toLocaleString()}`;
  };

  // Check if ad should have golden background (all packages except Explorer)
  const hasGoldenBackground = ad.package && ad.package !== 'Explorer';

  return (
    <div className={`ad-card ${isSelected ? 'selected' : ''} ${hasGoldenBackground ? 'premium-ad' : ''}`} onClick={onClick}>
      <div className="ad-image-container">
        {ad.adImageURL ? (
          <img src={ad.adImageURL} alt={ad.name} className="ad-image" />
        ) : (
          <div className="ad-image-placeholder" />
        )}
        {/* Package icon positioned at bottom right of the image */}
        <PackageIcon packageName={ad.package} size={24} />
      </div>
      <div className="ad-details">
        <h3 className="ad-name">{ad.name}</h3>
        <p className="ad-description">{truncateText(ad.description, 80)}</p>
        <p className="ad-posted-date">{formatPostDate(ad._createTime)}</p>
        <p className="ad-location">{ad.location}</p>
        <p className="ad-price">{formatPrice(ad.price)}</p>
      </div>
    </div>
  );
};

export default Ad;
