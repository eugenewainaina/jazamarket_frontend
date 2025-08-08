import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { categories } from '../../data/categories';
import PostAdForm from '../PostAdForm/PostAdForm';
import { getCookie } from '../../utils/cookies';

const MainHeader: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handlePostAdClick = () => {
    const isLoggedIn = getCookie('logged_in') === 'true';
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      alert('You need to be logged in to post an ad.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAdPosted = () => {
    console.log('Ad posted successfully from header!');
    // You might want to add some user feedback here, like a toast notification
  };

  return (
    <>
      <div className="main-header">
        <Link to="/">
          <img src="/Logo.png" alt="JazaMarket" className="logo" />
        </Link>
        <div className="search-bar">
          <div className="search-input-group">
            <select>
              <option>Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input type="text" placeholder="Enter keyword" />
          </div>
          <button>
            <FaSearch />
          </button>
        </div>
        <div className="header-buttons">
          <button className="post-free-ad" onClick={handlePostAdClick}>
            <FaPlus />
            Post Free Ad
          </button>
        </div>
      </div>
      {showModal && <PostAdForm onClose={handleCloseModal} onSuccess={handleAdPosted} />}
    </>
  );
};

export default MainHeader;
