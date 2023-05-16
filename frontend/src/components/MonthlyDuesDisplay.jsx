import React, { useState, useEffect } from 'react';
import { app } from '../auth.js';
import { motion } from 'framer-motion';

const MonthlyDuesDisplay = () => {
  const [dues, setDues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Firebase app (assuming you've already done this)
    const db = app.firestore();

    // Fetch the monthly dues data from Firestore
    db.collection('users')
      .get()
      .then(querySnapshot => {
        const duesData = [];
        querySnapshot.forEach(doc => {
          const { userFullname, duesByDate } = doc.data();
          const formattedDuesByDate = Object.entries(duesByDate || {}).reduce((acc, [month, value]) => {
            const monthName = getMonthName(month);
            acc[monthName] = value;
            return acc;
          }, {});
          duesData.push({
            id: doc.id,
            userFullname,
            duesByDate: formattedDuesByDate,
          });
        });
        setDues(duesData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching monthly dues:', error);
      });
  }, []);

  const getMonthName = monthNumber => {
    const date = new Date();
    date.setMonth(parseInt(monthNumber) - 1);
    return date.toLocaleString('default', { month: 'long' });
  };

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

  return (
    <div className="container px-4 pb-8 pt-[100px] mx-auto">
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 font-medium text-gray-600 border border-gray-500">User</th>
            {[...Array(12)].map((_, i) => {
              const month = getMonthName(i + 1);
              return (
                <th key={i} className="px-4 py-2 font-medium text-gray-600 border border-gray-500">
                  {month}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dues.map(({ id, userFullname, duesByDate }) => (
            <tr key={id}>
              <td className="px-4 py-2 text-gray-600 border border-gray-500">{userFullname}</td>
              {[...Array(12)].map((_, i) => {
                const month = getMonthName(i + 1);
                const monthlyDue = duesByDate[month] || 0;
                return (
                  <td key={i} className="px-4 py-2 text-gray-600 border border-gray-500">
                    ₱{monthlyDue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyDuesDisplay;
