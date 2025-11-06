import React from 'react';
import Menu from '../Menu/menu.tsx';
import TopBar from './TopBar.tsx';
import MainHeader from './MainHeader.tsx';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-inner">
        <Menu />
        <div className="header-content">
          <TopBar />
          <MainHeader />
        </div>
      </div>
    </header>
  );
};

export default Header;