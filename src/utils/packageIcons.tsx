import React from 'react';
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

export interface PackageIconConfig {
    icon: React.ComponentType;
    color: string;
    description: string;
}

// Package icon mappings with original colors
export const packageIconMap: Record<string, PackageIconConfig> = {
    'Explorer': {
        icon: FaCompass,
        color: '#8B4513', // Brown color for compass/explorer theme
        description: 'Explorer package'
    },
    'Starter Pack': {
        icon: FaRocket,
        color: '#FF6347', // Tomato red for rocket
        description: 'Starter Pack'
    },
    'Momentum': {
        icon: FaBolt,
        color: '#FFD700', // Gold for lightning bolt
        description: 'Momentum package'
    },
    'Accelerate': {
        icon: FaCar,
        color: '#FF4500', // Orange red for sports car
        description: 'Accelerate package'
    },
    'Pro Launch': {
        icon: FaRocket,
        color: '#DC143C', // Crimson for big rocket
        description: 'Pro Launch package'
    },
    'Pinnacle Silver': {
        icon: FaMountain,
        color: '#C0C0C0', // Silver color for mountain peak
        description: 'Pinnacle Silver'
    },
    'Pinnacle Elite': {
        icon: FaCrown,
        color: '#FFD700', // Gold for crown
        description: 'Pinnacle Elite'
    },
    'Maximizer Gold': {
        icon: FaGem,
        color: '#FFD700', // Gold for gem
        description: 'Maximizer Gold'
    },
    'Maximizer Pro': {
        icon: FaStar,
        color: '#4169E1', // Royal blue for platinum star
        description: 'Maximizer Pro'
    },
    'Infinity Suite': {
        icon: FaInfinity,
        color: '#8A2BE2', // Blue violet for infinity
        description: 'Infinity Suite'
    }
};

export const getPackageIcon = (packageName?: string): PackageIconConfig | null => {
    if (!packageName) return null;
    return packageIconMap[packageName] || null;
};
