import React from 'react'
import NewsFeed from './NewsFeed'
import UserDues from './UserDues'

const UserDashboard = () => {
  return (
    <div className="justify-center pt-20">
        <NewsFeed />
        <UserDues />
    </div>
  )
}

export default UserDashboard