import React, { useState } from 'react';
import './BoostPackagesPopup.css';
import PaymentDetailsPopup from '../PaymentDetailsPopup/PaymentDetailsPopup';
import { useProfile } from '../../context/ProfileContext';
import { 
    FaCompass,     // 🧭 Explorer
    FaRocket,      // 🚀 Starter Pack & Pro Launch  
    FaBolt,        // ⚡ Momentum
    FaCar,         // 🏎️ Accelerate
    FaMountain,    // ⛰️ Pinnacle Silver
    FaCrown,       // 👑 Pinnacle Elite
    FaGem,         // 💎 Maximizer Gold
    FaStar,        // ⭐ Maximizer Pro
    FaInfinity     // ♾️ Infinity Suite
} from 'react-icons/fa';

interface Package {
    name: string;
    listings: number | string;
    powerUpLevel: string;
    price1_3_6_12: string[];
    description?: string;
    adCounts?: number[];
    categoryCounts?: {
        cars: number[];
        property: number[];
        others: number[];
    };
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
    const [paymentPopupOpen, setPaymentPopupOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<{name: string, price: string}>({name: '', price: ''});
    const [monthSelectionOpen, setMonthSelectionOpen] = useState(false);
    const [selectedPackageForMonths, setSelectedPackageForMonths] = useState<Package | null>(null);
    const { profile } = useProfile();

    if (!isOpen) return null;

    // Package data based on the new rate card
    const standardCarPackages: Package[] = [
        {
            name: "Explorer",
            listings: "5 ads max",
            powerUpLevel: "Free",
            price1_3_6_12: ["Free", "Free", "Free", "Free"],
            adCounts: [5, 5, 5, 5] // Max 5 ads for any duration
        },
        {
            name: "Starter Pack", 
            listings: "Premium visibility",
            powerUpLevel: "2x more clients",
            price1_3_6_12: ["KSh 2,299", "KSh 5,799", "KSh 10,999", "KSh 19,999"],
            adCounts: [10, 15, 20, 30]
        },
        {
            name: "Momentum",
            listings: "Enhanced visibility", 
            powerUpLevel: "5x more clients",
            price1_3_6_12: ["KSh 5,099", "KSh 12,999", "KSh 23,999", "KSh 42,999"],
            adCounts: [20, 30, 40, 60]
        },
        {
            name: "Accelerate",
            listings: "High visibility",
            powerUpLevel: "7x more clients", 
            price1_3_6_12: ["KSh 7,399", "KSh 18,999", "KSh 33,999", "KSh 59,999"],
            adCounts: [50, 75, 100, 150]
        },
        {
            name: "Pro Launch",
            listings: "Maximum visibility",
            powerUpLevel: "10x more clients",
            price1_3_6_12: ["KSh 9,449", "KSh 23,999", "KSh 42,999", "KSh 74,999"],
            adCounts: [100, 150, 200, 300]
        }
    ];



    const standardPropertyPackages: Package[] = [
        {
            name: "Explorer",
            listings: "5 ads max",
            powerUpLevel: "Free", 
            price1_3_6_12: ["Free", "Free", "Free", "Free"],
            adCounts: [5, 5, 5, 5]
        },
        {
            name: "Starter Pack",
            listings: "Premium visibility",
            powerUpLevel: "2x more clients",
            price1_3_6_12: ["KSh 1,949", "KSh 4,899", "KSh 8,999", "KSh 15,999"],
            adCounts: [10, 15, 20, 30]
        },
        {
            name: "Momentum",
            listings: "Enhanced visibility",
            powerUpLevel: "5x more clients", 
            price1_3_6_12: ["KSh 2,899", "KSh 7,299", "KSh 13,499", "KSh 23,999"],
            adCounts: [30, 45, 60, 90]
        },
        {
            name: "Accelerate", 
            listings: "High visibility",
            powerUpLevel: "7x more clients",
            price1_3_6_12: ["KSh 3,949", "KSh 9,999", "KSh 17,999", "KSh 31,999"],
            adCounts: [50, 75, 100, 150]
        },
        {
            name: "Pro Launch",
            listings: "Maximum visibility",
            powerUpLevel: "10x more clients",
            price1_3_6_12: ["KSh 4,799", "KSh 12,199", "KSh 21,999", "KSh 38,999"],
            adCounts: [100, 150, 200, 300]
        }
    ];

    const standardOthersPackages: Package[] = [
        {
            name: "Explorer",
            listings: "5 ads max",
            powerUpLevel: "Free",
            price1_3_6_12: ["Free", "Free", "Free", "Free"],
            adCounts: [5, 5, 5, 5]
        },
        {
            name: "Starter Pack",
            listings: "Premium visibility", 
            powerUpLevel: "5x more clients",
            price1_3_6_12: ["KSh 1,649", "KSh 4,099", "KSh 7,799", "KSh 13,999"],
            adCounts: [20, 30, 40, 60]
        },
        {
            name: "Momentum",
            listings: "Enhanced visibility",
            powerUpLevel: "10x more clients",
            price1_3_6_12: ["KSh 3,599", "KSh 8,999", "KSh 16,999", "KSh 29,999"],
            adCounts: [40, 60, 80, 120]
        },
        {
            name: "Accelerate",
            listings: "High visibility", 
            powerUpLevel: "15x more clients",
            price1_3_6_12: ["KSh 5,349", "KSh 13,499", "KSh 24,999", "KSh 43,999"],
            adCounts: [60, 90, 120, 180]
        },
        {
            name: "Pro Launch",
            listings: "Maximum visibility",
            powerUpLevel: "20x more clients",
            price1_3_6_12: ["KSh 7,649", "KSh 18,499", "KSh 33,999", "KSh 59,999"],
            adCounts: [80, 120, 160, 240]
        }
    ];

    // Elite packages - shown once at the end
    const elitePackages: Package[] = [
        {
            name: "Pinnacle Silver",
            listings: "Cars + Property + Others",
            powerUpLevel: "20x more clients",
            price1_3_6_12: ["KSh 11,449", "KSh 28,499", "KSh 51,999", "KSh 89,999"],
            description: "Cross-category package for all businesses",
            categoryCounts: {
                cars: [120, 180, 240, 360],
                property: [150, 225, 300, 450],
                others: [100, 150, 200, 300]
            }
        },
        {
            name: "Pinnacle Elite", 
            listings: "Cars + Property + Others",
            powerUpLevel: "40x more clients",
            price1_3_6_12: ["KSh 14,149", "KSh 35,499", "KSh 64,999", "KSh 109,999"],
            description: "Premium cross-category package",
            categoryCounts: {
                cars: [150, 225, 300, 450],
                property: [200, 300, 400, 600],
                others: [120, 180, 240, 360]
            }
        },
        {
            name: "Maximizer Gold",
            listings: "Cars + Unlimited Property + Others",
            powerUpLevel: "70x more clients",
            price1_3_6_12: ["KSh 18,699", "KSh 46,999", "KSh 85,999", "KSh 149,999"],
            description: "High-volume cross-category package",
            categoryCounts: {
                cars: [250, 375, 500, 750],
                property: [-1, -1, -1, -1], // Unlimited
                others: [200, 300, 400, 600]
            }
        },
        {
            name: "Maximizer Pro",
            listings: "Cars + Unlimited Property + Others",
            powerUpLevel: "120x more clients",
            price1_3_6_12: ["KSh 47,399", "KSh 109,999", "KSh 199,999", "KSh 349,999"],
            description: "Professional cross-category package",
            categoryCounts: {
                cars: [750, 1125, 1500, 2250],
                property: [-1, -1, -1, -1], // Unlimited
                others: [500, 750, 1000, 1500]
            }
        },
        {
            name: "Infinity Suite",
            listings: "All Categories Unlimited",
            powerUpLevel: "300x more clients",
            price1_3_6_12: ["KSh 74,549", "KSh 169,999", "KSh 299,999", "KSh 529,999"],
            description: "Ultimate unlimited package for all categories",
            categoryCounts: {
                cars: [-1, -1, -1, -1],
                property: [-1, -1, -1, -1],
                others: [-1, -1, -1, -1]
            }
        }
    ];

    const handleGetPackage = (pkg: Package) => {
        // For Explorer (free package), no month selection needed
        if (pkg.name === 'Explorer') {
            return;
        }
        
        setSelectedPackageForMonths(pkg);
        setMonthSelectionOpen(true);
    };

    const handleMonthSelection = (monthIndex: number) => {
        if (selectedPackageForMonths) {
            setSelectedPackage({ 
                name: selectedPackageForMonths.name, 
                price: selectedPackageForMonths.price1_3_6_12[monthIndex] 
            });
            setMonthSelectionOpen(false);
            setPaymentPopupOpen(true);
        }
    };

    const closePaymentPopup = () => {
        setPaymentPopupOpen(false);
        setSelectedPackage({name: '', price: ''});
    };

    const closeMonthSelection = () => {
        setMonthSelectionOpen(false);
        setSelectedPackageForMonths(null);
    };

    // Helper function to get current package level for a category
    const getCurrentPackageLevel = (category: string): string => {
        if (!profile?.package) return 'Explorer';
        
        switch (category) {
            case 'Vehicles':
                return profile.package["Vehicles"]?.level || 'Explorer';
            case 'Property & Rentals':
                return profile.package["Property & Rentals"]?.level || 'Explorer';
            case 'Others':
                return profile.package["Others"]?.level || 'Explorer';
            default:
                return 'Explorer';
        }
    };

    // Helper function to check if package is expired
    const isPackageExpired = (category: string): boolean => {
        if (!profile?.package) return true;
        
        let expiryDate: string | undefined;
        switch (category) {
            case 'Vehicles':
                expiryDate = profile.package["Vehicles"]?.expiry;
                break;
            case 'Property & Rentals':
                expiryDate = profile.package["Property & Rentals"]?.expiry;
                break;
            case 'Others':
                expiryDate = profile.package["Others"]?.expiry;
                break;
        }
        
        if (!expiryDate) return true;
        return new Date(expiryDate) < new Date();
    };

    // Helper function to format expiry date
    const formatExpiryDate = (category: string): string => {
        if (!profile?.package) return '';
        
        let expiryDate: string | undefined;
        switch (category) {
            case 'Vehicles':
                expiryDate = profile.package["Vehicles"]?.expiry;
                break;
            case 'Property & Rentals':
                expiryDate = profile.package["Property & Rentals"]?.expiry;
                break;
            case 'Others':
                expiryDate = profile.package["Others"]?.expiry;
                break;
        }
        
        if (!expiryDate) return '';
        return new Date(expiryDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Helper function to determine if it's an upgrade
    const isUpgrade = (targetPackage: string, currentPackage: string): boolean => {
        const packageHierarchy = [
            'Explorer', 'Starter Pack', 'Momentum', 'Accelerate', 'Pro Launch',
            'Pinnacle Silver', 'Pinnacle Elite', 'Maximizer Gold', 'Maximizer Pro', 'Infinity Suite'
        ];
        
        const currentIndex = packageHierarchy.indexOf(currentPackage);
        const targetIndex = packageHierarchy.indexOf(targetPackage);
        
        return targetIndex > currentIndex;
    };

    // Helper function to get package icon based on your guide
    const getPackageIcon = (packageName: string) => {
        switch (packageName) {
            case 'Explorer':
                return <FaCompass className="package-icon" />;
            case 'Starter Pack':
                return <FaRocket className="package-icon" />;
            case 'Momentum':
                return <FaBolt className="package-icon" />;
            case 'Accelerate':
                return <FaCar className="package-icon" />;
            case 'Pro Launch':
                return <FaRocket className="package-icon" />;
            case 'Pinnacle Silver':
                return <FaMountain className="package-icon" />;
            case 'Pinnacle Elite':
                return <FaCrown className="package-icon" />;
            case 'Maximizer Gold':
                return <FaGem className="package-icon" />;
            case 'Maximizer Pro':
                return <FaStar className="package-icon" />;
            case 'Infinity Suite':
                return <FaInfinity className="package-icon" />;
            default:
                return null;
        }
    };

    const renderPackageCard = (pkg: Package, category: string = '') => {
        const currentLevel = getCurrentPackageLevel(category);
        const isCurrentPackage = pkg.name === currentLevel;
        const isExpired = isPackageExpired(category);
        const isFree = pkg.name === 'Explorer';
        
        return (
            <div key={pkg.name} className={`package-card ${isFree ? 'free-package' : ''} ${isCurrentPackage ? 'current-package' : ''} ${isCurrentPackage && isExpired ? 'expired-package' : ''}`}>
                <div className="package-header">
                    <h3 className="package-name">
                        {getPackageIcon(pkg.name)}
                        <span className="package-name-text">{pkg.name}</span>
                    </h3>
                    {isCurrentPackage && !isExpired && (
                        <div className="current-package-badge">Current Plan</div>
                    )}
                    {isCurrentPackage && isExpired && (
                        <div className="expired-package-badge">Expired Plan</div>
                    )}
                    <div className="package-listings">{pkg.listings}</div>
                </div>
                <div className="package-details">
                    <div className="power-up-level">
                        <span className="power-up-label">Power-Up Level:</span>
                        <span className="power-up-dots">{pkg.powerUpLevel}</span>
                    </div>
                    {pkg.name !== 'Explorer' && (
                        <div className="package-pricing">
                            {/* Regular packages with single ad counts */}
                            {pkg.adCounts && !pkg.categoryCounts && (
                                <>
                                    <div className="pricing-row">
                                        <span className="duration">1 Month:</span>
                                        <span className="ads-count">{pkg.adCounts[0] === -1 ? 'Unlimited' : `${pkg.adCounts[0]} ads`}</span>
                                        <span className="price">{pkg.price1_3_6_12[0]}</span>
                                    </div>
                                    <div className="pricing-row">
                                        <span className="duration">3 Months:</span>
                                        <span className="ads-count">{pkg.adCounts[1] === -1 ? 'Unlimited' : `${pkg.adCounts[1]} ads`}</span>
                                        <span className="price">{pkg.price1_3_6_12[1]}</span>
                                    </div>
                                    <div className="pricing-row">
                                        <span className="duration">6 Months:</span>
                                        <span className="ads-count">{pkg.adCounts[2] === -1 ? 'Unlimited' : `${pkg.adCounts[2]} ads`}</span>
                                        <span className="price">{pkg.price1_3_6_12[2]}</span>
                                    </div>
                                    <div className="pricing-row">
                                        <span className="duration">12 Months:</span>
                                        <span className="ads-count">{pkg.adCounts[3] === -1 ? 'Unlimited' : `${pkg.adCounts[3]} ads`}</span>
                                        <span className="price">{pkg.price1_3_6_12[3]}</span>
                                    </div>
                                </>
                            )}
                            
                            {/* Elite packages with category-specific counts */}
                            {pkg.categoryCounts && (
                                <>
                                    <div className="pricing-row elite-pricing-row">
                                        <span className="duration" data-price={pkg.price1_3_6_12[0]}>1 Month:</span>
                                        <span className="ads-count category-breakdown">
                                            <div>Cars: {pkg.categoryCounts.cars[0] === -1 ? 'Unlimited' : pkg.categoryCounts.cars[0]}</div>
                                            <div>Property: {pkg.categoryCounts.property[0] === -1 ? 'Unlimited' : pkg.categoryCounts.property[0]}</div>
                                            <div>Others: {pkg.categoryCounts.others[0] === -1 ? 'Unlimited' : pkg.categoryCounts.others[0]}</div>
                                        </span>
                                        <span className="price">{pkg.price1_3_6_12[0]}</span>
                                    </div>
                                    <div className="pricing-row elite-pricing-row">
                                        <span className="duration" data-price={pkg.price1_3_6_12[1]}>3 Months:</span>
                                        <span className="ads-count category-breakdown">
                                            <div>Cars: {pkg.categoryCounts.cars[1] === -1 ? 'Unlimited' : pkg.categoryCounts.cars[1]}</div>
                                            <div>Property: {pkg.categoryCounts.property[1] === -1 ? 'Unlimited' : pkg.categoryCounts.property[1]}</div>
                                            <div>Others: {pkg.categoryCounts.others[1] === -1 ? 'Unlimited' : pkg.categoryCounts.others[1]}</div>
                                        </span>
                                        <span className="price">{pkg.price1_3_6_12[1]}</span>
                                    </div>
                                    <div className="pricing-row elite-pricing-row">
                                        <span className="duration" data-price={pkg.price1_3_6_12[2]}>6 Months:</span>
                                        <span className="ads-count category-breakdown">
                                            <div>Cars: {pkg.categoryCounts.cars[2] === -1 ? 'Unlimited' : pkg.categoryCounts.cars[2]}</div>
                                            <div>Property: {pkg.categoryCounts.property[2] === -1 ? 'Unlimited' : pkg.categoryCounts.property[2]}</div>
                                            <div>Others: {pkg.categoryCounts.others[2] === -1 ? 'Unlimited' : pkg.categoryCounts.others[2]}</div>
                                        </span>
                                        <span className="price">{pkg.price1_3_6_12[2]}</span>
                                    </div>
                                    <div className="pricing-row elite-pricing-row">
                                        <span className="duration" data-price={pkg.price1_3_6_12[3]}>12 Months:</span>
                                        <span className="ads-count category-breakdown">
                                            <div>Cars: {pkg.categoryCounts.cars[3] === -1 ? 'Unlimited' : pkg.categoryCounts.cars[3]}</div>
                                            <div>Property: {pkg.categoryCounts.property[3] === -1 ? 'Unlimited' : pkg.categoryCounts.property[3]}</div>
                                            <div>Others: {pkg.categoryCounts.others[3] === -1 ? 'Unlimited' : pkg.categoryCounts.others[3]}</div>
                                        </span>
                                        <span className="price">{pkg.price1_3_6_12[3]}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                    {pkg.name === 'Explorer' && (
                        <div className="explorer-info">
                            <div className="explorer-note">
                                <strong>Note:</strong> Maximum 5 ads for any duration with basic visibility
                            </div>
                        </div>
                    )}
                    {/* Show expiry date for current package */}
                    {isCurrentPackage && !isExpired && category && (
                        <div className="package-expiry">
                            Expires: {formatExpiryDate(category)}
                        </div>
                    )}
                </div>
                {pkg.name !== 'Explorer' ? (
                    <button
                        className="get-package-btn"
                        onClick={() => handleGetPackage(pkg)}
                    >
                        {isCurrentPackage && isExpired ? 'Renew' : 
                         isCurrentPackage ? 'Current Plan' :
                         category && isUpgrade(pkg.name, currentLevel) ? 'Upgrade to' : 'Switch to'} {isCurrentPackage ? '' : pkg.name}
                    </button>
                ) : (
                    <div className="free-package-badge">
                        {isCurrentPackage ? 'Current Free Plan' : 'Free Plan'}
                    </div>
                )}
            </div>
        );
    };

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
                                    <div>Others</div>
                                </div>
                                <div>
                                    <strong>Access:</strong>
                                    <div>Maximum 5 ads with limited visibility</div>
                                    <div>Maximum 5 ads with limited visibility</div>
                                    <div>Maximum 5 ads with limited visibility</div>
                                </div>
                            </div>
                            <div className="free-plan-features">
                                <h4>Features:</h4>
                                <ul>
                                    <li>Limited visibility in search results</li>
                                    <li>No premium badges or highlights</li>
                                    <li>Basic listing features only</li>
                                    <li>Standard ad duration</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="cars-packages-section">
                        <h3>2. FOR VEHICLES</h3>
                        
                        <div className="category-section">
                            <h4>Standard Dealer Packages</h4>
                            <div className="packages-grid">
                                {standardCarPackages.map(pkg => renderPackageCard(pkg, 'Vehicles'))}
                            </div>
                        </div>
                    </div>

                    <div className="property-packages-section">
                        <h3>3. FOR PROPERTY & RENTALS</h3>
                        
                        <div className="category-section">
                            <h4>Standard Agent Packages</h4>
                            <div className="packages-grid">
                                {standardPropertyPackages.map(pkg => renderPackageCard(pkg, 'Property & Rentals'))}
                            </div>
                        </div>
                    </div>

                    <div className="others-packages-section">
                        <h3>4. FOR OTHERS</h3>
                        
                        <div className="category-section">
                            <h4>Standard Packages</h4>
                            <div className="packages-grid">
                                {standardOthersPackages.map(pkg => renderPackageCard(pkg, 'Others'))}
                            </div>
                        </div>
                    </div>

                    <div className="elite-packages-section">
                        <h3>5. ELITE PACKAGES</h3>
                        <p>Cross-category packages for agencies and multi-category sellers</p>
                        <div className="packages-grid">
                            {elitePackages.map(pkg => renderPackageCard(pkg, 'elite'))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Month Selection Popup */}
            {monthSelectionOpen && selectedPackageForMonths && (
                <div className="month-selection-overlay">
                    <div className="month-selection-popup">
                        <div className="month-popup-header">
                            <h3>Select Duration for {selectedPackageForMonths.name}</h3>
                            <button className="close-btn" onClick={closeMonthSelection}>×</button>
                        </div>
                        <div className="month-options">
                            <button 
                                className="month-option"
                                onClick={() => handleMonthSelection(0)}
                            >
                                <div className="month-duration">1 Month</div>
                                <div className="month-price">{selectedPackageForMonths.price1_3_6_12[0]}</div>
                                {selectedPackageForMonths.adCounts && (
                                    <div className="month-ads">{selectedPackageForMonths.adCounts[0] === -1 ? 'Unlimited' : `${selectedPackageForMonths.adCounts[0]} ads`}</div>
                                )}
                                {selectedPackageForMonths.categoryCounts && (
                                    <div className="month-ads-breakdown">
                                        <div>Cars: {selectedPackageForMonths.categoryCounts.cars[0] === -1 ? 'Unlimited' : selectedPackageForMonths.categoryCounts.cars[0]}</div>
                                        <div>Property: {selectedPackageForMonths.categoryCounts.property[0] === -1 ? 'Unlimited' : selectedPackageForMonths.categoryCounts.property[0]}</div>
                                        <div>Others: {selectedPackageForMonths.categoryCounts.others[0] === -1 ? 'Unlimited' : selectedPackageForMonths.categoryCounts.others[0]}</div>
                                    </div>
                                )}
                            </button>
                            
                            <button 
                                className="month-option"
                                onClick={() => handleMonthSelection(1)}
                            >
                                <div className="month-duration">3 Months</div>
                                <div className="month-price">{selectedPackageForMonths.price1_3_6_12[1]}</div>
                                {selectedPackageForMonths.adCounts && (
                                    <div className="month-ads">{selectedPackageForMonths.adCounts[1] === -1 ? 'Unlimited' : `${selectedPackageForMonths.adCounts[1]} ads`}</div>
                                )}
                                {selectedPackageForMonths.categoryCounts && (
                                    <div className="month-ads-breakdown">
                                        <div>Cars: {selectedPackageForMonths.categoryCounts.cars[1] === -1 ? 'Unlimited' : selectedPackageForMonths.categoryCounts.cars[1]}</div>
                                        <div>Property: {selectedPackageForMonths.categoryCounts.property[1] === -1 ? 'Unlimited' : selectedPackageForMonths.categoryCounts.property[1]}</div>
                                        <div>Others: {selectedPackageForMonths.categoryCounts.others[1] === -1 ? 'Unlimited' : selectedPackageForMonths.categoryCounts.others[1]}</div>
                                    </div>
                                )}
                            </button>
                            
                            <button 
                                className="month-option"
                                onClick={() => handleMonthSelection(2)}
                            >
                                <div className="month-duration">6 Months</div>
                                <div className="month-price">{selectedPackageForMonths.price1_3_6_12[2]}</div>
                                {selectedPackageForMonths.adCounts && (
                                    <div className="month-ads">{selectedPackageForMonths.adCounts[2] === -1 ? 'Unlimited' : `${selectedPackageForMonths.adCounts[2]} ads`}</div>
                                )}
                                {selectedPackageForMonths.categoryCounts && (
                                    <div className="month-ads-breakdown">
                                        <div>Cars: {selectedPackageForMonths.categoryCounts.cars[2] === -1 ? 'Unlimited' : selectedPackageForMonths.categoryCounts.cars[2]}</div>
                                        <div>Property: {selectedPackageForMonths.categoryCounts.property[2] === -1 ? 'Unlimited' : selectedPackageForMonths.categoryCounts.property[2]}</div>
                                        <div>Others: {selectedPackageForMonths.categoryCounts.others[2] === -1 ? 'Unlimited' : selectedPackageForMonths.categoryCounts.others[2]}</div>
                                    </div>
                                )}
                            </button>
                            
                            <button 
                                className="month-option"
                                onClick={() => handleMonthSelection(3)}
                            >
                                <div className="month-duration">12 Months</div>
                                <div className="month-price">{selectedPackageForMonths.price1_3_6_12[3]}</div>
                                {selectedPackageForMonths.adCounts && (
                                    <div className="month-ads">{selectedPackageForMonths.adCounts[3] === -1 ? 'Unlimited' : `${selectedPackageForMonths.adCounts[3]} ads`}</div>
                                )}
                                {selectedPackageForMonths.categoryCounts && (
                                    <div className="month-ads-breakdown">
                                        <div>Cars: {selectedPackageForMonths.categoryCounts.cars[3] === -1 ? 'Unlimited' : selectedPackageForMonths.categoryCounts.cars[3]}</div>
                                        <div>Property: {selectedPackageForMonths.categoryCounts.property[3] === -1 ? 'Unlimited' : selectedPackageForMonths.categoryCounts.property[3]}</div>
                                        <div>Others: {selectedPackageForMonths.categoryCounts.others[3] === -1 ? 'Unlimited' : selectedPackageForMonths.categoryCounts.others[3]}</div>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <PaymentDetailsPopup
                isOpen={paymentPopupOpen}
                onClose={closePaymentPopup}
                packageName={selectedPackage.name}
                packagePrice={selectedPackage.price}
            />
        </div>
    );
};

export default BoostPackagesPopup;
