import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '1rem' }}>
      {children}
    </main>
  );
};

export default MainLayout;