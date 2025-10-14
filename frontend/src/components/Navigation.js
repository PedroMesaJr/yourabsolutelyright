import React from 'react';
import '../styles/Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="nav-brand">
          <h1 className="site-name">YOURABSOLUTELYRIGHT.COM</h1>
          <div className="security-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" fill="currentColor" opacity="0.2"/>
              <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Secured by Stripe</span>
          </div>
        </div>
        <div className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
