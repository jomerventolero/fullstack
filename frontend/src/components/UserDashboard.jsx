import React from 'react'
import NewsFeed from './NewsFeed'
import UserDues from './UserDues'

const UserDashboard = () => {
  return (
    <div className="border-2 border-black">
        <NewsFeed />
        <UserDues />
    </div>
  )
}

export default UserDashboard