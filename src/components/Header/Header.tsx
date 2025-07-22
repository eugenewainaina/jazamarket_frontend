import React from 'react';
import TopBar from './TopBar.tsx';
import MainHeader from './MainHeader.tsx';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <TopBar />
      <MainHeader />
    </header>
  );
};

export default Header;
