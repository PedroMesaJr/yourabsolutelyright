import React from 'react';
import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-copyright">
          <p>&copy; {currentYear} YouAbsolutelyRight.com</p>
        </div>

        <div className="footer-links">
          <a href="#terms" className="footer-link">Terms</a>
          <a href="#privacy" className="footer-link">Privacy</a>
          <a href="#contact" className="footer-link">Contact</a>
        </div>

        <div className="footer-social">
          <a href="#twitter" className="social-link" aria-label="Twitter">𝕏</a>
          <a href="#instagram" className="social-link" aria-label="Instagram">IG</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
