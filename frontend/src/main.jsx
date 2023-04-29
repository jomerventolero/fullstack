import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import RegisterPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
      element: <DashboardPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    }
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
