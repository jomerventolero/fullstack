import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <div>
      <h1>Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <strong>Name:</strong> {appointment.name}
              <br />
              <strong>Email:</strong> {appointment.email}
              <br />
              <strong>Date:</strong> {appointment.date}
              <br />
              <strong>Time:</strong> {appointment.time}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayAppointments;
