import React, { useState, useEffect, useRef } from "react";
import { FaGlobe, FaUser, FaPencilAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getCookie, eraseCookie } from "../../utils/cookies";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./TopBar.css";

const TopBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedInCookie = getCookie("logged_in");
      setIsLoggedIn(loggedInCookie === "true");
    };

    checkLoginStatus();
    // Optional: Add an interval or event listener to check for cookie changes
    const interval = setInterval(checkLoginStatus, 1000); // Check every second
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        eraseCookie("logged_in");
        setIsLoggedIn(false);
        navigate("/");
      } else {
        // Handle logout error
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="top-bar">
        <div className="top-bar-left">
          <div className="language-selector">
            <FaGlobe />
            <span>Language</span>
            <select>
              <option>English</option>
              <option>Swahili</option>
            </select>
          </div>
        </div>
        <div className="top-bar-right">
          {isLoggedIn ? (
            <div className="account-menu" ref={dropdownRef}>
              <button
                className="account-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <FaUser /> Account
              </button>
              {isMenuOpen && (
                <div className="dropdown-menu">
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/dashboard/my_ads">My Ads</Link>
                  <Link to="/dashboard/favourite_ads">Favourites</Link>
                  <Link to="/dashboard/messages">Messages</Link>
                  <Link to="/dashboard/profile_settings">Settings</Link>
                  <button onClick={handleLogout} className="logout-button">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="top-bar-link">
                <FaUser />
                <span>Login</span>
              </Link>
              <Link to="/signup" className="top-bar-link">
                <FaPencilAlt />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TopBar;
