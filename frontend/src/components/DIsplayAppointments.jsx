import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/get-appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleMakeAsDone = async (appointmentId, email, phoneNumber, appointmentTime, message) => {
    try {
      // Delete the appointment from the "appointments" collection
      await axios.delete(`http://localhost:3000/delete-appointment/${appointmentId}`);

      // Move the appointment to a different collection (e.g., "done-appointments")
      await axios.post('http://localhost:3000/move-appointment', {
        appointmentId,
        email,
        phoneNumber,
        appointmentTime,
        message,
        // Add any additional fields from the appointment object that you want to store in the new collection
      });

      // Fetch the updated appointments list
      fetchAppointments();
    } catch (error) {
      console.error('Error making appointment as done:', error);
    }
  };

  return (
    <div className='bg-white drop-shadow-2xl p-8 h-screen'>
      <h1 className="font-poppins font-semibold text-5xl">Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul className="pt-4 z-10">
          {appointments.map((appointment) => (
            <li key={appointment.id}
                className="pb-6"
            >
              <strong>Email:</strong> {appointment.email}
              <br />
              <strong>Phone Number:</strong> {appointment.phoneNumber}
              <br />
              <strong>Date/Time:</strong> {appointment.appointmentTime}
              <br />
              <strong>Message:</strong> {appointment.message}
              <hr />
              <button type="submit" 
                className="p-1 my-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
                onClick={() => handleMakeAsDone(appointment.id, appointment.email, appointment.phoneNumber, appointment.appointmentTime, appointment.message)}
              >Make as Done</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayAppointments;
