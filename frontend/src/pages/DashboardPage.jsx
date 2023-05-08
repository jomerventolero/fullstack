import React from 'react';
import DashboardNav from '../components/DashboardNav';
import DisplayAppointments from '../components/DIsplayAppointments';
import NewsFeed from '../components/NewsFeed';

/**
 * The function returns a JSX element representing a dashboard page with a navigation bar, appointments
 * display, and news feed.
 * @returns The `DashboardPage` component is being returned, which contains a `DashboardNav` component
 * and two child components `DisplayAppointments` and `NewsFeed` wrapped in a `div` element. The
 * `DashboardNav` component is a navigation bar, while `DisplayAppointments` and `NewsFeed` are
 * components that display appointments and news feed respectively. The `className` attribute is used
 * to
 */
function DashboardPage() {

  return (
    <div className="flex h-full overflow-hidden bg-cover font-poppins bg-background1">
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
