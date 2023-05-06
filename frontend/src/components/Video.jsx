import React from 'react'
import video0 from '../assets/video.webm';

const Video = () => {
  return (
    <div className="flex flex-row justify-center">
        <video src={video0} alt="video" className="h-3/4 w-full " autoPlay loop/>
    </div>
  )
}

export default Video
