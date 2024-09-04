import './NavBar.css';

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation to get the current path

import { useAuth } from '../../AuthContext';

function NavBar() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleUserLogoutClick = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);  // Close the menu after click
  };

  // Helper function to determine if a path is active
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className='navbar-container'>
      <a className={`logo-a nav-item ${isActive('/')}`} href='/'>
        <img src='Logo/logo.png' alt='logo' />
      </a>
      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
 {role === null && (
          <>        <button className={`nav-link nav-item ${isActive('/')}`} onClick={() => handleNavLinkClick('/')}>Home</button>
          <button className={`nav-link nav-item ${isActive('/About')}`} onClick={() => handleNavLinkClick('/About')}>About</button>
          <button className={`nav-link nav-item ${isActive('/Contact')}`} onClick={() => handleNavLinkClick('/Contact')}>Contact us</button>
         
            <button className={`nav-link nav-item ${isActive('/Userregistration')}`} onClick={() => handleNavLinkClick('/Userregistration')}>Register</button>
            <button className={`nav-link nav-item ${isActive('/Userlogin')}`} onClick={() => handleNavLinkClick('/Userlogin')}>Login</button>
          </>
        )}
        {role === 'user' && (
          <>
                  <button className={`nav-link nav-item ${isActive('/Userhome')}`} onClick={() => handleNavLinkClick('/Userhome')}>Home</button>
        <button className={`nav-link nav-item ${isActive('/About')}`} onClick={() => handleNavLinkClick('/About')}>About</button>
        <button className={`nav-link nav-item ${isActive('/Contact')}`} onClick={() => handleNavLinkClick('/Contact')}>Contact us</button>
       
            <button className={`nav-link nav-item ${isActive('/Account')}`} onClick={() => handleNavLinkClick('/Account')}>Profile</button>
            <button className='nav-link nav-item' onClick={handleUserLogoutClick}>Logout</button>
          </>
        )}
      </div>
      <div className='mobile-menu-icon' onClick={toggleMobileMenu}>
        <div className='hamburger'></div>
        <div className='hamburger'></div>
        <div className='hamburger'></div>
      </div>
    </nav>
  );
}

export default NavBar;
