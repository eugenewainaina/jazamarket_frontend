import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './DashboardLayout.css';
import { FaCog, FaPlusCircle, FaBars, FaTimes } from 'react-icons/fa';
// Commented out unused imports for work-in-progress features:
// import { FaTachometerAlt, FaHeart, FaEnvelope } from 'react-icons/fa';
import { useProfile } from '../../context/ProfileContext';
import { format, parseISO } from 'date-fns';

const DashboardLayout: React.FC = () => {
  const { profile, loading } = useProfile();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      const date = parseISO(dateString);
      return format(date, 'dd MMMM yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  if (loading) {
    return <div className="dashboard-layout">Loading...</div>;
  }

  return (
    <div className="dashboard-layout">
      <div className="dashboard-header">
        <div className="user-info">
          <img
            src={profile?.profilePictureURL || 'https://via.placeholder.com/80'}
            alt="User"
            className="profile-pic"
          />
          <div className="user-details">
            <h2>{profile?.fullName || 'User Name'}</h2>
            <div className="user-meta">
              <p>
                <span>Package:</span> {profile?.package || 'N/A'}
              </p>
              <p>
                <span>Expiry Date:</span> 2025-12-31
              </p>
              <p>
                <span>Account Creation Date:</span> {formatDate(profile?._createTime)}
              </p>
            </div>
          </div>
        </div>
        <button className="hamburger-menu" onClick={toggleNav} aria-label="Toggle navigation">
          {isNavOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      {/* Mobile overlay */}
      {isNavOpen && <div className="nav-overlay" onClick={closeNav}></div>}
      
      <div className="dashboard-content">
        <div className={`dashboard-nav ${isNavOpen ? 'nav-open' : ''}`}>
          {/* <NavLink to="/dashboard" end onClick={closeNav}>
            <FaTachometerAlt /> Dashboard
          </NavLink> */}
          <NavLink to="/dashboard/my_ads" onClick={closeNav}>
            <FaPlusCircle /> My Ads
          </NavLink>
          {/* <NavLink to="/dashboard/favourite_ads" onClick={closeNav}>
            <FaHeart /> Favourite Ads
          </NavLink> */}
          {/* <NavLink to="/dashboard/messages" onClick={closeNav}>
            <FaEnvelope /> Messages
          </NavLink> */}
          <NavLink to="/dashboard/profile_settings" onClick={closeNav}>
            <FaCog /> Profile Settings
          </NavLink>
        </div>
        <div className="dashboard-outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
