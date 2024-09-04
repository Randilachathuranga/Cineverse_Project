import './NavBar.css';

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { FaUserCircle } from 'react-icons/fa'; // Importing profile icon
import { useAuth } from '../../AuthContext';

function NavBar() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // State for profile dropdown

  const handleUserLogoutClick = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false); // Close dropdown on logout
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleNavLinkClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false); // Close dropdown after navigation
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className='navbar-container'>
      <a className={`logo-a nav-item ${isActive('/')}`} href='/'>
        <img src='Logo/logo.png' alt='logo' />
      </a>
      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {role === null && (
          <>
            <button className={`nav-link nav-item ${isActive('/')}`} onClick={() => handleNavLinkClick('/')}>Home</button>
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
            {/* Profile Icon with Dropdown */}
            <div className="profile-dropdown-container">
              <button className='profile-icon-button' onClick={toggleProfileDropdown}>
                <FaUserCircle size={30} /> {/* Profile icon */}
              </button>
              {isProfileDropdownOpen && (
                <div className="profile-dropdown">
                  <button className={`nav-link nav-item ${isActive('/Viewprofile')}`} onClick={() => handleNavLinkClick('/Viewprofile')}>View Profile</button>
                  <button className={`nav-link nav-item ${isActive('/Updateprofile')}`} onClick={() => handleNavLinkClick('/Updateprofile')}>Update Profile</button>
                  <button className={`nav-link nav-item ${isActive('/GetAllBookingsbyUser')}`} onClick={() => handleNavLinkClick('/GetAllBookingsbyUser')}>Booking Details</button>
                  <button className='nav-link nav-item' onClick={handleUserLogoutClick}>Logout</button>
                </div>
              )}
            </div>
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
