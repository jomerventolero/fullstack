import React from 'react'
import Navbar from '../components/Navbar'
import AppointmentForm from '../components/AppointmentForm'

const Appointment = () => {
  return (
    <div>
        <Navbar />
        <div className="pt-[100px] flex justify-center">
            <AppointmentForm />
        </div>
    </div>
  )
}

export default Appointment