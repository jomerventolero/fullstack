import React from 'react';
import DashboardNav from '../components/DashboardNav';

function DashboardPage(props) {


  return (
    <div className="flex justify-center font-poppins">
      <DashboardNav />
      <div className="pt-[80px]">
        <h2>Welcome, {props.email}!</h2>
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
