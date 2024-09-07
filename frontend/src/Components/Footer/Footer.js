import React from 'react';
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

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
        <div className="socialMedia">
            <FacebookIcon />
            <InstagramIcon />
            <YouTubeIcon />
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Cineverse. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
