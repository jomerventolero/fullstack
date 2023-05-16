import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { app } from '../auth.js';

const UserDues = () => {
  const [monthlyDues, setMonthlyDues] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyDues = async () => {
      try {
        const user = app.auth().currentUser;

        if (user) {
          const userId = user.uid;

          // Make the API request to retrieve the monthly dues data
          const response = await axios.get(`/users/${userId}/monthly-dues`);

          // Set the monthly dues data in the state
          setMonthlyDues(response.data);
        }
      } catch (error) {
        console.error('Error retrieving monthly dues:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMonthlyDues();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Monthly Dues</h2>
      <ul>
        {Object.entries(monthlyDues).map(([month, amount]) => (
          <li key={month}>
            {month}: {amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDues;
