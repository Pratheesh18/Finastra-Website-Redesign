import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton';

function Layout({ children, toggleRegistration }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header toggleRegistration={toggleRegistration} />
      <main>
        {children}
      </main>
      <Footer toggleRegistration={toggleRegistration} />
      <BackToTopButton />
    </div>
  );
}

export default Layout;