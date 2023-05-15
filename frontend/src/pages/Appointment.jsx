import React from 'react'
import AppointmentForm from '../components/AppointmentForm'
import DashboardNav from '../components/DashboardNav'

/**
 * The Appointment function returns a JSX element that displays a background image, a navigation bar,
 * and an appointment form centered on the page.
 * @returns The `Appointment` component is being returned, which contains a `div` element with a
 * background image and two child components: `DashboardNav` and `AppointmentForm`. The `DashboardNav`
 * component is a navigation bar and the `AppointmentForm` component is a form for scheduling
 * appointments.
 */
const Appointment = () => {
  return (
    <div className='h-screen bg-cover bg-background1'>
        <DashboardNav />
        <div className="pt-[100px] flex justify-center">
            <AppointmentForm />
        </div>
    </div>
  )
}

export default Appointment