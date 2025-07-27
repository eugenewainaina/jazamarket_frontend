import React from 'react';
import { useSEO } from '../../hooks/useSEO';
import MainLayout from '../MainLayout';
import './Blog.css';

const Blog: React.FC = () => {
  useSEO({
    customTitle: 'Blog - JazaMarket',
    customDescription: 'Read the latest news, tips, and insights about online trading in Kenya from the JazaMarket blog.',
    ogUrl: window.location.href,
  });

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Tips for Safe Online Trading in Kenya",
      excerpt: "Learn the key safety measures to protect yourself when buying and selling online. From meeting locations to payment methods, we cover everything you need to know.",
      date: "January 25, 2025",
      category: "Safety",
      image: "/banners/main-banner-1.svg",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "How to Write the Perfect Ad Description",
      excerpt: "A well-written ad can make all the difference in attracting buyers. Discover proven techniques to write compelling descriptions that sell.",
      date: "January 22, 2025",
      category: "Tips",
      image: "/banners/main-banner-2.svg",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "The Rise of Mobile Commerce in Kenya",
      excerpt: "Explore how mobile technology is transforming the way Kenyans buy and sell goods online, and what this means for the future of e-commerce.",
      date: "January 20, 2025",
      category: "Industry",
      image: "/banners/top-home-banner.png",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Seasonal Selling: What's Hot in Different Times of the Year",
      excerpt: "Maximize your profits by understanding seasonal trends in Kenya's marketplace. Learn when to sell electronics, fashion, vehicles, and more.",
      date: "January 18, 2025",
      category: "Business",
      image: "/banners/bottom-home-banner.png",
      readTime: "8 min read"
    }
  ];

  const categories = ["All", "Safety", "Tips", "Industry", "Business"];

  return (
    <MainLayout>
      <div className="blog-page">
        <div className="container">
          <div className="blog-header">
            <h1>JazaMarket Blog</h1>
            <p className="intro-text">
              Stay updated with the latest insights, tips, and news about online trading in Kenya. 
              From safety guidelines to business strategies, we share valuable content to help you 
              succeed on our platform.
            </p>
          </div>

          <div className="blog-categories">
            {categories.map((category) => (
              <button key={category} className="category-filter active">
                {category}
              </button>
            ))}
          </div>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                  <div className="blog-category">{post.category}</div>
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-date">{post.date}</span>
                    <span className="blog-read-time">{post.readTime}</span>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <a href="#" className="read-more">Read More →</a>
                </div>
              </article>
            ))}
          </div>

          <div className="coming-soon">
            <div className="coming-soon-content">
              <h2>More Content Coming Soon!</h2>
              <p>
                We're working hard to bring you more valuable content about online trading, 
                safety tips, business insights, and marketplace trends. Stay tuned for regular 
                updates and expert advice to help you succeed on JazaMarket.
              </p>
              <div className="newsletter-signup">
                <h3>Subscribe to Our Newsletter</h3>
                <p>Get notified when we publish new blog posts and updates.</p>
                <form className="newsletter-form">
                  <input type="email" placeholder="Enter your email address" />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>

          <div className="blog-sidebar-content">
            <div className="popular-topics">
              <h3>Popular Topics</h3>
              <div className="topic-tags">
                <span className="topic-tag">Online Safety</span>
                <span className="topic-tag">Selling Tips</span>
                <span className="topic-tag">Mobile Commerce</span>
                <span className="topic-tag">Vehicle Sales</span>
                <span className="topic-tag">Property Rentals</span>
                <span className="topic-tag">Electronics</span>
                <span className="topic-tag">Fashion</span>
                <span className="topic-tag">Business Growth</span>
              </div>
            </div>

            <div className="recent-updates">
              <h3>Recent Platform Updates</h3>
              <ul>
                <li>
                  <strong>Enhanced Security:</strong> New verification features for seller profiles
                </li>
                <li>
                  <strong>Mobile Optimization:</strong> Improved mobile browsing experience
                </li>
                <li>
                  <strong>Search Improvements:</strong> Better search filters and results
                </li>
                <li>
                  <strong>New Categories:</strong> Added more specific subcategories for better organization
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Blog;
