import React, { useState, useEffect } from 'react';
import { app } from '../auth.js';

const UsersList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Firebase app (assuming you've already done this)
    const db = app.firestore();

    // Fetch all users from Firestore
    db.collection('users')
      .get()
      .then(querySnapshot => {
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          userFullname: doc.data().userFullname,
        }));
        setUsers(usersData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container px-4 pb-8 pt-[100px] mx-auto">
      <h2 className="mb-4 text-lg font-medium text-gray-600">Users List</h2>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id}>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => onUserSelect(user.id)}
            >
              {user.userFullname}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
