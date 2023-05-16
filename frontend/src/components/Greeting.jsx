import React, { useEffect, useState } from 'react';
import { auth, app } from '../auth.js';

const Greeting = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;

        // Initialize Firestore
        const db = app.firestore();

        // Retrieve the user's full name from Firestore
        const userDoc = await db.collection('users').doc(userId).get();
        const userData = userDoc.data();

        if (userData) {
          setCurrentUser(userData.userFullname);
        }
      }
    };

    fetchCurrentUser();
  }, []);

  if (currentUser) {
    const greeting = `Hello, ${currentUser}!`;

    return <h1 className="text-white text-[64px] pt-[80px] z-60 px-20">{greeting}</h1>;
  }

  return null; // Render nothing if there is no current user or full name
};

export default Greeting;
