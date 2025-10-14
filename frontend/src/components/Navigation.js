import React from 'react';
import '../styles/Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="nav-brand">
          <h1 className="site-name">YOURABSOLUTELYRIGHT.COM</h1>
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
