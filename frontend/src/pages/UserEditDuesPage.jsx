// UserEditDuesPage.jsx
import React, { useEffect, useState } from 'react';
import UserNav from '../components/UserNav';
import { app } from '../auth.js';
import Loader from '../components/Loader';
import EditMonthlyContribution from '../components/EditMonthlyContribution';

const UserEditDuesPage = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const currentUser = app.auth().currentUser;

        if (currentUser) {
          const userId = currentUser.uid;
          setUserId(userId);
          console.log('User ID:', userId);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <div>
      <UserNav />
      {userId ? <EditMonthlyContribution userId={userId} /> : <Loader />}
    </div>
  );
};

export default UserEditDuesPage;
