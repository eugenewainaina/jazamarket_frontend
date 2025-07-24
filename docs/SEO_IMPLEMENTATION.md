# SEO Implementation for JazaMarket

This document explains the SEO (Search Engine Optimization) implementation for the JazaMarket application.

## Overview

The SEO implementation includes:
- Dynamic meta titles and descriptions for each category
- Open Graph tags for social media sharing
- Twitter Card metadata
- JSON-LD structured data
- URL-friendly category slugs
- Sitemap generation utilities
- robots.txt configuration

## Files Structure

```
src/
├── config/
│   └── categoryMeta.ts          # Category-specific SEO metadata
├── hooks/
│   └── useSEO.ts               # Custom hook for managing SEO
├── utils/
│   ├── formatters.ts           # Category name/key conversion utilities
│   ├── structuredData.ts       # JSON-LD structured data helpers
│   └── sitemap.ts              # Sitemap generation utilities
public/
└── robots.txt                  # Search engine crawler instructions
```

## Category SEO Metadata

Each category has specific meta titles and descriptions optimized for search engines:

### Example Usage:
```typescript
import { useSEO } from '../hooks/useSEO';
import { categoryNameToKey } from '../utils/formatters';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const categoryKey = categoryNameToKey(categoryName);
  
  useSEO({
    category: categoryKey,
    ogUrl: window.location.href,
  });
  
  // Component content...
};
```

## URL Structure

Categories use URL-friendly slugs instead of spaces and special characters:

- **Before**: `/category/Property%20&%20Rentals`
- **After**: `/category/property-rentals`

### Conversion Functions:
- `categoryNameToKey()` - Converts "Property & Rentals" → "property-rentals"
- `categoryKeyToName()` - Converts "property-rentals" → "Property & Rentals"

## SEO Features

### 1. Dynamic Meta Tags
- Page titles optimized for each category
- Meta descriptions tailored to category content
- Open Graph tags for social media sharing
- Twitter Card metadata

### 2. Structured Data (JSON-LD)
- Organization schema for JazaMarket
- Website schema with search functionality
- Category page schemas

### 3. Technical SEO
- Canonical URLs
- Proper robots.txt
- Sitemap generation utilities
- Mobile-friendly viewport settings

## Category Mappings

| Category Name | URL Key | Meta Title |
|---------------|---------|------------|
| Vehicles | vehicles | Buy & Sell Vehicles in Kenya \| JazaMarket |
| Property & Rentals | property-rentals | Property for Sale & Rent in Kenya \| JazaMarket |
| Electronics | electronics | Electronics for Sale in Kenya \| JazaMarket |
| Jobs | jobs | Latest Jobs & Vacancies in Kenya \| JazaMarket |
| Fashion | fashion | Shop Fashion in Kenya \| Clothes, Shoes & More \| JazaMarket |
| Babies & Kids | babies-kids | Baby & Kids Products for Sale in Kenya \| JazaMarket |
| Furniture & Appliances | furniture-appliances | Buy Furniture & Home Appliances in Kenya \| JazaMarket |
| Computers | computers | Computers & Laptops for Sale in Kenya \| JazaMarket |
| Seeking Work - CVs | seeking-work-cvs | Job Seekers & CV Listings in Kenya \| JazaMarket |
| Car Parts & Accessories | car-parts-accessories | Car Parts & Accessories in Kenya \| JazaMarket |
| Services | services | Find Services in Kenya \| JazaMarket |
| Animals & Pets | animals-pets | Pets & Animals for Sale in Kenya \| JazaMarket |
| Phones & Accessories | phones-accessories | Phones & Accessories for Sale in Kenya \| JazaMarket |
| Health & Beauty | health-beauty | Health & Beauty Products in Kenya \| JazaMarket |
| Repair & Construction | repair-construction | Repair & Construction Services in Kenya \| JazaMarket |
| Agriculture & Food | agriculture-food | Agriculture & Food Supplies in Kenya \| JazaMarket |
| Entertainment & Sports | entertainment-sports | Sports & Entertainment Gear in Kenya \| JazaMarket |
| Commercial Equipment & Tools | commercial-equipment-tools | Commercial Equipment & Tools in Kenya \| JazaMarket |

## Implementation Checklist

- [x] Category metadata configuration
- [x] SEO hook implementation
- [x] URL-friendly category slugs
- [x] Dynamic meta tag updates
- [x] Open Graph tags
- [x] Twitter Card metadata
- [x] JSON-LD structured data
- [x] Updated category navigation
- [x] Basic robots.txt
- [x] Sitemap generation utilities
- [x] Updated HTML meta tags

## Best Practices Implemented

1. **Unique Titles**: Each category has a unique, descriptive title
2. **Local SEO**: Includes "Kenya" in titles and descriptions
3. **Brand Consistency**: All titles include "JazaMarket"
4. **Action-Oriented**: Descriptions encourage user action
5. **Keyword Optimization**: Includes relevant search terms
6. **Mobile-First**: Responsive design considerations
7. **Social Sharing**: Open Graph and Twitter Card support

## Monitoring & Analytics

To track SEO performance, consider implementing:
- Google Analytics 4
- Google Search Console
- Social media analytics
- Core Web Vitals monitoring

## Future Enhancements

Potential improvements:
- Dynamic sitemap generation endpoint
- Blog/content section for SEO content
- Local business schema for location-based SEO
- Product schema for individual ad listings
- FAQ schema for common questions
- Review/rating schema for user feedback
