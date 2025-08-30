import { categories } from '../data/categories';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generate sitemap URLs for all pages
 */
export const generateSitemapUrls = (baseUrl: string = 'https://jazamarket.com'): SitemapUrl[] => {
  const urls: SitemapUrl[] = [];
  const currentDate = new Date().toISOString().split('T')[0];

  // Home page
  urls.push({
    loc: baseUrl,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: 1.0
  });

  // Category pages
  categories.forEach(category => {
    urls.push({
      loc: `${baseUrl}/category/${category}`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8
    });
  });

  // Static pages
  const staticPages = [
    { path: '/login', priority: 0.5 },
    { path: '/signup', priority: 0.5 },
    { path: '/dashboard', priority: 0.6 },
    { path: '/post-ad', priority: 0.7 }
  ];

  staticPages.forEach(page => {
    urls.push({
      loc: `${baseUrl}${page.path}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: page.priority
    });
  });

  return urls;
};

/**
 * Generate XML sitemap content
 */
export const generateSitemapXML = (urls: SitemapUrl[]): string => {
  const urlElements = urls.map(url => {
    let urlElement = `  <url>\n    <loc>${url.loc}</loc>`;
    
    if (url.lastmod) {
      urlElement += `\n    <lastmod>${url.lastmod}</lastmod>`;
    }
    
    if (url.changefreq) {
      urlElement += `\n    <changefreq>${url.changefreq}</changefreq>`;
    }
    
    if (url.priority !== undefined) {
      urlElement += `\n    <priority>${url.priority}</priority>`;
    }
    
    urlElement += '\n  </url>';
    return urlElement;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
};

/**
 * Generate robots.txt content
 */
export const generateRobotsTxt = (baseUrl: string = 'https://jazamarket.com'): string => {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;
};
