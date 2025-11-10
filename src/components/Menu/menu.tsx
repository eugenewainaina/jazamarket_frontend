import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import './menu.css';

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <>
      {/* Burger Icon */}
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Slide-in Menu */}
      <nav className={`side-menu ${isOpen ? 'open' : ''}`}>
          <div>
              <div className="menu-logo-base">

                <span className="menu-logo-jaza">Jaza</span>
                <span className="menu-logo-market">Market</span>

              </div>
          </div>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contacts</Link></li>
          <li><Link to="/safety" onClick={toggleMenu}>Safety Tips</Link></li>
          <li><Link to="/intellectual-property" onClick={toggleMenu}>IP Rights</Link></li>
          <li><Link to="/terms" onClick={toggleMenu}>T&Cs</Link></li>
          <li><Link to="/faq" onClick={toggleMenu}>FAQs</Link></li>
        </ul>
      </nav>

      {/* Optional: overlay for when menu is open */}
      {isOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default Menu;