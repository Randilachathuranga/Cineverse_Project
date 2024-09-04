import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminAccount() {
  const navigate = useNavigate(); // Correctly use the useNavigate hook

  const handleClick1 = () => {
    navigate('/ViewAdminprofile'); // Navigate to the Viewprofile page
  };
  const handleClick2 = () => {
    navigate('/UpdateAdmin'); // Navigate to the Updateprofile
  }
  
  return (
    <div>
      <h2>Admin Profile</h2>
      <button onClick={handleClick1} style={styles.button}>View Profile</button> <br></br> <br></br>
      <button onClick={handleClick2} style={styles.button}>Update Profile</button>

    </div>
  );
}

const styles = {
  button: {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
