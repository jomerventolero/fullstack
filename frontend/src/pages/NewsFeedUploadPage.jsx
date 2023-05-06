import React from 'react'

import { lazy, Suspense } from 'react'
import Loader from '../components/Loader';

const DashboardNav = lazy(() => import('../components/DashboardNav'));
const NewsFeedUploader = lazy(() => import('../components/NewsFeedUploader'));

const NewsFeedUploadPage = () => {
  return (
    <Suspense fallback={<Loader />}>
        <div className='bg-background1 bg-cover'>
            <DashboardNav />
            <div className="pt-[100px] flex justify-center">
                <NewsFeedUploader />
            </div>
        </div>
    </Suspense>
  )
}

export default NewsFeedUploadPage
