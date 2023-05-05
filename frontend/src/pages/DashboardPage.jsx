import React from 'react';
import DashboardNav from '../components/DashboardNav';
import DisplayAppointments from '../components/DIsplayAppointments';
import NewsFeed from '../components/NewsFeed';

function DashboardPage() {

  return (
    <div className="flex font-poppins bg-background1 bg-cover">
      <DashboardNav />
      <div className="pt-[80px]">
        <div className="flex flex-row justify-around px-[200px]">
          <DisplayAppointments />
          <NewsFeed />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
