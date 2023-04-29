import React from 'react';
import DashboardNav from '../components/DashboardNav';

function DashboardPage(props) {
  return (
    <div className="">
      <DashboardNav />
      <div className="pt-[80px]">
        <h2>Welcome, {props.username}!</h2>
        <button onClick={props.onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default DashboardPage;
