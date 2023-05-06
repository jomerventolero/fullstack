import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

const NewsFeed = () => {
  const [newsFeed, setNewsFeed] = useState([]);

  useEffect(() => {
    fetchNewsFeed();
  }, []);

  const fetchNewsFeed = async () => {
    try {
      const response = await axios.get('http://localhost:3000/news-feed');
      setNewsFeed(response.data);
    } catch (error) {
      console.error('Error fetching news feed:', error);
    }
  };

  return (
    <div className="w-full bg-white p-8 mx-10">
      <span className='font-poppins font-semibold text-2xl'>
        Celina Plains Imus<br/>
      </span>
      <h1 className="text-2xl font-bold mb-4">News Feed</h1>
      {newsFeed.map((item) => (
        <div key={item.id} className="mb-4">
          <h2 className="text-lg font-bold">{item.postTitle}</h2>
          <p className="text-gray-500">{item.postCaption}</p>
          
          {item.data && (
            <img src={item.data} alt="News Feed" className="mt-2 w-[512px]" />
          )}
        </div>
      ))}
    </div>
  )
}

export default NewsFeed