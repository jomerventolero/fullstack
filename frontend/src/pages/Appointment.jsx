import React from 'react'
import AppointmentForm from '../components/AppointmentForm'
import DashboardNav from '../components/DashboardNav'

const Appointment = () => {
  return (
    <div>
        <DashboardNav />
        <div className="pt-[100px] flex justify-center">
            <AppointmentForm />
        </div>
    </div>
  )
}

export default Appointment