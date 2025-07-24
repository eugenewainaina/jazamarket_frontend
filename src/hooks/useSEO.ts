import { useEffect } from 'react';
import { categoryMetaData, defaultMetaData, type CategoryMetaData } from '../config/categoryMeta';
import { 
  generateOrganizationSchema, 
  generateWebsiteSchema, 
  generateCategoryPageSchema,
  insertStructuredData 
} from '../utils/structuredData';

export interface UseSEOOptions {
  category?: string;
  customTitle?: string;
  customDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  includeStructuredData?: boolean;
}

/**
 * Custom hook for managing SEO metadata
 */
export const useSEO = ({
  category,
  customTitle,
  customDescription,
  ogImage,
  ogUrl,
  includeStructuredData = true
}: UseSEOOptions = {}) => {
  useEffect(() => {
    // Get metadata based on category or use default
    const metaData: CategoryMetaData = category && categoryMetaData[category] 
      ? categoryMetaData[category] 
      : defaultMetaData;

    const title = customTitle || metaData.title;
    const description = customDescription || metaData.description;

    // Set page title
    document.title = title;

    // Set or update meta description
    setMetaTag('name', 'description', description);

    // Set Open Graph tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');
    
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
    }
    
    if (ogUrl) {
      setMetaTag('property', 'og:url', ogUrl);
    }

    // Set Twitter Card tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    
    if (ogImage) {
      setMetaTag('name', 'twitter:image', ogImage);
    }

    // Add structured data
    if (includeStructuredData) {
      // Always include organization schema
      insertStructuredData(generateOrganizationSchema(), 'organization-schema');
      
      // Include website schema on home page
      if (!category) {
        insertStructuredData(generateWebsiteSchema(), 'website-schema');
      }
      
      // Include category page schema for category pages
      if (category && ogUrl) {
        const categoryPageSchema = generateCategoryPageSchema(title, description, ogUrl);
        insertStructuredData(categoryPageSchema, 'category-schema');
      }
    }

  }, [category, customTitle, customDescription, ogImage, ogUrl, includeStructuredData]);
};

/**
 * Helper function to set or update meta tags
 */
const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
  let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  
  if (tag) {
    tag.setAttribute('content', content);
  } else {
    tag = document.createElement('meta');
    tag.setAttribute(attributeName, attributeValue);
    tag.setAttribute('content', content);
    document.head.appendChild(tag);
  }
};

/**
 * Helper function to get category metadata
 */
export const getCategoryMetaData = (categoryKey: string): CategoryMetaData => {
  return categoryMetaData[categoryKey] || defaultMetaData;
};
