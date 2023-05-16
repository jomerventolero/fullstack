import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { app } from '../auth.js';
import { motion } from 'framer-motion';

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
          const response = await axios.get(`http://localhost:3000/users/${userId}/monthly-dues`);

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
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"
          style={{ borderTopColor: '#4F46E5' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('default', { month: 'long' });
  };

  const sortedMonths = Object.entries(monthlyDues)
    .sort(([monthA], [monthB]) => parseInt(monthA) - parseInt(monthB));

  return (
    <div className="flex flex-col justify-center p-2 m-8 font-medium bg-white border-2 border-blue-600 text-slate-800 rounded-2xl">
      <h2 className="mb-4 text-2xl font-bold">Monthly Dues</h2>
      <ul className="pl-6 list-disc">
        {sortedMonths.map(([month, amount]) => (
          <li key={month} className="text-lg">
            {getMonthName(parseInt(month))}: {amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDues;
