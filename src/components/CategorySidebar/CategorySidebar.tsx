import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CategorySidebar.css';
import { categories } from '../../data/categories';

const CategorySidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="category-sidebar">
      <div className="sidebar-header">
        <h3 className="sidebar-title">Categories</h3>
        <button 
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand categories" : "Collapse categories"}
        >
          <div className={`hamburger ${isCollapsed ? '' : 'active'}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      <div className={`sidebar-categories ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        {categories.map((category, index) => {
          return (
            <Link 
              to={`/category/${category}`} 
              key={index} 
              className="sidebar-category-link"
              onClick={() => setIsCollapsed(true)} // Close menu when category is selected on mobile
            >
              <div className="sidebar-category-item">
                <img
                  src={`/categories_photos/${category}.png`}
                  alt={category}
                  className="sidebar-category-image"
                />
                <span className="sidebar-category-name">{category}</span>
                <svg 
                  className="sidebar-category-arrow" 
                  width="8" 
                  height="12" 
                  viewBox="0 0 8 12" 
                  fill="none"
                >
                  <path 
                    d="M1 1L6 6L1 11" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySidebar;
