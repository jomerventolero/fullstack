import React from 'react'
import UserNav from '../components/UserNav'
import EditMonthlyContributions from '../components/EditMonthlyContribution'
import { useEffect, useState } from 'react'
import { app } from '../auth.js'

const UserEditDuesPage = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get the current user's ID from Firebase Authentication
    const currentUser = app.auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      setUserId(userId);
      console.log('User ID:', userId);
    }
  }, []);

  return (
    <div>
      <UserNav />
      <EditMonthlyContributions userId={userId} />
    </div>
  )
}

export default UserEditDuesPage;
