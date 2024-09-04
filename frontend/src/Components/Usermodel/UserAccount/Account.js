import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css'; // Import the external CSS file

export default function Account() {
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate('/Viewprofile');
  };

  const handleClick2 = () => {
    navigate('/Updateprofile');
  };

  const handleClick3 = () => {
    navigate('/GetAllBookingsbyUser');
  };

  return (
    <div className="account-container">
      <h2 className="account-title">User Profile</h2>
      <button onClick={handleClick1} className="account-button">View Profile</button>
      <button onClick={handleClick2} className="account-button">Update Profile</button>
      <button onClick={handleClick3} className="account-button">My Booking Details</button>
    </div>
  );
}
