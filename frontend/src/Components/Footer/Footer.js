import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src='/Logo/logo.png' alt='logo'/>
        </div>
        <div className="footer-links">
          <a href="/About">About Us</a>
          <a href="/Getfilms">Films</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-social">
          <a href="#facebook" className="social-link">Facebook</a>
          <a href="#twitter" className="social-link">Twitter</a>
          <a href="#instagram" className="social-link">Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Cineverse. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
