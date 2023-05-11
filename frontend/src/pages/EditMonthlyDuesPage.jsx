import React from 'react'
import DashboardNav from '../components/DashboardNav'
import EditMonthlyDues from '../components/EditMonthlyDues'
import UsersList from '../components/UsersList'
import { useState } from 'react'

const EditMonthlyDuesPages = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserSelect = userId => {
    setSelectedUserId(userId);
  };

  return (
    <div>
      <DashboardNav />
      <h1>Manage Monthly Dues</h1>
      {selectedUserId ? (
        <EditMonthlyDues userId={selectedUserId} />
      ) : (
        <UsersList onUserSelect={handleUserSelect} />
      )}
    </div>
  );
}

export default EditMonthlyDuesPages