import React from 'react'
import { lazy } from 'react'
import { Suspense } from 'react'
import Loader from '../components/Loader';

const AppointmentForm = lazy(() => import('../components/AppointmentForm'));
const DashboardNav = lazy(() => import('../components/DashboardNav'));

const Contact = () => {
  return (
    <Suspense fallback={<Loader />}>
    <div className='bg-background1 bg-cover'>
        <DashboardNav />
        <div className="pt-[100px] flex justify-center">
            <AppointmentForm />
        </div>
    </div>
    </Suspense>
  )
}

export default Contact