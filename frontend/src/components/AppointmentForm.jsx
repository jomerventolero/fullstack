import React, { useState } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [message, setMessage] = useState('');

const handleSubmit = async (event) => {
  event.preventDefault();

  const apiUrl = 'http://localhost:3000/make-appointment';

  try {
    const response = await axios.post(apiUrl, {
      email,
      phoneNumber,
      appointmentTime,
      message,
    });

    // Handle the response (e.g., display a success message, navigate to another page, etc.)
    console.log('Appointment created successfully:', response.data);
    alert("Appointment created successfully");
    window.location.href = "/dashboard";
  } catch (error) {
    // Handle the error (e.g., display an error message)
    console.error('Error creating appointment:', error);
  }
};

  return (
    <div className="flex flex-col w-full max-w-md mx-auto mt-10 items-center justify-center">
      <h1 className="text-2xl font-bold mb-5">Make an Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-4 justify-center">
        <div>
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block mb-2">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="appointmentTime" className="block mb-2">
            Time of Appointment:
          </label>
          <input
            type="datetime-local"
            id="appointmentTime"
            value={            appointmentTime}
            onChange={(event) => setAppointmentTime(event.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
            <label htmlFor="message" className="block mb-2">
              Message:
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;

