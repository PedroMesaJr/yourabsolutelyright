import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <h1 className="site-name">YOURABSOLUTELYRIGHT.COM</h1>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/faq" className="nav-link">FAQ</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
