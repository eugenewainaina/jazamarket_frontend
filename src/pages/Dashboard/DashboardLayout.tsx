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

  const formatExpiryDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = parseISO(dateString);
      return format(date, 'dd MMM yyyy');
    } catch (error) {
      console.error('Error formatting expiry date:', error);
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
              <div className="package-info">
                <h3>Package Information</h3>
                {profile?.package ? (
                  <div className="package-categories">
                    <div className="package-category">
                      <span className="category-name">Vehicles:</span>
                      <span className="level">{profile.package["Vehicles"]?.level || 'N/A'}</span>
                      <span className="expiry">Expires: {formatExpiryDate(profile.package["Vehicles"]?.expiry)}</span>
                    </div>
                    <div className="package-category">
                      <span className="category-name">Property & Rentals:</span>
                      <span className="level">{profile.package["Property & Rentals"]?.level || 'N/A'}</span>
                      <span className="expiry">Expires: {formatExpiryDate(profile.package["Property & Rentals"]?.expiry)}</span>
                    </div>
                    <div className="package-category">
                      <span className="category-name">Others:</span>
                      <span className="level">{profile.package["Others"]?.level || 'N/A'}</span>
                      <span className="expiry">Expires: {formatExpiryDate(profile.package["Others"]?.expiry)}</span>
                    </div>
                  </div>
                ) : (
                  <p>No package information available</p>
                )}
              </div>
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
