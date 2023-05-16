import React from 'react'
import UserNav from '../components/UserNav'
import UserDashboard from '../components/UserDashboard'
import { useState, useEffect } from 'react'
import { app } from '../auth'
import Greeting from '../components/Greeting'

const UserDashboardPage = () => {
    const [userFullname, setUserFullname] = useState('');
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserFullname = async () => {
        try {
          const user = app.auth().currentUser;
  
          if (user) {
            const userId = user.uid;
  
            // Make the API request to fetch the userFullname
            const response = await axios.get('/userFullname', {
              headers: {
                'user-id': userId,
              },
            });
  
            // Extract the userFullname from the response data
            const { userFullname } = response.data;
  
            // Update the state with the userFullname
            setUserFullname(userFullname);
          }
        } catch (error) {
          console.error('Error fetching userFullname:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchUserFullname();
    }, []);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
  return (
    <div className="pb-20 bg-cover bg-background1">
        <UserNav />
        <Greeting />
        <UserDashboard />
    </div>
  )
}

export default UserDashboardPage