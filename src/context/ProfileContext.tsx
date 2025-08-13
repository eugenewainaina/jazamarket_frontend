import React, { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import { createApiUrl } from '../utils/api';

// Define the shape of package levels
export interface PackageLevel {
  level: string;
  expiry: string;
}

// Define the shape of the package object
export interface PackageData {
  "Vehicles": PackageLevel;
  "Property & Rentals": PackageLevel;
  "Others": PackageLevel;
}

// Define the shape of the profile data from the API
export interface ProfileData {
  fullName: string;
  email: string;
  package: PackageData;
  password: string;
  phone?: string;
  address?: string;
  profilePictureURL?: string;
  whatsapp?: string;
  x?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  _createTime?: string;
}

// Define the shape of the context
interface ProfileContextType {
  profile: ProfileData | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => void;
}

// Create the context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Create the provider component
export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(createApiUrl('/profile'), {
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch profile data');
      }

      const data: ProfileData = await response.json();
      setProfile(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading, error, fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Create a custom hook for easy context consumption
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
