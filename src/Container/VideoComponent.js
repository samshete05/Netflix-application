import React from 'react'
import nakrewali from "../Videos/nakhrewali.mp4";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const VideoComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    sessionStorage.removeItem('token'); 
    navigate('/');
  }; 
  
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token'); 
  
    if (!token) {
      alert('No token found. Please log in again.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/delete-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          emailaddress: 'user@example.com', 
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Account deleted successfully!');
        handleLogout(); 
      } else {
        alert(data.message || 'Failed to delete account.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred while deleting the account.');
    }
  };
  
  return (
    <div>
         <video width="700" controls>
        <source src={nakrewali} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Button variant="primary" onClick={handleLogout}>Logout</Button>{' '}
      <Button variant="primary" onClick={handleDeleteAccount}>Signout</Button>{' '}
    </div>
  )
}

export default VideoComponent;