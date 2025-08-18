import React from 'react';
import './BoostPackagesPopup.css';

interface Package {
    name: string;
    listings: number | string;
    powerUpLevel: string;
    price1_3_6_12: string[];
    description?: string;
}

interface CategoryPackages {
    category: string;
    packages: Package[];
}

interface BoostPackagesPopupProps {
    isOpen: boolean;
    onClose: () => void;
    adCategory: string;
}

const BoostPackagesPopup: React.FC<BoostPackagesPopupProps> = ({
    isOpen,
    onClose
}) => {
    if (!isOpen) return null;

    // Package data based on the provided images
    const categoryPackages: CategoryPackages[] = [
        {
            category: "Vehicles",
            packages: [
                {
                    name: "Starter Pack",
                    listings: "Unlimited Ads",
                    powerUpLevel: "●●○○○",
                    price1_3_6_12: ["KSh 2,299", "5,799", "10,999", "19,999"]
                },
                {
                    name: "Momentum",
                    listings: "20 Ads",
                    powerUpLevel: "●●●○○",
                    price1_3_6_12: ["KSh 5,099", "12,999", "23,999", "42,999"]
                },
                {
                    name: "Accelerate",
                    listings: "50 Ads",
                    powerUpLevel: "●●●●○",
                    price1_3_6_12: ["KSh 7,399", "18,999", "33,999", "59,999"]
                },
                {
                    name: "Pro Launch",
                    listings: "100 Ads",
                    powerUpLevel: "●●●●●",
                    price1_3_6_12: ["KSh 9,449", "23,999", "42,999", "74,999"]
                }
            ]
        },
        {
            category: "Property & Rentals",
            packages: [
                {
                    name: "Starter Pack",
                    listings: "10 Ads",
                    powerUpLevel: "●●●○○",
                    price1_3_6_12: ["KSh 1,949", "4,899", "8,999", "15,999"]
                },
                {
                    name: "Momentum",
                    listings: "30 Ads",
                    powerUpLevel: "●●●●○",
                    price1_3_6_12: ["KSh 2,899", "7,299", "13,499", "23,999"]
                },
                {
                    name: "Accelerate",
                    listings: "50 Ads",
                    powerUpLevel: "●●●●○",
                    price1_3_6_12: ["KSh 3,949", "9,999", "17,999", "31,999"]
                },
                {
                    name: "Pro Launch",
                    listings: "100 Ads",
                    powerUpLevel: "●●●●●",
                    price1_3_6_12: ["KSh 4,799", "12,199", "21,999", "38,999"]
                }
            ]
        },
        {
            category: "Others",
            packages: [
                {
                    name: "Starter Pack",
                    listings: "Unlimited Ads",
                    powerUpLevel: "●●○○○",
                    price1_3_6_12: ["KSh 1,649", "4,099", "7,799", "13,999"]
                },
                {
                    name: "Momentum",
                    listings: "Unlimited Ads",
                    powerUpLevel: "●●●○○",
                    price1_3_6_12: ["KSh 3,599", "8,999", "16,999", "29,999"]
                },
                {
                    name: "Accelerate",
                    listings: "Unlimited Ads",
                    powerUpLevel: "●●●●○",
                    price1_3_6_12: ["KSh 5,349", "13,499", "24,999", "43,999"]
                },
                {
                    name: "Pro Launch",
                    listings: "Unlimited Ads",
                    powerUpLevel: "●●●●●",
                    price1_3_6_12: ["KSh 7,649", "18,499", "33,999", "59,999"]
                }
            ]
        }
    ];

    const allInOnePackages: Package[] = [
        {
            name: "Pinnacle Silver",
            listings: "120 Vehicles, 150 Property & Rentals, Full Others",
            powerUpLevel: "Full",
            price1_3_6_12: ["KSh 11,449", "28,499", "51,999", "89,999"]
        },
        {
            name: "Pinnacle Elite",
            listings: "150 Vehicles, 200 Property & Rentals, Full Others",
            powerUpLevel: "Full",
            price1_3_6_12: ["KSh 14,149", "34,999", "63,999", "109,999"]
        },
        {
            name: "Maximizer Gold",
            listings: "250 Vehicles, Unlimited Property & Rentals, Full Others",
            powerUpLevel: "Full",
            price1_3_6_12: ["KSh 18,699", "45,999", "84,999", "149,999"]
        },
        {
            name: "Maximizer Pro",
            listings: "750 Vehicles, Unlimited Property & Rentals, Full Others",
            powerUpLevel: "Full",
            price1_3_6_12: ["KSh 47,399", "109,999", "199,999", "349,999"]
        },
        {
            name: "Infinity Suite",
            listings: "Unlimited Vehicles, Unlimited Property & Rentals, Unlimited Others",
            powerUpLevel: "Full",
            price1_3_6_12: ["KSh 74,549", "189,999", "299,999", "529,999"]
        }
    ];

    const handleGetPackage = (packageName: string) => {
        // Placeholder function - doesn't do anything yet as requested
        console.log(`Get Package clicked for: ${packageName}`);
    };

    const renderPackageCard = (pkg: Package) => (
        <div key={pkg.name} className="package-card">
            <div className="package-header">
                <h3 className="package-name">{pkg.name}</h3>
                <div className="package-listings">{pkg.listings}</div>
            </div>
            <div className="package-details">
                <div className="power-up-level">
                    <span className="power-up-label">Power-Up Level:</span>
                    <span className="power-up-dots">{pkg.powerUpLevel}</span>
                </div>
                <div className="package-pricing">
                    <div className="pricing-row">
                        <span className="duration">1 Month:</span>
                        <span className="price">{pkg.price1_3_6_12[0]}</span>
                    </div>
                    <div className="pricing-row">
                        <span className="duration">3 Months:</span>
                        <span className="price">{pkg.price1_3_6_12[1]}</span>
                    </div>
                    <div className="pricing-row">
                        <span className="duration">6 Months:</span>
                        <span className="price">{pkg.price1_3_6_12[2]}</span>
                    </div>
                    <div className="pricing-row">
                        <span className="duration">12 Months:</span>
                        <span className="price">{pkg.price1_3_6_12[3]}</span>
                    </div>
                </div>
            </div>
            <button
                className="get-package-btn"
                onClick={() => handleGetPackage(pkg.name)}
            >
                Get Package
            </button>
        </div>
    );

    return (
        <div className="boost-packages-overlay">
            <div className="boost-packages-popup">
                <div className="popup-header">
                    <h2>Freemium-to-premium classifieds system for JazaMarket</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="popup-content">
                    <div className="free-plan-section">
                        <h3>1. FREE PLAN ("Explorer")</h3>
                        <p>This is the default plan for all new users across all categories:</p>
                        <div className="free-plan-details">
                            <div className="free-plan-grid">
                                <div>
                                    <strong>Section:</strong>
                                    <div>Vehicles</div>
                                    <div>Property & Rentals</div>
                                    <div>Others (Jobs, Electronics, etc.)</div>
                                </div>
                                <div>
                                    <strong>Access:</strong>
                                    <div>Unlimited listings with limited visibility only</div>
                                    <div>Max 2 listings, no premium boosts</div>
                                    <div>Unlimited listings with limited exposure</div>
                                </div>
                            </div>
                            <div className="free-plan-features">
                                <h4>Features:</h4>
                                <ul>
                                    <li>No badges</li>
                                    <li>Lower search visibility</li>
                                    <li>Ads expire after 30 days</li>
                                    <li>Cannot appear on homepage or top-of-category</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="paid-packages-section">
                        <h3>2. PAID PACKAGES (Based on Category)</h3>
                        {categoryPackages.map(categoryGroup => (
                            <div key={categoryGroup.category} className="category-section">
                                <h4>FOR {categoryGroup.category.toUpperCase()}</h4>
                                <div className="packages-grid">
                                    {categoryGroup.packages.map(pkg => renderPackageCard(pkg))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="elite-packages-section">
                        <h3>3. ELITE & ALL-IN-ONE PACKAGES</h3>
                        <p>For Agencies / Bulk Sellers</p>

                        <div className="packages-grid all-in-one-grid">
                            {allInOnePackages.map(pkg => renderPackageCard(pkg))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoostPackagesPopup;
