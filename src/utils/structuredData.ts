/**
 * JSON-LD structured data helpers for better SEO
 */

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint: {
    "@type": string;
    contactType: string;
    url: string;
  };
  sameAs: string[];
}

export interface WebsiteSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description: string;
  potentialAction: {
    "@type": string;
    target: string;
    "query-input": string;
  };
}

export interface CategoryPageSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  isPartOf: {
    "@type": string;
    name: string;
    url: string;
  };
}

/**
 * Generate organization structured data
 */
export const generateOrganizationSchema = (): OrganizationSchema => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "JazaMarket",
  url: "https://jazamarket.com",
  logo: "https://jazamarket.com/Logo.png",
  description: "Kenya's trusted marketplace for buying and selling everything you need.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://jazamarket.com/contact"
  },
  sameAs: [
    "https://facebook.com/jazamarket",
    "https://twitter.com/jazamarket",
    "https://instagram.com/jazamarket"
  ]
});

/**
 * Generate website structured data
 */
export const generateWebsiteSchema = (): WebsiteSchema => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "JazaMarket",
  url: "https://jazamarket.com",
  description: "Kenya's leading marketplace for buying and selling.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://jazamarket.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

/**
 * Generate category page structured data
 */
export const generateCategoryPageSchema = (
  categoryName: string,
  categoryDescription: string,
  categoryUrl: string
): CategoryPageSchema => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: categoryName,
  description: categoryDescription,
  url: categoryUrl,
  isPartOf: {
    "@type": "WebSite",
    name: "JazaMarket",
    url: "https://jazamarket.com"
  }
});

/**
 * Insert JSON-LD structured data into the document head
 */
export const insertStructuredData = (schema: any, id?: string) => {
  // Remove existing structured data if updating
  if (id) {
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  if (id) {
    script.id = id;
  }
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};
