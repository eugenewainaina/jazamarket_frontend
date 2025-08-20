import React from 'react';
import { getPackageIcon } from '../../utils/packageIcons';
import './PackageIcon.css';

interface PackageIconProps {
    packageName?: string;
    size?: number;
    className?: string;
}

const PackageIcon: React.FC<PackageIconProps> = ({ 
    packageName, 
    size = 20, 
    className = '' 
}) => {
    const packageConfig = getPackageIcon(packageName);
    
    if (!packageConfig) return null;
    
    const IconComponent = packageConfig.icon as any; // Type assertion to bypass the typing issue
    
    return (
        <div 
            className={`package-icon-wrapper ${className}`}
            title={packageConfig.description}
        >
            <IconComponent 
                className="package-icon" 
                style={{ 
                    color: packageConfig.color,
                    fontSize: `${size}px`,
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                }}
            />
        </div>
    );
};

export default PackageIcon;
