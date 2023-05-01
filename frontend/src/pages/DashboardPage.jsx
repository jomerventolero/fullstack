import React from 'react';
import DashboardNav from '../components/DashboardNav';

function DashboardPage(props) {
  const handleLogout = () => {
      // This function sends a POST request to the Flask logout endpoint
    fetch('http:127.0.0.1:5000/api/logout', {
      method: 'POST',
      credentials: 'include', // Make sure to include credentials in the request
    })
      .then(response => {
        if (response.ok) {
          // Redirect the user to the login page on successful logout
          window.location.href = '/login';
        } else {
          throw new Error('Failed to log out');
        }
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while logging out');
      });
  }


  return (
    <div className="">
      <DashboardNav />
      <div className="pt-[80px]">
        <h2>Welcome, {props.username}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default DashboardPage;
