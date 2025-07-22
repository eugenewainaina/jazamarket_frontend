import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';
import { categories } from '../../data/categories';

const Categories: React.FC = () => {
  return (
    <div className="categories-container">
      <h2>Browse By Category</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <Link to={`/category/${encodeURIComponent(category)}`} key={index} className="category-item-link">
            <div className="category-item">
              <img
                src={`/categories_photos/${category}.png`}
                alt={category}
                className="category-image"
              />
              <span className="category-name">{category}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
