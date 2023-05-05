import React from 'react'
import AppointmentForm from '../components/AppointmentForm'
import DashboardNav from '../components/DashboardNav'

const Contact = () => {
  return (
    <div className='bg-background1 bg-cover'>
        <DashboardNav />
        <div className="pt-[100px] flex justify-center">
            <AppointmentForm />
        </div>
    </div>
  )
}

export default Contact