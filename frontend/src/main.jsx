import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Appointment from './pages/Appointment.jsx'
import ContactPage from './pages/Contact.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { auth } from './auth.js'
import { useState, useEffect } from 'react';
import NewsFeedUploadPage from './pages/NewsFeedUploadPage.jsx'
import NewsFeedPage from './pages/NewsFeedPage.jsx'

const userAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  return user;
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/dashboard',
      element: userAuth ? <DashboardPage /> : <App />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/appointment",
      element: <Appointment />,
    },
    {
      path: '/contact',
      element: <ContactPage />,
    },
    {
      path: "/newsfeedupload",
      element: <NewsFeedUploadPage />,
    },
    {
      path: "/newsfeed",
      element: <NewsFeedPage />,
    }
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
