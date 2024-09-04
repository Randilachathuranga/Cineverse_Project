import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
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

  return (
    <nav className='navbar-container'>
      <a className='logo-a nav-item' href='/'>
        <img src='Logo/logo.png' alt='logo' />
      </a>
      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <button className='nav-link nav-item' onClick={() => handleNavLinkClick('/')}>Home</button>
        <button className='nav-link nav-item' onClick={() => handleNavLinkClick('/About')}>About</button>
        <button className='nav-link nav-item' onClick={() => handleNavLinkClick('/Contact')}>Contact us</button>
        {role === null && (
          <>
            <button className='nav-link nav-item' onClick={() => handleNavLinkClick('/Userregistration')}>Register</button>
            <button className='nav-link nav-item' onClick={() => handleNavLinkClick('/Userlogin')}>Login</button>
          </>
        )}
        {role === 'user' && (
          <>
            <button className='nav-link nav-item' onClick={() => handleNavLinkClick('/Account')}>Profile</button>
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
