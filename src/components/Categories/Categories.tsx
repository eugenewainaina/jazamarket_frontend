import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';
import { categories } from '../../data/categories';
import { categoryNameToKey } from '../../utils/formatters';

const Categories: React.FC = () => {
  return (
    <div className="categories-container">
      <h2>Browse By Category</h2>
      <div className="categories-grid">
        {categories.map((category, index) => {
          const categoryKey = categoryNameToKey(category);
          return (
            <Link to={`/category/${categoryKey}`} key={index} className="category-item-link">
              <div className="category-item">
                <img
                  src={`/categories_photos/${category}.png`}
                  alt={category}
                  className="category-image"
                />
                <span className="category-name">{category}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
